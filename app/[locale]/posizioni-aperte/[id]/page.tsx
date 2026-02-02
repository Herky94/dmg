import JobDetailView from "@/components/lavora-con-noi/JobDetailView";
import {
  getAPIURL,
  REVALIDATE_TIME,
  getJobPositionsEndpoint,
} from "@/lib/strapi";
import { notFound } from "next/navigation";
import { getTranslations, type Locale } from "@/lib/translations";

async function getJobPositions(locale: "it" | "en" = "it") {
  try {
    const endpoint = getJobPositionsEndpoint(locale);
    const activeFilter =
      locale === "en"
        ? "filters[Active][$eq]=true"
        : "filters[Attiva][$eq]=true";
    const res = await fetch(
      getAPIURL(`${endpoint}?populate=*&${activeFilter}`),
      { next: { revalidate: REVALIDATE_TIME } },
    );
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return [];
  }
}

async function getJobBySlug(slug: string, locale: "it" | "en" = "it") {
  try {
    const endpoint = getJobPositionsEndpoint(locale);
    const res = await fetch(
      getAPIURL(`${endpoint}?populate=*&filters[Slug][$eq]=${slug}`),
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
  // Generate params for both locales
  const [positionsIT, positionsEN] = await Promise.all([
    getJobPositions("it"),
    getJobPositions("en"),
  ]);

  const paramsIT = positionsIT
    .filter((position: any) => position.Slug)
    .map((position: any) => ({
      locale: "it",
      id: String(position.Slug),
    }));

  const paramsEN = positionsEN
    .filter((position: any) => position.Slug)
    .map((position: any) => ({
      locale: "en",
      id: String(position.Slug),
    }));

  return [...paramsIT, ...paramsEN];
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}) {
  const resolvedParams = await params;
  const job = await getJobBySlug(resolvedParams.id, resolvedParams.locale);

  if (!job) {
    notFound();
  }

  const t = getTranslations(resolvedParams.locale);

  return (
    <JobDetailView
      job={job}
      locale={resolvedParams.locale}
      applyLabel={t.common.apply}
      sendingLabel={t.common.sending}
      successMessage={t.common.applicationSent}
      privacyRequired={t.common.privacyRequired}
      cvRequired={t.common.cvRequired}
      formLabels={t.pages.lavoraConNoi.form}
    />
  );
}
