// A clearly marked slot for a YouTube demo that has not been recorded yet. No fake player, no fake thumbnail.
export function VideoPlaceholder({ title }: { title: string }) {
  return (
    <figure>
      <div
        role="img"
        aria-label={`Video abhi available nahi hai: ${title}`}
        className="flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 px-6 text-center text-sm text-slate-600"
      >
        Video placeholder: {title}. TODO: Hindi YouTube demo record hone par yahan embed karein.
      </div>
    </figure>
  );
}
