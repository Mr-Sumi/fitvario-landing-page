// A clearly marked slot for a YouTube demo that has not been recorded yet. No fake player, no fake thumbnail.
export function VideoPlaceholder({ title }: { title: string }) {
  // Not rendered for visitors; shown only for local review (NEXT_PUBLIC_SHOW_PLACEHOLDERS=1)
  if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "1") return null;
  return (
    <figure>
      <div
        data-placeholder="video"
        role="img"
        aria-label={`Video abhi available nahi hai: ${title}`}
        className="flex aspect-video items-center justify-center rounded-[8px] border-2 border-dashed border-line bg-[#eceee6] px-6 text-center text-sm text-slate-600"
      >
        Video placeholder: {title}. TODO: Hindi YouTube demo record hone par yahan embed karein.
      </div>
    </figure>
  );
}
