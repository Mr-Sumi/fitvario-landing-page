import { isLive, type FeatureKey } from "@/lib/features";

export type PageKind =
  | "core"
  | "legal"
  | "support"
  | "utility"
  | "feature"
  | "segment"
  | "tool"
  | "template"
  | "blog"
  | "hinglish"
  | "compare";

export interface PageDef {
  path: string;
  kind: PageKind;
  /** Full <title>, brand included, 50-60 characters */
  title: string;
  /** 120-155 characters */
  description: string;
  /** Real last-edit date, YYYY-MM-DD. Drives the sitemap lastmod and the on-page date */
  updated: string;
  navLabel?: string;
  /** Page stays unpublished until this feature is live in docs/seo/feature-status.json */
  gate?: FeatureKey;
  /** Hand-set draft flag for pages with a non-feature gate (content review etc.) */
  draft?: boolean;
  /** Never indexable (thank-you etc.) */
  noindex?: boolean;
}

export const pages: PageDef[] = [
  {
    path: "/",
    kind: "core",
    title: "Gym Management Software India: Billing, CRM | Fitvario",
    description:
      "Run memberships, QR attendance, fee reminders, CRM and revenue from one place. Gym management software built for Indian gyms. Book a free demo.",
    updated: "2026-10-10",
  },
  {
    path: "/features",
    kind: "core",
    title: "Gym Management Software Features for Indian Gyms | Fitvario",
    description:
      "See what Fitvario does for gym owners, staff and members: memberships, QR attendance, CRM, workout and diet plans, WhatsApp reminders and analytics.",
    updated: "2026-10-10",
    navLabel: "Features",
  },
  {
    path: "/pricing",
    kind: "core",
    title: "Gym Software Price in India: Custom Quote | Fitvario",
    description:
      "Fitvario pricing depends on your branches, active members and messaging volume. See what is included in every plan and request a quote for your gym.",
    updated: "2026-10-10",
    navLabel: "Pricing",
  },
  {
    path: "/about",
    kind: "core",
    title: "About Fitvario | Gym Management Software, Bhopal, India",
    description:
      "Fitvario is gym management software from Bhopal for Indian gym owners, staff and members. Learn what we build, who it is for and how to reach us.",
    updated: "2026-10-10",
    navLabel: "About",
  },
  {
    path: "/contact",
    kind: "core",
    title: "Contact Fitvario | Request a Free Gym Software Demo",
    description:
      "Request a free Fitvario demo or ask a question. Share your gym name, city and member count and we will walk you through the platform. No obligation.",
    updated: "2026-10-10",
    navLabel: "Contact",
  },
  {
    path: "/support",
    kind: "support",
    title: "Fitvario Support | Help for Gym Owners and Members",
    description:
      "Get help with Fitvario setup, QR attendance, memberships, billing and staff access. Email support@fitvario.com and tell us what you need.",
    updated: "2026-10-10",
  },
  {
    path: "/grievance",
    kind: "support",
    title: "Grievance Officer | Complaints and Data Requests, Fitvario",
    description:
      "Contact the Fitvario Grievance Officer for data, content or platform complaints under India's IT Act 2000 and the DPDP Act 2023.",
    updated: "2026-04-26",
  },
  {
    path: "/delete-account",
    kind: "support",
    title: "Delete Your Fitvario Account | Steps and Data Handling",
    description:
      "How to request deletion of your Fitvario account and what happens to your data. Gym owners and members can submit a request by email.",
    updated: "2026-04-26",
  },
  {
    path: "/privacy",
    kind: "legal",
    title: "Privacy Policy | How Fitvario Collects and Uses Data",
    description:
      "Fitvario's privacy policy explains what personal data we collect from gym owners, staff and members, why we use it and the choices you have.",
    updated: "2026-04-26",
  },
  {
    path: "/terms",
    kind: "legal",
    title: "Terms of Service | Fitvario Gym Management Platform",
    description:
      "The terms that apply when you use Fitvario's gym management website, web panels and member app, including accounts, payments and acceptable use.",
    updated: "2026-04-26",
  },
  {
    path: "/refund",
    kind: "legal",
    title: "Refund Policy | Fitvario Subscription Fees and Payments",
    description:
      "How refunds, cancellations and payment disputes work for Fitvario subscriptions and messaging credits, including timelines and how to ask for help.",
    updated: "2026-04-26",
  },
  {
    path: "/cookies",
    kind: "legal",
    title: "Cookie Policy | Cookies Used on the Fitvario Website",
    description:
      "Which cookies and similar technologies the Fitvario website uses, what each is for, and how you can accept, decline or change your choice.",
    updated: "2026-10-10",
  },
  {
    path: "/thank-you",
    kind: "utility",
    title: "Thank You | We Received Your Fitvario Demo Request",
    description:
      "Thanks for contacting Fitvario. We have received your request and will get back to you soon about your demo.",
    updated: "2026-10-10",
    noindex: true,
  },

  // Feature pages (pilot set). Gated pages publish when their feature goes live.
  {
    path: "/features/whatsapp-reminders",
    kind: "feature",
    title: "WhatsApp Reminders for Gym Membership Renewals | Fitvario",
    description:
      "Fitvario sends automated WhatsApp reminders before a gym membership ends and after it expires. See the schedule, the credits used and what you control.",
    updated: "2026-10-10",
    navLabel: "WhatsApp reminders",
  },
  {
    path: "/features/gym-crm",
    kind: "feature",
    title: "Gym CRM Software India: Enquiries and Follow-ups | Fitvario",
    description:
      "Log every gym enquiry, set follow-up dates and open today's calls in one list. Fitvario's gym CRM keeps walk-in leads from going cold.",
    updated: "2026-10-10",
    navLabel: "Gym CRM",
  },
  {
    path: "/features/gst-billing",
    kind: "feature",
    title: "Gym Software with GST Billing and Dues Tracking | Fitvario",
    description:
      "Create gym invoices with tax lines, take part payments and see pending dues by member. Fitvario billing keeps fee collection organised.",
    updated: "2026-10-10",
    navLabel: "Billing and dues",
    gate: "gst_tax_lines",
  },
];

// A page is public only when it is not a draft, not noindex and its feature gate is live
export function isDraft(p: PageDef): boolean {
  if (p.draft) return true;
  if (p.gate && !isLive(p.gate)) return true;
  return false;
}

export function isIndexable(p: PageDef): boolean {
  return !p.noindex && !isDraft(p);
}

export function getPage(path: string): PageDef {
  const p = pages.find((x) => x.path === path);
  if (!p) throw new Error(`Page not in registry: ${path}`);
  return p;
}

export function publishedPages(kind?: PageKind): PageDef[] {
  return pages.filter((p) => isIndexable(p) && (!kind || p.kind === kind));
}
