import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Mission } from "@/components/home/mission";
import { Pillars } from "@/components/home/pillars";
import { Flagship } from "@/components/home/flagship";
import { Gallery } from "@/components/home/gallery";
import { Press } from "@/components/home/press";
import { Projects } from "@/components/home/projects";
import { NewsPreview } from "@/components/home/news-preview";
import { Partners } from "@/components/home/partners";
import { Involve } from "@/components/home/involve";
import { Contact } from "@/components/home/contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dictionary={dictionary} />
      <Stats dictionary={dictionary} />
      <Mission dictionary={dictionary} />
      <Pillars locale={locale} dictionary={dictionary} />
      <Flagship locale={locale} dictionary={dictionary} />
      <Gallery locale={locale} dictionary={dictionary} />
      <Press locale={locale} dictionary={dictionary} />
      <Projects locale={locale} dictionary={dictionary} />
      <NewsPreview locale={locale} dictionary={dictionary} />
      <Partners dictionary={dictionary} />
      <Involve dictionary={dictionary} />
      <Contact dictionary={dictionary} />
    </>
  );
}
