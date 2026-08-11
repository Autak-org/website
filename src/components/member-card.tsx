import Image from "next/image";
import { t, type Locale } from "@/i18n";
import type { Member } from "@/content/members";

export function MemberCard({
  member,
  locale,
}: {
  member: Member;
  locale: Locale;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-colors duration-300 hover:border-brand-500/70">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col border-t border-ink-200 p-5">
        <h3 className="text-lg leading-tight font-bold text-ink-900">
          {member.name}
        </h3>
        {member.role ? (
          <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">
            {t(member.role, locale)}
          </p>
        ) : null}
        {member.bio ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-500">
            {t(member.bio, locale)}
          </p>
        ) : null}
        {member.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2 border-t border-ink-100 pt-4">
            {member.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-500"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
