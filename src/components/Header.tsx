import { publishedPages } from "@/config/pages";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  const featureLinks = publishedPages("feature").map((p) => ({
    href: p.path,
    label: p.navLabel ?? p.path,
  }));
  return <HeaderClient featureLinks={featureLinks} />;
}
