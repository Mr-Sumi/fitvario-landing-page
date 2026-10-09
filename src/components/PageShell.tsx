export function PageShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  /** Wider column for long legal or specification-style pages */
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full flex-1 px-5 pb-20 pt-16 sm:px-8 lg:pt-20 ${
        wide ? "max-w-4xl" : "max-w-2xl lg:max-w-3xl"
      }`}
    >
      {children}
    </div>
  );
}
