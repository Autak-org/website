import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { routes, legalSlugs } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import {
  Calendar,
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  Phone,
  Pin,
} from "@/components/icons";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: Props) {
  const { footer, nav, audiences } = dictionary;

  const pages = [
    { href: routes.about(locale), label: nav.about },
    { href: routes.projects(locale), label: nav.projects },
    { href: routes.news(locale), label: nav.news },
    { href: routes.positions(locale), label: nav.positionsShort },
    { href: routes.shop(locale), label: nav.shop },
    { href: routes.contact(locale), label: nav.contact },
  ];

  const forYou = [
    { href: routes.partners(locale), label: audiences.partners.name },
    { href: routes.users(locale), label: audiences.users.name },
    { href: routes.members(locale), label: audiences.members.name },
  ];

  // The legal notice lives here rather than in the navigation bar.
  const legal = legalSlugs.map((slug) => ({
    href: routes.legal(locale, slug),
    label: dictionary.pages.legal[slug],
  }));

  const socials = [
    { href: site.social.instagram, label: "Instagram", Icon: Instagram },
    { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedIn },
    { href: site.social.facebook, label: "Facebook", Icon: Facebook },
  ];

  return (
    <footer className="border-t border-ink-200 bg-ink-950 text-ink-300">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        {/* Four equal columns on desktop, two on tablet: every heading starts
            on the same baseline and every list shares one left edge. */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <Image
              src="/images/logo-white.png"
              alt={site.name}
              width={180}
              height={60}
              className="h-9 w-auto self-start"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-400">
              {footer.tagline}
            </p>

            <ul className="mt-auto flex gap-3 pt-8">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ink-300 transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title={footer.sitemap}>
            {pages.map((page) => (
              <FooterLink key={page.href} href={page.href}>
                {page.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <div className="flex flex-col gap-10">
            <FooterColumn title={footer.audiences}>
              {forYou.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={footer.legal}>
              {legal.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          <FooterColumn title={dictionary.contact.eyebrow}>
            <FooterRow Icon={Mail} href={`mailto:${site.email}`}>
              {site.email}
            </FooterRow>
            <FooterRow Icon={Phone} href={`tel:${site.phoneHref}`}>
              {site.phone}
            </FooterRow>
            <FooterRow Icon={Pin} href={site.mapsUrl} external>
              {site.address.street}
              <br />
              {site.address.city}
            </FooterRow>
            <FooterRow Icon={Calendar} href={site.meeting} external>
              {footer.newsletterTitle}
              <br />
              <span className="text-ink-500">{footer.newsletterBody}</span>
            </FooterRow>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
          <Link
            href="/legacy"
            className="text-ink-500 underline underline-offset-4 transition-colors hover:text-ink-300"
          >
            {footer.legacyNotice}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-ink-400 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterRow({
  Icon,
  href,
  external = false,
  children,
}: {
  Icon: (props: { className?: string }) => React.ReactElement;
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex gap-3 text-sm leading-relaxed text-ink-400 transition-colors hover:text-white"
      >
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
        <span>{children}</span>
      </a>
    </li>
  );
}
