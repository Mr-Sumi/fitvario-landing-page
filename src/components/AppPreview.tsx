const screens = [
  {
    title: "Dashboard",
    subtitle: "Ops & KPIs",
    gradient: "from-teal-500 to-teal-700",
  },
  {
    title: "Storefront",
    subtitle: "Ecommerce",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    title: "Members",
    subtitle: "Plans & access",
    gradient: "from-indigo-500 to-violet-600",
  },
];

export function AppPreview() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-10 lg:gap-14">
      {screens.map((s, i) => (
        <div
          key={s.title}
          className="flex flex-col items-center"
          style={{ transform: i === 1 ? "translateY(-0.75rem)" : undefined }}
        >
          <div className="relative w-[198px] sm:w-[216px]">
            <div className="rounded-[2rem] border-[9px] border-slate-800 bg-slate-800 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.35)]">
              <div className="overflow-hidden rounded-[1.5rem] bg-slate-900">
                <div className="flex h-7 items-center justify-center border-b border-slate-700/80 bg-slate-800/90">
                  <span className="h-1 w-10 rounded-full bg-slate-600" />
                </div>
                <div className={`flex aspect-[9/18] flex-col bg-gradient-to-br p-4 ${s.gradient}`}>
                  <div className="mb-3 h-[5.5rem] rounded-xl bg-white/15 backdrop-blur-[2px]" />
                  <div className="space-y-2">
                    <div className="h-2.5 w-[75%] rounded bg-white/35" />
                    <div className="h-2.5 w-[50%] rounded bg-white/22" />
                  </div>
                  <div className="mt-auto flex gap-2 pt-4">
                    <div className="h-9 flex-1 rounded-lg bg-white/28" />
                    <div className="h-9 flex-1 rounded-lg bg-white/18" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-sm font-medium text-slate-800">
            {s.title}
            <span className="mt-0.5 block text-xs font-normal text-slate-500">{s.subtitle}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
