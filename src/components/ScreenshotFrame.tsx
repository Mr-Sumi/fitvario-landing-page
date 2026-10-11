import Image from "next/image";
import { screenDef, screenFile } from "@/config/screens";

// One frame for every product screenshot.
//  - phone:   9:19.5, rounded device frame
//  - desktop: 16:10, browser window frame
// With a real file (public/screens/<id>.webp from scripts/process-screens.mjs) it renders next/image with explicit
// width and height. Without one it renders a neutral block marked data-placeholder, which the launch check
// rejects on any indexable page. It never draws UI that has not been seen.
export function ScreenshotFrame({
  screen,
  caption,
  priority = false,
  className = "",
}: {
  screen: string;
  caption?: string;
  /** Only the LCP image on a page should be true */
  priority?: boolean;
  className?: string;
}) {
  const def = screenDef(screen);
  if (!def) throw new Error(`Unknown screen id: ${screen}`);
  const file = screenFile(screen);
  const phone = def.device === "phone";

  // No file yet: render nothing. A placeholder is only shown when NEXT_PUBLIC_SHOW_PLACEHOLDERS=1 (local review), so
  // visitors never see one, and the launch check fails if one is ever rendered into a built indexable page.
  if (!file && process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "1") return null;

  const inner = file ? (
    <Image
      src={file.src}
      width={file.width}
      height={file.height}
      alt={def.alt}
      priority={priority}
      sizes={phone ? "(min-width: 1024px) 280px, 70vw" : "(min-width: 1024px) 640px, 100vw"}
      className="h-full w-full object-cover object-top"
    />
  ) : (
    <div
      data-placeholder={def.id}
      role="img"
      aria-label={`Placeholder for screenshot ${String(def.n).padStart(2, "0")}: ${def.title}`}
      className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[#eceee6] px-4 text-center text-sm text-mute"
    >
      <span className="font-semibold text-ink">Screenshot {String(def.n).padStart(2, "0")}</span>
      <span>{def.title}</span>
    </div>
  );

  return (
    <figure className={className}>
      {phone ? (
        <div className="fv-frame mx-auto w-full max-w-[280px] rounded-[28px] border border-ink bg-ink p-2">
          <div className="aspect-[9/19.5] overflow-hidden rounded-[20px] bg-white">{inner}</div>
        </div>
      ) : (
        <div className="fv-frame overflow-hidden rounded-[8px] border border-line bg-white">
          <div className="flex h-8 items-center gap-1.5 border-b border-line bg-[#f1f2ec] px-3" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4d7cd]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4d7cd]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4d7cd]" />
          </div>
          <div className="aspect-[16/10] overflow-hidden">{inner}</div>
        </div>
      )}
      {caption && <figcaption className="mt-3 text-center text-[13px] text-mute">{caption}</figcaption>}
    </figure>
  );
}
