import { isLive } from "@/lib/features";

// Information cards in the style of the floating UI cards in the reference. They are NOT screenshots and do not
// pretend to be the app: each says what it is. Only facts the site already states, with invented example amounts
// labelled as examples.

// The rupee sign sits in the fonts' latin-ext subset, which would add two font downloads on the home page.
// Drawing just that glyph with the system font avoids them.
function Money({ v }: { v: string }) {
  const parts = v.split("₹");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="fv-rs">₹</span>}
          {p}
        </span>
      ))}
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-ink">{children}</span>;
}

export function ReminderCard({ className = "" }: { className?: string }) {
  if (!isLive("whatsapp_expiry_reminders")) return null;
  const steps = [
    ["7", "days before"],
    ["3", "days before"],
    ["1", "day before"],
    ["+1", "day after"],
  ];
  return (
    <div className={`fv-frame rounded-[22px] bg-white p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-base font-bold text-ink">Renewal reminders</p>
        <Tag>WhatsApp</Tag>
      </div>
      <p className="mt-1 text-[13px] text-mute">Sent to the member before and after the plan ends</p>
      <ul className="mt-4 grid grid-cols-4 gap-2">
        {steps.map(([n, l]) => (
          <li key={n + l} className="rounded-[14px] bg-soft px-2 py-3 text-center">
            <p className="font-display text-2xl font-bold leading-none text-ink">{n}</p>
            <p className="mt-1.5 text-[11px] leading-tight text-mute">{l}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AttendanceCard({ className = "" }: { className?: string }) {
  if (!isLive("qr_attendance")) return null;
  const flow = ["Scan the gym QR", "Check-in saved", "Scan again", "Check-out and time"];
  return (
    <div className={`fv-frame rounded-[22px] bg-ink p-5 text-white ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-base font-bold">QR attendance</p>
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold">Two-scan mode</span>
      </div>
      <ol className="mt-4 space-y-2.5">
        {flow.map((t, i) => (
          <li key={t} className="flex items-center gap-3 text-[14px]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-[12px] font-bold text-ink">{i + 1}</span>
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function DuesCard({ className = "" }: { className?: string }) {
  if (!isLive("gst_tax_lines") || !isLive("dues_partial_payments")) return null;
  const rows: [string, string][] = [
    ["3-month plan", "₹3,000"],
    ["Tax line (example 18%)", "₹540"],
    ["Paid in cash today", "−₹2,000"],
  ];
  return (
    <div className={`fv-frame rounded-[22px] bg-white p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-base font-bold text-ink">Part payment and dues</p>
        <Tag>Example</Tag>
      </div>
      <dl className="tnum mt-4 space-y-2 text-[14px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-mute">{k}</dt>
            <dd className="font-medium text-ink"><Money v={v} /></dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 border-t border-line pt-3">
          <dt className="font-semibold text-ink">Still due</dt>
          <dd className="font-display text-xl font-bold text-ink"><Money v="₹1,540" /></dd>
        </div>
      </dl>
    </div>
  );
}
