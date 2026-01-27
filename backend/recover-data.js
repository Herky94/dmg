/**
 * DATA RECOVERY SCRIPT
 * Recovers deleted products, formulazioni, and classificazioni from strapi_history_versions
 *
 * Run with: node recover-data.js
 */

const mysql = require("mysql2/promise");

const DB_CONFIG = {
  host: "localhost",
  user: "dmg_user",
  password: "B57?u61rj",
  database: "dmg_strapi_",
  multipleStatements: true,
};

async function recoverData() {
  const connection = await mysql.createConnection(DB_CONFIG);

  try {
    console.log("🔌 Connected to database");

    // Step 1: Get latest versions from history
    console.log("\n📊 Step 1: Analyzing history versions...");

    const [products] = await connection.execute(`
      SELECT h1.*
      FROM strapi_history_versions h1
      INNER JOIN (
        SELECT related_document_id, MAX(created_at) as max_date
        FROM strapi_history_versions
        WHERE content_type = 'api::prodotto.prodotto'
        GROUP BY related_document_id
      ) h2 ON h1.related_document_id = h2.related_document_id 
          AND h1.created_at = h2.max_date
      WHERE h1.content_type = 'api::prodotto.prodotto'
      ORDER BY h1.created_at DESC
    `);

    const [formulazioni] = await connection.execute(`
      SELECT h1.*
      FROM strapi_history_versions h1
      INNER JOIN (
        SELECT related_document_id, MAX(created_at) as max_date
        FROM strapi_history_versions
        WHERE content_type = 'api::formulazione.formulazione'
        GROUP BY related_document_id
      ) h2 ON h1.related_document_id = h2.related_document_id 
          AND h1.created_at = h2.max_date
      WHERE h1.content_type = 'api::formulazione.formulazione'
      ORDER BY h1.created_at DESC
    `);

    console.log(`   ✓ Found ${products.length} unique products`);
    console.log(`   ✓ Found ${formulazioni.length} unique formulazioni`);

    // Step 2: Extract all unique classificazioni from products
    console.log("\n📋 Step 2: Extracting classificazioni...");
    const classificazioniMap = new Map();

    for (const product of products) {
      const data = JSON.parse(product.data);
      if (data.classificazioni && Array.isArray(data.classificazioni)) {
        for (const classif of data.classificazioni) {
          if (classif.documentId) {
            classificazioniMap.set(classif.documentId, {
              documentId: classif.documentId,
              // We don't have the name, so we'll create placeholders
              name: `Classificazione ${classif.documentId.substring(0, 8)}`,
              slug: classif.documentId,
            });
          }
        }
      }
    }

    console.log(`   ✓ Found ${classificazioniMap.size} unique classificazioni`);

    // Step 3: Insert Classificazioni
    console.log("\n💾 Step 3: Inserting classificazioni...");
    const classificazioniIdMap = new Map(); // documentId -> internal id

    for (const [documentId, classif] of classificazioniMap) {
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      const [result] = await connection.execute(
        `
        INSERT INTO classificazionis 
        (document_id, name, slug, created_at, updated_at, published_at, created_by_id, locale)
        VALUES (?, ?, ?, ?, ?, ?, 1, NULL)
      `,
        [documentId, classif.name, classif.slug, now, now, now],
      );

      classificazioniIdMap.set(documentId, result.insertId);
      console.log(`   ✓ Inserted: ${classif.name} (ID: ${result.insertId})`);
    }

    // Step 4: Insert Formulazioni
    console.log("\n💾 Step 4: Inserting formulazioni...");
    const formulazioniIdMap = new Map(); // documentId -> internal id

    for (const formVersion of formulazioni) {
      const data = JSON.parse(formVersion.data);
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");

      const [result] = await connection.execute(
        `
        INSERT INTO formulaziones 
        (document_id, name, slug, created_at, updated_at, published_at, created_by_id, locale)
        VALUES (?, ?, ?, ?, ?, ?, 1, NULL)
      `,
        [
          formVersion.related_document_id,
          data.Name || "Unknown",
          data.Slug || formVersion.related_document_id,
          now,
          now,
          now,
        ],
      );

      formulazioniIdMap.set(formVersion.related_document_id, result.insertId);
      console.log(`   ✓ Inserted: ${data.Name} (ID: ${result.insertId})`);
    }

    // Step 5: Get aree_terapeutiches mapping
    console.log("\n🔍 Step 5: Mapping aree terapeutiche...");
    const [aree] = await connection.execute(
      "SELECT id, document_id FROM aree_terapeutiches",
    );
    const areeIdMap = new Map();
    for (const area of aree) {
      areeIdMap.set(area.document_id, area.id);
    }
    console.log(`   ✓ Mapped ${areeIdMap.size} unique aree terapeutiche`);

    // Step 6: Insert Products and relationships
    console.log("\n💾 Step 6: Inserting products and relationships...");
    let productCount = 0;

    for (const productVersion of products) {
      const data = JSON.parse(productVersion.data);
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");

      // Insert product
      const [result] = await connection.execute(
        `
        INSERT INTO prodottos 
        (document_id, slug, name, sottotitolo, description, indicazione, 
         posologia_modo_duso, mercato, created_at, updated_at, published_at, 
         created_by_id, locale)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NULL)
      `,
        [
          productVersion.related_document_id,
          data.Slug || null,
          data.Name || "Unknown Product",
          data.sottotitolo || null,
          JSON.stringify(data.Description || []),
          JSON.stringify(data.Indicazione || []),
          JSON.stringify(data.posologiaModoDuso || []),
          data.Mercato || null,
          now,
          now,
          now,
        ],
      );

      const productId = result.insertId;
      productCount++;
      console.log(`   ✓ [${productCount}/${products.length}] ${data.Name}`);

      // Insert formulazioni relationships
      if (data.formulazioni && Array.isArray(data.formulazioni)) {
        for (let i = 0; i < data.formulazioni.length; i++) {
          const formDocId = data.formulazioni[i].documentId;
          const formId = formulazioniIdMap.get(formDocId);
          if (formId) {
            await connection.execute(
              `
              INSERT INTO prodottos_formulazioni_lnk 
              (prodotto_id, formulazione_id, formulazione_ord, prodotto_ord)
              VALUES (?, ?, ?, ?)
            `,
              [productId, formId, i + 1, i + 1],
            );
          }
        }
      }

      // Insert classificazioni relationships
      if (data.classificazioni && Array.isArray(data.classificazioni)) {
        for (let i = 0; i < data.classificazioni.length; i++) {
          const classifDocId = data.classificazioni[i].documentId;
          const classifId = classificazioniIdMap.get(classifDocId);
          if (classifId) {
            await connection.execute(
              `
              INSERT INTO prodottos_classificazioni_lnk 
              (prodotto_id, classificazioni_id, classificazioni_ord, prodotto_ord)
              VALUES (?, ?, ?, ?)
            `,
              [productId, classifId, i + 1, i + 1],
            );
          }
        }
      }

      // Insert aree_terapeutiche relationships
      if (data.aree_terapeutiche && Array.isArray(data.aree_terapeutiche)) {
        for (let i = 0; i < data.aree_terapeutiche.length; i++) {
          const areaDocId = data.aree_terapeutiche[i].documentId;
          const areaId = areeIdMap.get(areaDocId);
          if (areaId) {
            await connection.execute(
              `
              INSERT INTO prodottos_aree_terapeutiche_lnk 
              (prodotto_id, aree_terapeutiche_id, aree_terapeutiche_ord, prodotto_ord)
              VALUES (?, ?, ?, ?)
            `,
              [productId, areaId, i + 1, i + 1],
            );
          }
        }
      }

      // Insert file relationships (Images, video, PDF)
      if (data.Images && Array.isArray(data.Images)) {
        for (let i = 0; i < data.Images.length; i++) {
          const fileId = data.Images[i].id;
          if (fileId && typeof fileId === "number") {
            await connection.execute(
              `
              INSERT INTO files_related_mph 
              (file_id, related_id, related_type, field, \`order\`)
              VALUES (?, ?, 'api::prodotto.prodotto', 'Images', ?)
            `,
              [fileId, productId, i + 1],
            );
          }
        }
      }

      if (data.video && typeof data.video === "number") {
        await connection.execute(
          `
          INSERT INTO files_related_mph 
          (file_id, related_id, related_type, field, \`order\`)
          VALUES (?, ?, 'api::prodotto.prodotto', 'video', 1)
        `,
          [data.video, productId],
        );
      } else if (
        data.video &&
        data.video.id &&
        typeof data.video.id === "number"
      ) {
        await connection.execute(
          `
          INSERT INTO files_related_mph 
          (file_id, related_id, related_type, field, \`order\`)
          VALUES (?, ?, 'api::prodotto.prodotto', 'video', 1)
        `,
          [data.video.id, productId],
        );
      }

      if (data.PDF && typeof data.PDF === "number") {
        await connection.execute(
          `
          INSERT INTO files_related_mph 
          (file_id, related_id, related_type, field, \`order\`)
          VALUES (?, ?, 'api::prodotto.prodotto', 'PDF', 1)
        `,
          [data.PDF, productId],
        );
      } else if (data.PDF && data.PDF.id && typeof data.PDF.id === "number") {
        await connection.execute(
          `
          INSERT INTO files_related_mph 
          (file_id, related_id, related_type, field, \`order\`)
          VALUES (?, ?, 'api::prodotto.prodotto', 'PDF', 1)
        `,
          [data.PDF.id, productId],
        );
      }
    }

    // Step 7: Verify recovery
    console.log("\n✅ Step 7: Verifying recovery...");
    const [prodottosCount] = await connection.execute(
      "SELECT COUNT(*) as cnt FROM prodottos",
    );
    const [formulazioniCount] = await connection.execute(
      "SELECT COUNT(*) as cnt FROM formulaziones",
    );
    const [classificazioniCount] = await connection.execute(
      "SELECT COUNT(*) as cnt FROM classificazionis",
    );
    const [formLinks] = await connection.execute(
      "SELECT COUNT(*) as cnt FROM prodottos_formulazioni_lnk",
    );
    const [classifLinks] = await connection.execute(
      "SELECT COUNT(*) as cnt FROM prodottos_classificazioni_lnk",
    );
    const [areeLinks] = await connection.execute(
      "SELECT COUNT(*) as cnt FROM prodottos_aree_terapeutiche_lnk",
    );
    const [fileLinks] = await connection.execute(
      'SELECT COUNT(*) as cnt FROM files_related_mph WHERE related_type = "api::prodotto.prodotto"',
    );

    console.log("\n📊 RECOVERY SUMMARY:");
    console.log(`   Products: ${prodottosCount[0].cnt}`);
    console.log(`   Formulazioni: ${formulazioniCount[0].cnt}`);
    console.log(`   Classificazioni: ${classificazioniCount[0].cnt}`);
    console.log(`   Product-Formulazione links: ${formLinks[0].cnt}`);
    console.log(`   Product-Classificazioni links: ${classifLinks[0].cnt}`);
    console.log(`   Product-Aree Terapeutiche links: ${areeLinks[0].cnt}`);
    console.log(`   Product-File links: ${fileLinks[0].cnt}`);

    console.log("\n✅ DATA RECOVERY COMPLETED SUCCESSFULLY!\n");
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.error(error);
    throw error;
  } finally {
    await connection.end();
    console.log("🔌 Database connection closed");
  }
}

// Run recovery
console.log("🚨 DMG STRAPI DATA RECOVERY SCRIPT");
console.log("=".repeat(50));
console.log("Starting recovery process...\n");

recoverData()
  .then(() => {
    console.log("🎉 Recovery process finished!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Recovery failed:", error.message);
    process.exit(1);
  });
