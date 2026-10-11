import Link from "next/link";
import { ContentLayout, Section } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { featureStatus } from "@/lib/features";
import { getCompetitor, VERIFIED_LABEL } from "@/content/compare";

// Fitvario's cell can only say "Yes" when the flag is live. Everything else is stated plainly.
function fitvarioCell(key: Parameters<typeof featureStatus>[0]): string {
  const s = featureStatus(key);
  if (s === "live" || s === "live-per-site") return "Yes";
  if (s === "in-code") return "Not claimed on this site yet";
  return "No";
}

export function ComparePage({ path }: { path: string }) {
  const c = getCompetitor(path);
  const toc = [
    { id: "who", label: "Who each is for" },
    { id: "table", label: "Feature comparison" },
    { id: "better", label: `Where ${c.shortName} may be the better choice` },
    { id: "fitvario", label: "Where Fitvario may fit better" },
    { id: "pricing", label: "Pricing as stated" },
    { id: "checklist", label: "Decision checklist" },
    { id: "sources", label: "Sources" },
  ];

  return (
    <ContentLayout
      path={path}
      h1={`${c.name} alternative: Fitvario compared fairly`}
      lead={c.lead}
      toc={toc}
      related={["/features", "/pricing"]}
    >
      <Section id="who" title="Who each is for">
        <p>
          <strong>{c.name}:</strong> {c.whoFor.them}
        </p>
        <p>
          <strong>Fitvario:</strong> {c.whoFor.fitvario}
        </p>
      </Section>

      <Section id="table" title="Feature comparison">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-2 pr-4 font-medium">Feature</th>
                <th className="py-2 pr-4 font-medium">{c.shortName} (as stated by the source)</th>
                <th className="py-2 font-medium">Fitvario (as stated on this site)</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.feature} className="border-b border-slate-100 align-top">
                  <td className="py-2 pr-4 font-medium text-slate-900">{r.feature}</td>
                  <td className="py-2 pr-4 text-slate-700">{r.theirs}</td>
                  <td className="py-2 text-slate-700">{r.fitvarioKey ? fitvarioCell(r.fitvarioKey) : r.fitvario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-slate-500">
          &quot;Not claimed on this site yet&quot; means Fitvario does not state it as available today. It does not mean it
          can never be. &quot;Not stated&quot; for {c.shortName} means the page we read did not say.
        </p>
      </Section>

      <MidCta text="Want to see Fitvario with your own gym's workflow?" location={`compare-${c.shortName}`} />

      <Section id="better" title={`Where ${c.shortName} may be the better choice`}>
        <ul className="list-disc space-y-2 pl-5">
          {c.better.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section id="fitvario" title="Where Fitvario may fit better">
        <ul className="list-disc space-y-2 pl-5">
          {c.fitvarioFits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section id="pricing" title="Pricing as publicly stated">
        {c.pricing.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="text-[13px] text-slate-500">
          Prices as stated by each source on {VERIFIED_LABEL}. They may have changed since. Check the vendor&apos;s
          own page before you decide.
        </p>
      </Section>

      <Section id="checklist" title="Decision checklist">
        <ul className="list-disc space-y-2 pl-5">
          {c.checklist.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section id="sources" title="Sources">
        <ul className="list-disc space-y-1 pl-5">
          {c.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="nofollow noopener noreferrer" target="_blank" className="text-teal-700 underline underline-offset-2">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        {c.notes?.map((n) => (
          <p key={n} className="text-[13px] text-slate-500">
            {n}
          </p>
        ))}
        <p className="font-medium text-slate-800">Last verified: {VERIFIED_LABEL}</p>
        <p className="text-[13px] text-slate-500">
          All product names and trademarks belong to their owners. Information is based on public sources as of{" "}
          {VERIFIED_LABEL}. Tell us if anything is out of date: write to{" "}
          <a href="mailto:support@fitvario.com?subject=Comparison%20correction" className="underline underline-offset-2">
            support@fitvario.com
          </a>
          .
        </p>
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        See what{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Fitvario covers
        </Link>{" "}
        and{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          how it is priced
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
