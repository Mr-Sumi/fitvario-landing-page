// Shared by the DemoForm (browser) and /api/lead (server) so both sides validate the same way

export const MEMBER_RANGES = ["Under 100", "100 to 300", "300 to 600", "600 to 1,000", "More than 1,000"] as const;
export const CURRENT_METHODS = ["Excel or Google Sheets", "Paper register", "Other software", "Nothing yet"] as const;

export interface LeadInput {
  name: string;
  gymName: string;
  city: string;
  members: string;
  mobile: string;
  email: string;
  currentMethod: string;
  consent: boolean;
}

// Accepts +91 / 91 / 0 prefixes and spaces, returns the 10-digit number or null
export function normaliseMobile(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

export function validateLead(v: LeadInput): FieldErrors {
  const e: FieldErrors = {};
  if (v.name.trim().length < 2) e.name = "Enter your name";
  if (v.gymName.trim().length < 2) e.gymName = "Enter your gym's name";
  if (v.city.trim().length < 2) e.city = "Enter your city";
  if (!(MEMBER_RANGES as readonly string[]).includes(v.members)) e.members = "Pick a range";
  if (!normaliseMobile(v.mobile)) e.mobile = "Enter a 10-digit mobile number starting with 6, 7, 8 or 9";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "That email doesn't look right";
  if (!(CURRENT_METHODS as readonly string[]).includes(v.currentMethod)) e.currentMethod = "Pick one";
  if (!v.consent) e.consent = "Please tick this so we can contact you";
  return e;
}
