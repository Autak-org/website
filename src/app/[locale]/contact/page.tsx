import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { FrameImage } from "@/components/ui/frame";
import { Contact } from "@/components/home/contact";
import { resolvePage, type LocaleParams } from "@/lib/page";
import { getDictionary, isLocale } from "@/i18n";
import { routes } from "@/lib/routes";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getDictionary(locale);
  return { title: pages.contact.title, description: pages.contact.intro };
}

export default async function ContactPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav, contact } = dictionary;

  return (
    <>
      <PageHero
        eyebrow={pages.contact.eyebrow}
        title={pages.contact.title}
        intro={pages.contact.intro}
        image="/images/media/booth-indoor.jpg"
        imageAlt={contact.teamImageAlt}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: nav.contact },
        ]}
        breadcrumbLabel={dictionary.a11y.breadcrumb}
      />

      <Contact dictionary={dictionary} withImage={false} />

      <Section divide>
        <FrameImage
          src="/images/media/demo-street.jpg"
          alt={contact.imageAlt}
          ratio="16/9"
          caption={contact.imageAlt}
          sizes="(min-width: 1024px) 80vw, 100vw"
        />
      </Section>
    </>
  );
}
