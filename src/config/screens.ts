// The list of real screenshots the site needs, in the order the owner supplies them (docs/seo/screens/NN-*.png).
// A screen with no file renders a neutral placeholder block marked data-placeholder, and the launch check fails
// while any placeholder is on an indexable page. Nothing is drawn or invented.
import manifestJson from "../../public/screens/manifest.json";

export type Device = "phone" | "desktop";

export interface ScreenDef {
  /** Two-digit number, also the filename prefix in docs/seo/screens */
  n: number;
  id: string;
  device: Device;
  title: string;
  /** Alt text used once the real image is in place */
  alt: string;
  usedOn: string[];
}

export const screens: ScreenDef[] = [
  { n: 1, id: "owner-home", device: "phone", title: "Owner home screen in the Android app (collections, members, today's follow-ups)", alt: "The owner home screen of the Fitvario app showing today's collections and follow-ups", usedOn: ["/", "/features"] },
  { n: 2, id: "member-home", device: "phone", title: "Member home screen: plan, end date, check-in button", alt: "A member's home screen in the Fitvario app showing the plan and its end date", usedOn: ["/", "/features/member-app"] },
  { n: 3, id: "qr-scan", device: "phone", title: "Member scanning the gym QR code", alt: "A member scanning the gym QR code in the Fitvario app", usedOn: ["/features/qr-attendance"] },
  { n: 4, id: "gym-qr", device: "phone", title: "The gym's QR code screen (owner or staff view)", alt: "The gym QR code screen in the Fitvario app", usedOn: ["/features/qr-attendance"] },
  { n: 5, id: "invoice-tax-due", device: "phone", title: "An invoice with a tax line and a due amount", alt: "An invoice in the Fitvario app showing a tax line and the amount still due", usedOn: ["/features/gst-billing"] },
  { n: 6, id: "dues-list", device: "phone", title: "Dues for today and the dues summary", alt: "The dues list in the Fitvario app", usedOn: ["/features/gst-billing"] },
  { n: 7, id: "wa-expiry-reminder", device: "phone", title: "The membership-expiring WhatsApp message on a test phone", alt: "The membership expiring WhatsApp message as it appears on a member's phone", usedOn: ["/features/whatsapp-reminders", "/"] },
  { n: 8, id: "crm-followups", device: "phone", title: "Today's enquiry follow-ups list", alt: "The list of today's enquiry follow-ups in the Fitvario app", usedOn: ["/features/gym-crm"] },
  { n: 9, id: "branding-settings", device: "phone", title: "Branding settings with app name and logo", alt: "The branding settings with an app name and logo in the Fitvario app", usedOn: ["/features/white-label-gym-app"] },
  { n: 10, id: "biometric-punches", device: "phone", title: "Biometric device list and punch log", alt: "The biometric punch log in the Fitvario app", usedOn: ["/features/biometric-attendance"] },
  { n: 11, id: "multi-branch", device: "phone", title: "Multi-branch overview comparing branches", alt: "The multi-branch overview in the Fitvario app comparing three branches", usedOn: ["/features/multi-branch-gym-software"] },
  { n: 12, id: "dashboard-home", device: "desktop", title: "Owner web dashboard home (dash.fitvario.com), only if the dashboard is shown", alt: "The owner web dashboard home screen", usedOn: ["/", "/features"] },
];

export interface ScreenFile {
  src: string;
  width: number;
  height: number;
  avif?: string;
}

const manifest = manifestJson as Record<string, ScreenFile>;

export function screenFile(id: string): ScreenFile | null {
  return manifest[id] ?? null;
}

export function screenDef(id: string): ScreenDef | undefined {
  return screens.find((s) => s.id === id);
}
