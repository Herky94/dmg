import JobDetailView from "@/components/lavora-con-noi/JobDetailView";
import { getAPIURL, REVALIDATE_TIME } from "@/lib/strapi";
import { notFound } from "next/navigation";
import { getTranslations, type Locale } from "@/lib/translations";

async function getJobPositions() {
  try {
    const res = await fetch(
      getAPIURL("posizioni-lavorative?populate=*&filters[Attiva][$eq]=true"),
      { next: { revalidate: REVALIDATE_TIME } },
    );
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return [];
  }
}

async function getJobBySlug(slug: string) {
  try {
    const res = await fetch(
      getAPIURL(`posizioni-lavorative?populate=*&filters[Slug][$eq]=${slug}`),
      { next: { revalidate: REVALIDATE_TIME } },
    );
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching job position:", error);
    return null;
  }
}

export async function generateStaticParams() {
  const positions = await getJobPositions();
  return positions.map((position: any) => ({
    id: position.Slug,
  }));
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}) {
  const resolvedParams = await params;
  const job = await getJobBySlug(resolvedParams.id);

  if (!job) {
    notFound();
  }

  const t = getTranslations(resolvedParams.locale);

  return (
    <JobDetailView
      job={job}
      applyLabel={t.common.apply}
      sendingLabel={t.common.sending}
      successMessage={t.common.applicationSent}
      privacyRequired={t.common.privacyRequired}
      cvRequired={t.common.cvRequired}
    />
  );
}
