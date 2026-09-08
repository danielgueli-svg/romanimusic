import { Fragment, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { STORY_NODES, type StoryCta, type StoryEra, type StoryNode } from "@/data/story";
import { useI18n } from "@/i18n/provider";
import { locStory } from "@/i18n/content";
import { cn } from "@/lib/utils";

const ERA_ORDER: StoryEra[] = ["origin", "named", "rooms", "after", "archive", "next"];

const ERA_KEY: Record<
  StoryEra,
  | "story.era.origin"
  | "story.era.named"
  | "story.era.rooms"
  | "story.era.after"
  | "story.era.archive"
  | "story.era.next"
> = {
  origin: "story.era.origin",
  named: "story.era.named",
  rooms: "story.era.rooms",
  after: "story.era.after",
  archive: "story.era.archive",
  next: "story.era.next",
};

function StoryLink({
  cta,
  className,
  children,
}: {
  cta: StoryCta;
  className?: string;
  children: ReactNode;
}) {
  if (cta.type === "ext") {
    return (
      <a href={cta.href} className={className}>
        {children}
      </a>
    );
  }
  if (cta.type === "page") {
    return (
      <Link to={cta.to} className={className}>
        {children}
      </Link>
    );
  }
  if (cta.type === "history") {
    return (
      <Link to="/history/$slug" params={{ slug: cta.slug }} className={className}>
        {children}
      </Link>
    );
  }
  if (cta.type === "style") {
    return (
      <Link to="/styles/$slug" params={{ slug: cta.slug }} className={className}>
        {children}
      </Link>
    );
  }
  if (cta.type === "family") {
    return (
      <Link to="/families/$slug" params={{ slug: cta.slug }} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/artists/$slug" params={{ slug: cta.slug }} className={className}>
      {children}
    </Link>
  );
}

export function StoryTimeline() {
  const { t, locale } = useI18n();
  const labelId = useId();
  const [active, setActive] = useState(STORY_NODES[0]?.id ?? "");
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function goTo(id: string) {
    setActive(id);
    itemRefs.current[id]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
    itemRefs.current[id]?.querySelector("h3")?.focus();
  }

  useEffect(() => {
    const nodes = STORY_NODES.map((n) => itemRefs.current[n.id]).filter(
      (el): el is HTMLLIElement => Boolean(el),
    );
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    nodes.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function onKeyDown(e: KeyboardEvent<HTMLOListElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const i = STORY_NODES.findIndex((n) => n.id === active);
    const next = e.key === "ArrowDown" ? Math.min(i + 1, STORY_NODES.length - 1) : Math.max(i - 1, 0);
    const id = STORY_NODES[next]?.id;
    if (id) goTo(id);
  }

  let itemIndex = 0;

  return (
    <div className="timeline-wrapper" id="story">
      <p id={labelId} className="sr-only">
        {t("home.storyKicker")}
      </p>
      <ol
        className="timeline-container"
        aria-labelledby={labelId}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {ERA_ORDER.map((era) => {
          const nodes = STORY_NODES.filter((n) => n.era === era);
          if (!nodes.length) return null;
          return (
            <Fragment key={era}>
              <li className="timeline-era" id={`era-${era}`}>
                <h2>{t(ERA_KEY[era])}</h2>
              </li>
              {nodes.map((raw: StoryNode) => {
                const node = locStory(raw, locale);
                const side = itemIndex % 2 === 0 ? "is-left" : "is-right";
                itemIndex += 1;
                return (
                  <li
                    key={node.id}
                    id={node.id}
                    ref={(el) => {
                      itemRefs.current[node.id] = el;
                    }}
                    className={cn("timeline-item", side, active === node.id && "is-active")}
                  >
                    <StoryLink cta={node.cta} className="block no-underline">
                      <span className="date">{node.year}</span>
                      <h3 tabIndex={-1} className="outline-none">
                        {node.title}
                      </h3>
                      <ul className="timeline-sub">
                        {node.body.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      {node.image ? (
                        <img
                          src={node.image.src}
                          alt={node.image.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                    </StoryLink>
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}
