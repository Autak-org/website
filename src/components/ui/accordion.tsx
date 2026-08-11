import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  title: string;
  meta?: string;
  body: readonly { label: string; text: string }[];
};

/**
 * Native `<details>` disclosure: keyboard accessible, searchable in-page and
 * fully functional without JavaScript.
 */
export function Accordion({
  items,
  className,
}: {
  items: readonly AccordionItem[];
  className?: string;
}) {
  return (
    <ul className={cn("divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block text-xl font-bold text-ink-900 transition-colors group-hover:text-brand-600">
                  {item.title}
                </span>
                {item.meta ? (
                  <span className="mt-1 block text-sm text-ink-500">
                    {item.meta}
                  </span>
                ) : null}
              </span>

              <span
                aria-hidden="true"
                className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-200 text-brand-600 transition-colors group-hover:border-brand-500 group-open:bg-brand-500 group-open:text-white"
              >
                <span className="absolute h-px w-4 bg-current" />
                <span className="absolute h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
              </span>
            </summary>

            <div className="border-t border-ink-200 px-6 pb-8 sm:px-8">
              <dl className="grid gap-6 pt-6 sm:grid-cols-2">
                {item.body.map((entry) => (
                  <div key={entry.label}>
                    <dt className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
                      {entry.label}
                    </dt>
                    <dd className="mt-2 leading-relaxed text-ink-700">
                      {entry.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
