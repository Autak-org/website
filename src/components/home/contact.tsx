import { Container, SectionHeader } from "@/components/ui/section";
import { FrameImage } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";
import { ArrowRight, Calendar, Mail, Phone, Pin } from "@/components/icons";
import { site } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Contact({
  dictionary,
  withImage = true,
}: {
  dictionary: Dictionary;
  withImage?: boolean;
}) {
  const { contact } = dictionary;

  return (
    <section
      id="contact"
      className="scroll-mt-header border-t border-ink-200 bg-ink-50 py-14 sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow={contact.eyebrow}
              title={contact.title}
              intro={contact.body}
            />

            <ul className="mt-10 space-y-3">
              <ContactRow
                Icon={Mail}
                label={contact.emailLabel}
                value={site.email}
                href={`mailto:${site.email}`}
              />
              <ContactRow
                Icon={Phone}
                label={contact.phoneLabel}
                value={site.phone}
                href={`tel:${site.phoneHref}`}
              />
              <ContactRow
                Icon={Pin}
                label={contact.addressLabel}
                value={`${site.address.street}, ${site.address.city}`}
                href={site.mapsUrl}
                external
                hint={contact.directions}
              />
              <ContactRow
                Icon={Calendar}
                label={contact.hours}
                value={site.meeting.replace("https://", "")}
                href={site.meeting}
                external
              />
            </ul>

            {withImage ? (
              <FrameImage
                src="/images/media/demo-street.jpg"
                alt={contact.imageAlt}
                ratio="16/9"
                className="mt-6"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            ) : null}
          </Reveal>

          <Reveal delay={120}>
            <ContactForm dictionary={dictionary} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
  external = false,
  hint,
}: {
  Icon: (props: { className?: string }) => React.ReactElement;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  hint?: string;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 transition-colors duration-300 hover:border-brand-500/70 sm:gap-5 sm:p-5"
      >
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-semibold tracking-[0.12em] text-ink-500 uppercase sm:tracking-[0.16em]">
            {label}
          </span>
          <span className="mt-1 block font-semibold break-words text-ink-900">
            {value}
          </span>
          {hint ? (
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-brand-600">
              {hint}
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          ) : null}
        </span>
      </a>
    </li>
  );
}
