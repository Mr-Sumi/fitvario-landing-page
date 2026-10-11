// Permanently removed URLs are rewritten here from next.config.ts (GONE_PATHS) so crawlers get a real 410
export function GET() {
  return new Response("This page has been permanently removed.", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}

export const HEAD = GET;
