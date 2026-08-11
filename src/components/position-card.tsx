import { Rule } from "@/components/ui/section";
import { t, type Dictionary, type Locale } from "@/i18n";
import type { Position } from "@/content/positions";

export function PositionCard({
  position,
  locale,
  dictionary,
}: {
  position: Position;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = dictionary.pages.positions;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 sm:p-8">
      <p className="inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
        {copy.kinds[position.kind]}
      </p>

      <h3 className="mt-5 text-xl leading-snug font-bold text-ink-900">
        {t(position.title, locale)}
      </h3>

      <Rule className="mt-5" />

      <dl className="mt-5 space-y-5 text-sm">
        <Row label={copy.fieldLabel} value={t(position.field, locale)} />
        <Row label={copy.taskLabel} value={t(position.task, locale)} />
        <Row label={copy.learnLabel} value={t(position.learn, locale)} />
      </dl>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 leading-relaxed text-ink-600">{value}</dd>
    </div>
  );
}
