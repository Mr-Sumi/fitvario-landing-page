import Link from "next/link";
import { isPublishedPath } from "@/config/pages";

// A link that only exists while the target page is published; otherwise just the text
export function PageLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (!isPublishedPath(href)) return <>{children}</>;
  return (
    <Link href={href} className="font-medium text-teal-700 underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}
