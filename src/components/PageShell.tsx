export function PageShell({
  children,
  wide = false,
  lang,
}: {
  children: React.ReactNode;
  /** BCP 47 tag for this page's content when it differs from the site (for example hi-Latn) */
  lang?: string;
  /** Wider column for long legal or specification-style pages */
  wide?: boolean;
}) {
  return (
    <div
      lang={lang}
      className={`mx-auto w-full flex-1 px-5 pb-24 pt-10 sm:px-8 lg:pt-14 ${
        wide ? "max-w-4xl" : "max-w-2xl lg:max-w-3xl"
      }`}
    >
      {children}
    </div>
  );
}
