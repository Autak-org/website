import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { routes } from "@/lib/routes";
import { t } from "@/i18n/localized";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** The one project preview used on the homepage, the index and the hubs. */
export function ProjectCard({
  project,
  locale,
  contribution,
  className,
}: {
  project: Project;
  locale: Locale;
  /** Adds the "what needs doing" line used on the members page. */
  contribution?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-colors duration-300 hover:border-brand-500/70",
        className,
      )}
    >
      <Link href={routes.project(locale, project.slug)} className="flex h-full flex-col">
        <span className="relative block aspect-[4/3] overflow-hidden border-b border-ink-200">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink-700">
            {t(project.status, locale)}
          </span>
        </span>

        <span className="flex flex-1 flex-col p-6">
          <span className="text-xl font-bold text-ink-900 transition-colors group-hover:text-brand-600">
            {t(project.name, locale)}
          </span>
          <span className="mt-3 block h-px w-full bg-ink-200" />
          <span className="mt-4 block leading-relaxed text-ink-600">
            {t(project.summary, locale)}
          </span>

          {contribution ? (
            <span className="mt-5 block rounded-xl bg-brand-50 p-4 text-sm leading-relaxed text-ink-700">
              <span className="mb-1 block text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">
                {contribution}
              </span>
              {t(project.contribution, locale)}
            </span>
          ) : null}

          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-600">
            {t(project.tagline, locale)}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </span>
      </Link>
    </article>
  );
}
