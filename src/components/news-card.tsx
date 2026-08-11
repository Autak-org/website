import Image from "next/image";
import { Rule } from "@/components/ui/section";
import { ArrowRight } from "@/components/icons";
import { t } from "@/i18n/localized";
import type { NewsItem } from "@/content/news";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { cn } from "@/lib/cn";

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function NewsCard({
  item,
  locale,
  dictionary,
  className,
}: {
  item: NewsItem;
  locale: Locale;
  dictionary: Dictionary;
  className?: string;
}) {
  const categories = dictionary.pages.news.categories;

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white",
        className,
      )}
    >
      <div className="relative aspect-[16/9] border-b border-ink-200">
        <Image
          src={item.image}
          alt={t(item.imageAlt, locale)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.14em] uppercase">
          <span className="text-brand-600">{categories[item.category]}</span>
          <span aria-hidden="true" className="h-px w-6 bg-ink-300" />
          <time dateTime={item.date} className="text-ink-500 normal-case">
            {formatDate(item.date, locale)}
          </time>
        </p>

        <h3 className="mt-4 text-xl leading-snug font-bold text-ink-900">
          {t(item.title, locale)}
        </h3>

        <Rule className="mt-4" />

        <p className="mt-4 leading-relaxed text-ink-600">{t(item.excerpt, locale)}</p>

        {item.link ? (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {t(item.link.label, locale)}
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
