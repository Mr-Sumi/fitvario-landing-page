import { isLive, type FeatureKey } from "@/lib/features";
import { blogPages } from "./blog-pages.generated";

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

const staticPages: PageDef[] = [
  {
    path: "/",
    kind: "core",
    title: "Gym Management Software India: Billing, CRM | Fitvario",
    description:
      "Run memberships, QR attendance, CRM and revenue from one place. Gym management software built for Indian gyms. Book a free demo with Fitvario.",
    updated: "2026-10-10",
  },
  {
    path: "/features",
    kind: "core",
    title: "Gym Management Software Features for Indian Gyms | Fitvario",
    description:
      "See what Fitvario does for gym owners, staff and members: memberships, QR attendance, CRM, billing, revenue analytics and a member app for Android.",
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
    title: "Contact Fitvario | Request a Free Demo for Your Gym",
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
      "The terms that apply when you use Fitvario's gym management website and Android apps, including accounts, payments and acceptable use.",
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
    gate: "whatsapp_expiry_reminders",
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
  {
    path: "/features/member-app",
    kind: "feature",
    title: "Gym Member App for Android: Plan, QR, Progress | Fitvario",
    description:
      "Members see their plan, check in with a QR scan, track progress and get gym alerts in one Android app. See what the Fitvario member app does.",
    updated: "2026-10-11",
    navLabel: "Member app",
  },
  {
    path: "/features/qr-attendance",
    kind: "feature",
    title: "Gym Attendance App with QR Code Check-in | Fitvario",
    description:
      "One QR code per gym, scanned by members and staff in the Fitvario app. See single and dual scan modes, check-in and check-out and what gets recorded.",
    updated: "2026-10-11",
    navLabel: "QR attendance",
    gate: "qr_attendance",
  },
  {
    path: "/features/biometric-attendance",
    kind: "feature",
    title: "Biometric Attendance for Gym: ADMS Devices | Fitvario",
    description:
      "Connect a fingerprint or face device that pushes punches over ADMS. Map members to device users, block expired members and see punch logs in Fitvario.",
    updated: "2026-10-11",
    navLabel: "Biometric attendance",
    gate: "biometric_adms",
  },
  {
    path: "/features/white-label-gym-app",
    kind: "feature",
    title: "White Label Gym App India: Your Name and Logo | Fitvario",
    description:
      "Show your gym's name and logo on the Fitvario app's splash screen and on the owner and member home screens. See what is branded and what is not.",
    updated: "2026-10-11",
    navLabel: "Name and logo in the app",
    gate: "white_label",
  },
  {
    path: "/features/multi-branch-gym-software",
    kind: "feature",
    title: "Multi Branch Gym Software for Gym Chains | Fitvario",
    description:
      "Run several gym branches under one owner login, with separate members and enquiries per branch and revenue, members and attendance compared side by side.",
    updated: "2026-10-11",
    navLabel: "Multi-branch",
    gate: "multi_branch_franchise",
  },
  {
    path: "/features/diet-workout-plans",
    kind: "feature",
    title: "Gym Diet Plan and Workout Plan Software | Fitvario",
    description:
      "Build workout and diet plans day by day and assign them to members. Draft page, held back until workout and diet plans are live for gym owners.",
    updated: "2026-10-11",
    navLabel: "Diet and workout plans",
    gate: "workout_diet_plans",
  },
  {
    path: "/for/small-gyms",
    kind: "segment",
    title: "Gym Software for Small Gyms in India: Start Here | Fitvario",
    description:
      "What a 100 to 300 member gym needs from software, what to skip for now and a one-evening setup checklist. Written for owners, not for IT teams.",
    updated: "2026-10-11",
    navLabel: "Small gyms",
  },
  {
    path: "/for/franchise-gyms",
    kind: "segment",
    title: "Franchise Gym Management Software for India | Fitvario",
    description:
      "Manage a gym franchise or chain from one owner login: branch-level staff access, separate member lists and comparison reports across your locations.",
    updated: "2026-10-11",
    navLabel: "Franchise gyms",
  },
  {
    path: "/for/crossfit-yoga-studios",
    kind: "segment",
    title: "CrossFit and Yoga Studio Software India | Fitvario",
    description:
      "What Fitvario covers for CrossFit boxes and yoga studios, and what it does not: memberships, QR attendance and renewals, but no class booking.",
    updated: "2026-10-11",
    navLabel: "CrossFit and yoga studios",
    // Draft until class booking exists (owner decision, 2026-10-11)
    draft: true,
  },

  // Tools and templates (Prompt 3). Content-gated pages stay draft until reviewed.
  {
    path: "/tools/gym-break-even-calculator",
    kind: "tool",
    title: "Gym Break Even Calculator India | Members Needed | Fitvario",
    description:
      "Work out how many members your gym needs to cover rent, salaries and EMI. A free break even calculator for Indian gyms, with GST and fee sensitivity.",
    updated: "2026-10-11",
    navLabel: "Break-even calculator",
  },
  {
    path: "/tools/gym-membership-pricing-calculator",
    kind: "tool",
    title: "Gym Membership Pricing Calculator: Plans and Fees | Fitvario",
    description:
      "Set gym membership prices from your own costs. Cost-plus and target-margin methods, with a 1, 3, 6 and 12 month plan ladder and discounts you choose.",
    updated: "2026-10-11",
    navLabel: "Membership pricing calculator",
  },
  {
    path: "/tools/gym-churn-calculator",
    kind: "tool",
    title: "Gym Churn Rate Calculator: Retention and Lifetime | Fitvario",
    description:
      "Calculate your gym's monthly churn, retention and average member lifetime, and see what cutting churn by 10 to 30 percent is worth in fees.",
    updated: "2026-10-11",
    navLabel: "Churn calculator",
  },
  {
    path: "/tools/gym-revenue-calculator",
    kind: "tool",
    title: "Gym Revenue Calculator: 12-Month Projection | Fitvario",
    description:
      "Project your gym's income for 12 months from members, plan fees, personal training and other income, with a monthly growth rate you control.",
    updated: "2026-10-11",
    navLabel: "Revenue calculator",
  },
  {
    path: "/tools/gym-gst-calculator",
    kind: "tool",
    title: "Gym Membership GST Calculator | CGST, SGST, IGST | Fitvario",
    description:
      "Add GST to a gym membership fee or take it out. Splits CGST and SGST or IGST, rounds to the paisa and shows invoice lines you can copy.",
    updated: "2026-10-11",
    navLabel: "GST calculator",
    draft: true,
  },
  {
    path: "/tools/gym-startup-cost-calculator",
    kind: "tool",
    title: "Gym Business Cost in India: Setup Cost Calculator | Fitvario",
    description:
      "Budget what it costs to start a gym in India: equipment, interiors, deposits, licences, working capital and a contingency buffer in one total.",
    updated: "2026-10-11",
    navLabel: "Startup cost calculator",
    draft: true,
  },
  {
    path: "/tools/gym-invoice-generator",
    kind: "tool",
    title: "Gym Invoice Format GST: Free Invoice Generator | Fitvario",
    description:
      "Make a sample gym invoice or fee receipt with optional GST lines, then print it or save it as a PDF. Nothing you type leaves your browser.",
    updated: "2026-10-11",
    navLabel: "Invoice generator",
    draft: true,
  },
  {
    path: "/templates/diet-charts",
    kind: "template",
    title: "Indian Diet Chart for Gym Members | Templates | Fitvario",
    description:
      "Printable Indian diet chart templates for gym members: vegetarian, eggetarian and non-vegetarian, for fat loss, muscle gain and maintenance.",
    updated: "2026-10-11",
    navLabel: "Diet chart templates",
    draft: true,
  },

  // Hinglish section (Prompt 5). Phone-SERP validation is still pending, so expectations are lower.
  {
    path: "/hi",
    kind: "hinglish",
    title: "Gym Management Software Hindi: Gym Ke Liye | Fitvario",
    description:
      "Gym ke liye software kya karta hai? Members, fees, attendance aur enquiry ek jagah. Hinglish mein samjhaya hua Fitvario gym management software.",
    updated: "2026-10-11",
    navLabel: "Hinglish mein dekhein",
  },
  {
    path: "/hi/gym-billing-software",
    kind: "hinglish",
    title: "Gym Ka Billing Software: Fees aur Invoice | Fitvario",
    description:
      "Gym ka billing software kaise kaam karta hai: member ki fees, invoice aur renewal ek jagah. Register aur Excel se aage ka simple tareeka.",
    updated: "2026-10-11",
    navLabel: "Gym ka billing software",
  },
  {
    path: "/hi/whatsapp-reminder",
    kind: "hinglish",
    title: "Gym Ka Fees Reminder WhatsApp Par Kaise Bhejein | Fitvario",
    description:
      "Gym ka fees reminder WhatsApp par kab aur kaise bhejein: simple routine, ready messages aur galtiyan jo avoid karni chahiye. Hinglish mein.",
    updated: "2026-10-11",
    navLabel: "WhatsApp par fees reminder",
  },
  {
    path: "/hi/gym-fee-reminder-message",
    kind: "hinglish",
    title: "Gym Fee Reminder Message in Hindi: Copy Karein | Fitvario",
    description:
      "Gym fee reminder message in Hindi (Hinglish): 10 ready messages, copy button ke saath. Fees, due date aur renewal ke liye sahi shabd.",
    updated: "2026-10-11",
    navLabel: "Fee reminder messages",
  },
  {
    path: "/hi/gym-software-kaise-chune",
    kind: "hinglish",
    title: "Gym Software Kaise Chune: Owner Ke Liye Checklist | Fitvario",
    description:
      "Gym software kaise chune: kya check karein, vendor se kya poochein aur kaun se red flags dekhein. Koi bhi software lene se pehle ye checklist padhein.",
    updated: "2026-10-11",
    navLabel: "Gym software kaise chune",
  },
  {
    path: "/hi/blog/gym-me-member-kaise-badhaye",
    kind: "hinglish",
    title: "Gym Me Member Kaise Badhaye: 7 Aasan Tarike | Fitvario",
    description:
      "Gym me member kaise badhaye: Google Maps, Instagram, referral, trial aur enquiry follow-up. Chhote gym ke liye 7 practical tarike, Hinglish mein.",
    updated: "2026-10-11",
    navLabel: "Gym me member kaise badhaye",
  },

  // Comparison pages (Prompt 6): DRAFT only until Sumit clears accuracy and a legal read.
  {
    path: "/compare/easy-gym-software-alternative",
    kind: "compare",
    title: "Easy Gym Software Alternative: Fitvario Compared | Fitvario",
    description:
      "A fair, sourced comparison of Fitvario and Easy Gym Software for Indian gyms: what each states, pricing as published and who each suits. Dated.",
    updated: "2026-10-11",
    navLabel: "Easy Gym alternative",
    draft: true,
  },
  {
    path: "/compare/okfit-alternative",
    kind: "compare",
    title: "Okfit Alternative: A Fair Comparison for Gyms | Fitvario",
    description:
      "A fair, sourced comparison of Fitvario and Okfit for Indian gyms: published plans, trial, features each states and who each suits. Dated.",
    updated: "2026-10-11",
    navLabel: "Okfit alternative",
    draft: true,
  },
  {
    path: "/compare/gymsmart-alternative",
    kind: "compare",
    title: "GymSmart Alternative: A Fair Comparison for Gyms | Fitvario",
    description:
      "What we could and could not confirm about GymSmart, how to check it yourself and how Fitvario compares where facts are sourced. Dated.",
    updated: "2026-10-11",
    navLabel: "GymSmart alternative",
    draft: true,
  },
  {
    path: "/compare/mindbody-alternative-india",
    kind: "compare",
    title: "Mindbody Alternative India: A Fair Comparison | Fitvario",
    description:
      "A fair, sourced look at Mindbody for an Indian gym: what it states about price and plans, what we could not confirm, and how Fitvario compares. Dated.",
    updated: "2026-10-11",
    navLabel: "Mindbody alternative India",
    draft: true,
  },
  {
    path: "/compare/gymmaster-alternative-india",
    kind: "compare",
    title: "GymMaster Alternative India: A Fair Comparison | Fitvario",
    description:
      "A fair, sourced look at GymMaster for an Indian gym: plans by member count, terms it states, what is not stated for India, and how Fitvario compares.",
    updated: "2026-10-11",
    navLabel: "GymMaster alternative India",
    draft: true,
  },
];

// Blog posts and blog index/category pages are generated from src/content/blog (npm run gen:blog)
export const pages: PageDef[] = [...staticPages, ...blogPages];

// A page is public only when it is not a draft, not noindex and its feature gate is live
export function isDraft(p: PageDef): boolean {
  if (p.draft) return true;
  if (p.gate && !isLive(p.gate)) return true;
  return false;
}

export function isIndexable(p: PageDef): boolean {
  return !p.noindex && !isDraft(p);
}

// True when the page exists in the registry and is public (not draft, not noindex)
export function isPublishedPath(path: string): boolean {
  const p = pages.find((x) => x.path === path);
  return !!p && isIndexable(p);
}

export function getPage(path: string): PageDef {
  const p = pages.find((x) => x.path === path);
  if (!p) throw new Error(`Page not in registry: ${path}`);
  return p;
}

export function publishedPages(kind?: PageKind): PageDef[] {
  return pages.filter((p) => isIndexable(p) && (!kind || p.kind === kind));
}
