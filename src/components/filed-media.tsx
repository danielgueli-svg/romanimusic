import type { FiledClip as Clip, FiledMedia as Media } from "@/data/media";
import { clipsOf } from "@/data/media";
import { cn } from "@/lib/utils";

export function FiledPhoto({
  media,
  size = "full",
}: {
  media?: Media;
  size?: "small" | "full";
}) {
  if (!media?.photo) return null;
  return (
    <figure className={size === "small" ? "mt-6 w-36 sm:w-44" : "mt-8"}>
      <img
        src={media.photo.src}
        alt={media.photo.alt}
        loading="lazy"
        decoding="async"
        className={cn("object-cover object-top", size === "small" ? "w-full" : "w-full")}
      />
      <figcaption className="mt-2 text-xs leading-relaxed text-faint">
        {media.photo.href ? (
          <a href={media.photo.href} className="underline">
            {media.photo.credit}
          </a>
        ) : (
          media.photo.credit
        )}
      </figcaption>
    </figure>
  );
}

function ClipFrame({ clip }: { clip: Clip }) {
  return (
    <figure className="mt-8">
      <div className="aspect-video w-full border border-border bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${clip.id}`}
          title={clip.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed text-faint">
        {clip.title}. {clip.credit}.
      </figcaption>
    </figure>
  );
}

export function FiledClip({ media }: { media?: Media }) {
  const clips = clipsOf(media);
  if (!clips.length) return null;
  return (
    <>
      {clips.map((clip) => (
        <ClipFrame key={clip.id} clip={clip} />
      ))}
    </>
  );
}

export function FiledMedia({ media }: { media?: Media }) {
  if (!media?.photo && !clipsOf(media).length) return null;
  return (
    <div>
      <FiledPhoto media={media} />
      <FiledClip media={media} />
    </div>
  );
}
