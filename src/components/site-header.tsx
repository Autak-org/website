"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";
import { projects } from "@/content/projects";
import { t } from "@/i18n/localized";
import {
  locales,
  localeNames,
  machineTranslated,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { ArrowRight, Check, Chevron, Close, Globe, Menu } from "@/components/icons";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

type NavLink = { href: string; label: string; hint?: string; external?: boolean };

export function SiteHeader({ locale, dictionary }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { nav, join, audiences } = dictionary;

  const primary: NavLink[] = [
    { href: routes.about(locale), label: nav.about },
    { href: routes.news(locale), label: nav.news },
    { href: routes.shop(locale), label: nav.shop },
    { href: routes.contact(locale), label: nav.contact },
  ];

  const projectLinks: NavLink[] = [
    { href: routes.projects(locale), label: nav.allProjects },
    ...projects.map((project) => ({
      href: routes.project(locale, project.slug),
      label: t(project.name, locale),
      hint: t(project.tagline, locale),
    })),
  ];

  const audienceLinks: NavLink[] = [
    {
      href: routes.partners(locale),
      label: audiences.partners.name,
      hint: audiences.partners.blurb,
    },
    {
      href: routes.users(locale),
      label: audiences.users.name,
      hint: audiences.users.blurb,
    },
    {
      href: routes.members(locale),
      label: audiences.members.name,
      hint: audiences.members.blurb,
    },
  ];

  const joinLinks: NavLink[] = [
    { href: site.joinForm, label: join.member, hint: join.memberHint, external: true },
    { href: site.meeting, label: join.meeting, hint: join.meetingHint, external: true },
    { href: routes.positions(locale), label: join.positions, hint: join.positionsHint },
    { href: site.paypal, label: join.donate, hint: join.donateHint, external: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigating away closes the mobile panel. Adjusting during render rather
  // than in an effect avoids a frame where the old panel is still open.
  const [panelPath, setPanelPath] = useState(pathname);
  if (panelPath !== pathname) {
    setPanelPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape dismisses the mobile panel and Tab stays inside it while open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const solid = scrolled || open;
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-ink-200 bg-white/95 backdrop-blur-xl"
          : "border-b border-white/10 bg-transparent",
      )}
    >
      {/* One row, always: brand, navigation, language, join. */}
      <div className="mx-auto flex h-header w-full max-w-7xl items-center gap-4 px-6 lg:px-10">
        <Link
          href={routes.home(locale)}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={site.name}
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={40}
            height={35}
            priority
            className="h-8 w-auto"
          />
          <span
            className={cn(
              "font-display text-lg font-bold transition-colors",
              solid ? "text-ink-900" : "text-white",
            )}
          >
            autak
          </span>
        </Link>

        <nav
          aria-label={dictionary.a11y.mainNav}
          className="ml-2 hidden min-w-0 flex-1 items-center lg:flex"
        >
          <NavItem
            href={routes.about(locale)}
            label={nav.about}
            solid={solid}
            active={isActive(routes.about(locale))}
          />
          <Dropdown
            label={nav.projects}
            items={projectLinks}
            solid={solid}
            active={isActive(routes.projects(locale))}
          />
          {primary.slice(1).map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              solid={solid}
              active={isActive(link.href)}
            />
          ))}
          <Dropdown
            label={nav.forYou}
            items={audienceLinks}
            solid={solid}
            active={audienceLinks.some((link) => isActive(link.href))}
          />
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <LocaleMenu
            locale={locale}
            solid={solid}
            label={dictionary.a11y.languageLabel}
          />

          <Dropdown
            label={join.label}
            items={joinLinks}
            solid={solid}
            variant="cta"
            align="end"
            className="hidden sm:block"
          />

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dictionary.a11y.closeMenu : dictionary.a11y.openMenu}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-ink-900 hover:bg-ink-100" : "text-white hover:bg-white/15",
            )}
          >
            {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-0 top-header z-40 overflow-y-auto overscroll-contain bg-white lg:hidden"
        >
          <nav
            aria-label={dictionary.a11y.mainNav}
            className="mx-auto w-full max-w-7xl px-6 pt-6 pb-16"
          >
            <ul className="border-t border-ink-200">
              {[{ href: routes.projects(locale), label: nav.projects }, ...primary].map(
                (link) => (
                  <li key={link.href} className="border-b border-ink-200">
                    <Link
                      href={link.href}
                      onClick={close}
                      className="block py-4 text-xl font-semibold text-ink-900 transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <MobileGroup title={dictionary.audiences.label} links={audienceLinks} onNavigate={close} />
            <MobileGroup title={join.label} links={joinLinks} onNavigate={close} />
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function NavItem({
  href,
  label,
  solid,
  active,
}: {
  href: string;
  label: string;
  solid: boolean;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
        solid
          ? active
            ? "text-brand-600"
            : "text-ink-700 hover:bg-brand-50 hover:text-brand-600"
          : active
            ? "text-white"
            : "text-white/85 hover:bg-white/15 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}

/**
 * Hover-or-click disclosure. Hover opens it for pointer users, click and the
 * keyboard work identically, and Escape or a click outside closes it.
 */
function Dropdown({
  label,
  items,
  solid,
  active = false,
  variant = "nav",
  align = "start",
  className,
}: {
  label: string;
  items: NavLink[];
  solid: boolean;
  active?: boolean;
  variant?: "nav" | "cta";
  align?: "start" | "end";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const cta = variant === "cta";

  return (
    <div
      ref={wrapperRef}
      className={cn("relative", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors",
          cta
            ? "bg-brand-500 px-5 py-2.5 text-white shadow-[0_10px_30px_-8px_rgba(255,0,102,0.55)] hover:bg-brand-600"
            : cn(
                "px-3 py-2 font-medium",
                solid
                  ? active
                    ? "text-brand-600"
                    : "text-ink-700 hover:bg-brand-50 hover:text-brand-600"
                  : active
                    ? "text-white"
                    : "text-white/85 hover:bg-white/15 hover:text-white",
              ),
        )}
      >
        {label}
        <Chevron
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          id={id}
          className={cn(
            "absolute top-full z-50 w-72 pt-2",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          <ul className="overflow-hidden rounded-2xl border border-ink-200 bg-white py-2 shadow-xl">
            {items.map((item) => (
              <li key={item.href}>
                <MenuLink item={item} onNavigate={() => setOpen(false)} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function MenuLink({
  item,
  onNavigate,
}: {
  item: NavLink;
  onNavigate: () => void;
}) {
  const content = (
    <>
      <span className="flex items-center gap-2 font-semibold text-ink-900 group-hover:text-brand-600">
        {item.label}
        {item.external ? (
          <ArrowRight className="h-3.5 w-3.5 -rotate-45 text-ink-400" />
        ) : null}
      </span>
      {item.hint ? (
        <span className="mt-0.5 block text-sm leading-snug text-ink-500">
          {item.hint}
        </span>
      ) : null}
    </>
  );

  const className = "group block px-4 py-3 transition-colors hover:bg-brand-50";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} onClick={onNavigate} className={className}>
      {content}
    </Link>
  );
}

function MobileGroup({
  title,
  links,
  onNavigate,
}: {
  title: string;
  links: NavLink[];
  onNavigate: () => void;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-semibold tracking-[0.2em] text-ink-500 uppercase">
        {title}
      </h2>
      <ul className="mt-4 grid gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <MenuLink item={link} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Language menu listing every locale, with a note on machine translation. */
function LocaleMenu({
  locale,
  solid,
  label,
}: {
  locale: Locale;
  solid: boolean;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const hrefFor = (target: Locale) => {
    const rest = pathname.replace(new RegExp(`^/${locale}`), "");
    return `/${target}${rest}`;
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors",
          solid
            ? "border border-ink-200 bg-white/80 text-ink-700 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600"
            : "border border-white/20 bg-white/10 text-white hover:bg-white/15",
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
        <Chevron
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div id={id} className="absolute top-full right-0 z-50 w-64 pt-2">
          <ul className="overflow-hidden rounded-2xl border border-ink-200 bg-white py-2 shadow-xl">
            {locales.map((item) => (
              <li key={item}>
                <Link
                  href={hrefFor(item)}
                  hrefLang={item}
                  lang={item}
                  onClick={() => setOpen(false)}
                  aria-current={item === locale ? "true" : undefined}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-brand-50"
                >
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-medium",
                        item === locale ? "text-brand-600" : "text-ink-800",
                      )}
                    >
                      {localeNames[item]}
                    </span>
                    <span className="mt-0.5 block text-xs tracking-wide text-ink-400 uppercase">
                      {item}
                      {machineTranslated.has(item) ? " · auto" : ""}
                    </span>
                  </span>
                  {item === locale ? (
                    <Check className="h-4 w-4 shrink-0 text-brand-500" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
