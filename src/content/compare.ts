import type { FeatureKey } from "@/lib/features";

// Every statement about a competitor here comes from docs/seo/competitor-facts.csv (source URL and date there).
// If a fact is not in that file, it does not belong on a comparison page.

export const VERIFIED_ON = "2026-10-11";
export const VERIFIED_LABEL = "11 October 2026";

export interface CompareRow {
  feature: string;
  /** What the competitor's own page says, or "Not stated" */
  theirs: string;
  /** Fitvario's cell comes from feature-status.json via this key; it can never claim more than is live */
  fitvarioKey?: FeatureKey;
  /** A fixed Fitvario cell for rows that are not product flags */
  fitvario?: string;
}

export interface Competitor {
  path: string;
  name: string;
  shortName: string;
  /** Link to the vendor's own site or, where no official site is confirmed, the listing used */
  sources: { label: string; url: string }[];
  lead: string;
  whoFor: { them: string; fitvario: string };
  rows: CompareRow[];
  pricing: string[];
  better: string[];
  fitvarioFits: string[];
  checklist: string[];
  notes?: string[];
}

export const competitors: Competitor[] = [
  {
    path: "/compare/easy-gym-software-alternative",
    name: "Easy Gym Software",
    shortName: "Easy Gym",
    sources: [
      { label: "Easy Gym Software, gym management software page", url: "https://easygymsoftware.com/gym-management-software" },
      { label: "Easy Gym Software, India page", url: "https://easygymsoftware.com/india" },
    ],
    lead: "Easy Gym Software and Fitvario both build gym management software for Indian gyms. This page sets out what Easy Gym says on its own site and what Fitvario says on this one, as of 11 October 2026, so you can compare like with like. Easy Gym states more features publicly today. Fitvario states fewer, and says which ones it does not claim yet.",
    whoFor: {
      them: "Easy Gym describes a cloud platform in India for gyms, studios and multi-branch businesses, with GST billing, WhatsApp automation, biometric attendance, class booking and lead management.",
      fitvario: "Fitvario is built for Indian gym owners and front-desk teams who want memberships, QR attendance, a follow-up list for enquiries and revenue reports in one place, from the Fitvario Android app.",
    },
    rows: [
      { feature: "GST invoicing", theirs: "Listed: GST invoicing with UPI and card payments", fitvarioKey: "gst_tax_lines" },
      { feature: "Biometric attendance", theirs: "Listed: fingerprint, face, RFID and QR; works with ZKTeco and eSSL devices", fitvarioKey: "biometric_adms" },
      { feature: "QR attendance", theirs: "Listed (QR check-in)", fitvarioKey: "qr_attendance" },
      { feature: "Enquiry and lead follow-up", theirs: "Listed: leads from ads, website, WhatsApp and walk-ins", fitvarioKey: "crm_enquiries_followups" },
      { feature: "WhatsApp, SMS and push alerts", theirs: "Listed: WhatsApp automation with an initial credit allowance", fitvarioKey: "whatsapp_sms_push_alerts" },
      { feature: "Online class booking", theirs: "Listed, with waitlists", fitvarioKey: "class_scheduling_booking" },
      { feature: "Several branches in one account", theirs: "Listed", fitvarioKey: "multi_branch_franchise" },
      { feature: "Published starting price", theirs: "Yes: plans start at ₹799 (period not stated)", fitvario: "No published price list yet; priced by quote in rupees, GST extra" },
      { feature: "Free trial", theirs: "Not stated (a free demo is offered)", fitvario: "Not stated on this site (a demo is offered)" },
      { feature: "Free data migration", theirs: "Stated for new signups", fitvario: "Not stated as a product feature" },
    ],
    pricing: [
      "Easy Gym states that plans start at ₹799. The page does not say whether that is per month or per year, and a separate page says price depends on gym size, number of branches and features.",
      "Fitvario does not publish a price list yet. It quotes by branches, active members, messaging volume and modules, in rupees, with GST on top. See how Fitvario pricing works on the pricing page.",
    ],
    better: [
      "You want a starting price on the website before you talk to anyone.",
      "You need GST invoicing, biometric attendance with ZKTeco or eSSL devices, or online class booking now, because Easy Gym lists them and Fitvario's site does not claim them yet.",
      "You want WhatsApp automation with a credit allowance stated up front.",
    ],
    fitvarioFits: [
      "You want enquiries, follow-up dates and a daily list of people to call in one place, run by a small front-desk team.",
      "You run several branches and want revenue and attendance side by side.",
      "You prefer to see your own gym in a demo before deciding, and are fine with a quote instead of a list price.",
    ],
    checklist: [
      "Does it do the ten jobs your desk does every day, in your trial?",
      "Is GST invoicing available now, or only planned?",
      "What is the total for a year, including messaging?",
      "Can you export all your data?",
      "Who answers when something breaks, and in which language?",
    ],
  },
  {
    path: "/compare/okfit-alternative",
    name: "Okfit",
    shortName: "Okfit",
    sources: [{ label: "Okfit home page and pricing section", url: "https://okfit.in" }],
    lead: "Okfit publishes its plans and a free trial on its home page, which makes it easy to compare. This page lists what Okfit says on its own site and what Fitvario says on this one, as of 11 October 2026. Okfit is further ahead on published pricing and listed features. Fitvario fits a different kind of buyer, described below.",
    whoFor: {
      them: "Okfit describes cloud software for gyms and studios in India and other countries, with plans billed in rupees for Indian gyms, a member app and a manager app by plan.",
      fitvario: "Fitvario is built for Indian gym owners who want memberships, QR attendance, enquiry follow-up and revenue reports from the Fitvario Android app, with pricing set from a conversation about the gym.",
    },
    rows: [
      { feature: "GST invoicing", theirs: "Listed from the entry plan", fitvarioKey: "gst_tax_lines" },
      { feature: "Biometric check-in", theirs: "Fingerprint, RFID and face recognition are named in its feature list; a \"Biometric Integration\" line appears only on its US-dollar Professional and Business plans, not on the rupee plans", fitvarioKey: "biometric_adms" },
      { feature: "QR attendance", theirs: "Not stated on the page read", fitvarioKey: "qr_attendance" },
      { feature: "Enquiry and lead follow-up", theirs: "Not stated on the page read", fitvarioKey: "crm_enquiries_followups" },
      { feature: "WhatsApp, SMS and push alerts", theirs: "SMS and WhatsApp listed from the Basic plan", fitvarioKey: "whatsapp_sms_push_alerts" },
      { feature: "Member mobile app", theirs: "Listed from the Basic plan, with a manager app on higher plans", fitvarioKey: "branded_android_member_app" },
      { feature: "Workout and diet plans", theirs: "Claims AI-generated workout and diet plans", fitvarioKey: "workout_diet_plans" },
      { feature: "Published prices", theirs: "Yes: ₹500, ₹1,000, ₹2,000 and ₹3,000 a month, plus tax", fitvario: "No published price list yet; priced by quote in rupees, GST extra" },
      { feature: "Free trial", theirs: "7 days, no credit card", fitvario: "Not stated on this site (a demo is offered)" },
    ],
    pricing: [
      "Okfit lists four plans for Indian gyms at ₹500, ₹1,000, ₹2,000 and ₹3,000 a month, exclusive of tax, with a 20% saving on yearly plans. It offers a 7-day trial without a credit card and says you can cancel anytime.",
      "Fitvario does not publish prices yet and quotes by branches, active members, messaging volume and modules. See how Fitvario pricing works on the pricing page.",
    ],
    better: [
      "You want to read prices, start a free trial and decide without talking to sales.",
      "You need GST invoicing on a rupee plan or a published rupee price list, which Okfit shows. Check which plan includes biometric integration, because the page lists it only on its US-dollar plans.",
      "You want a member app and a manager app by plan, at a published price.",
    ],
    fitvarioFits: [
      "You want an enquiry follow-up list and a daily call list as part of the product.",
      "You run several branches under one account.",
      "You would like help setting the product up around your gym instead of choosing a plan yourself.",
    ],
    checklist: [
      "What is your total for a year, with messaging and tax?",
      "Which plan includes the app and the check-in method you need?",
      "Is the trial long enough for one renewal cycle?",
      "Can you export your data and cancel without a penalty?",
      "Is support available in your language and hours?",
    ],
  },
  {
    path: "/compare/gymsmart-alternative",
    name: "GymSmart",
    shortName: "GymSmart",
    sources: [{ label: "Techjockey listing for GymSmart (third-party)", url: "https://www.techjockey.com/detail/gymsmart" }],
    lead: "We could not confirm an official GymSmart website, and the listings we found do not agree on who makes it. Because a fair comparison needs the vendor's own statements, this page does not compare features line by line. It records what one third-party listing says and how to check GymSmart yourself. We will add a full comparison when we can source it.",
    whoFor: {
      them: "A third-party listing describes GymSmart as a fitness business operating system developed and operated by a company in Surat, Gujarat. We could not verify that from a GymSmart site.",
      fitvario: "Fitvario is built for Indian gym owners who want memberships, QR attendance, enquiry follow-up and revenue reports from the Fitvario Android app.",
    },
    rows: [
      { feature: "GST invoicing", theirs: "Listed on a third-party page", fitvarioKey: "gst_tax_lines" },
      { feature: "Fee due management", theirs: "Listed on a third-party page", fitvarioKey: "dues_partial_payments" },
      { feature: "Lead management", theirs: "Listed on a third-party page", fitvarioKey: "crm_enquiries_followups" },
      { feature: "Multi-branch management", theirs: "Listed on a third-party page", fitvarioKey: "multi_branch_franchise" },
      { feature: "Workout and diet planning", theirs: "Listed on a third-party page", fitvarioKey: "workout_diet_plans" },
      { feature: "Published starting price", theirs: "A third-party listing shows ₹9,999 excluding GST (not confirmed by the vendor)", fitvario: "No published price list yet; priced by quote in rupees, GST extra" },
    ],
    pricing: [
      "One third-party listing shows a starting price of ₹9,999 excluding GST. We have not seen GymSmart's own pricing page, so treat this as unconfirmed.",
      "Fitvario does not publish prices yet. See how Fitvario pricing works on the pricing page.",
    ],
    better: [
      "If the vendor's own materials confirm the features listed on the third-party page, GymSmart may suit a gym that wants GST billing and fee due management as listed. Check with the vendor.",
    ],
    fitvarioFits: [
      "You want to see a demo of your own gym's workflow and an enquiry follow-up list in one product.",
      "You run several branches and want them side by side.",
    ],
    checklist: [
      "Find GymSmart's own website and confirm the company behind it.",
      "Ask for the features and the price in writing, with what is excluded.",
      "Ask for a trial with your real members.",
      "Check data export and cancellation terms.",
    ],
    notes: [
      "Search results show one listing naming Bizz1 Technologies and another naming Ajasys Technologies as the maker. The Capterra India and GoodFirms pages returned an access error (HTTP 403) when we tried to open them, so we relied on neither.",
    ],
  },
  {
    path: "/compare/mindbody-alternative-india",
    name: "Mindbody",
    shortName: "Mindbody",
    sources: [{ label: "Mindbody pricing blog, United States", url: "https://www.mindbodyonline.com/business/education/blog/mindbody-pricing-united-states" }],
    lead: "Mindbody is a global platform for fitness and wellness businesses, and it states its prices in US dollars. For an Indian gym, three questions matter first: is it available and supported in India, does it price in rupees, and does it handle GST invoices. We did not find answers to those on Mindbody's own pages, so ask them directly. This page sets out what Mindbody does state, as of 11 October 2026.",
    whoFor: {
      them: "Mindbody describes software for fitness and wellness businesses, with plans per location and optional add-ons such as a branded app.",
      fitvario: "Fitvario is built for Indian gym owners, with rupee pricing, GST extra, from a company based in Bhopal.",
    },
    rows: [
      { feature: "Starting price", theirs: "US$79 a month per location (US page, updated 8 Oct 2026)", fitvario: "No published price list yet; priced by quote in rupees, GST extra" },
      { feature: "Plans", theirs: "Starter, Accelerate and Ultimate; the higher two are priced on contact", fitvario: "Quote by branches, members, messaging and modules" },
      { feature: "Unlimited staff users", theirs: "Stated: included at every tier", fitvario: "Not stated" },
      { feature: "Branded app", theirs: "Available as an add-on for an extra monthly fee", fitvario: "Your gym's name and logo on the app's splash screen and on the owner and member home screens; not a separate app, and the app name, icon and colours stay Fitvario's" },
      { feature: "India availability and rupee pricing", theirs: "Not found on Mindbody's own pages in this check", fitvario: "Built for India; quoted in rupees, GST extra" },
      { feature: "Contract terms and free trial", theirs: "Not stated on the page read", fitvario: "Not stated on this site (a demo is offered)" },
    ],
    pricing: [
      "Mindbody's pricing page for the United States states that plans start at US$79 a month per location and that the higher plans are priced on contact. The page also mentions North America and Asia without naming India. Add-ons such as a branded app and payment processing cost extra. We did not find a rupee price.",
      "Fitvario does not publish prices yet and quotes in rupees, with GST on top. See how Fitvario pricing works on the pricing page.",
    ],
    better: [
      "You run a studio with classes, appointments or several locations and want a large global platform.",
      "You want unlimited staff users at every tier, which Mindbody states.",
      "You have confirmed India support and GST handling with Mindbody and they meet your needs.",
    ],
    fitvarioFits: [
      "You want pricing in rupees and a team in India you can reach in your own time zone.",
      "You want a focus on the daily work of an Indian gym: renewals, enquiry follow-up and WhatsApp-first communication.",
    ],
    checklist: [
      "Is the product supported for an Indian business, and in which currency do you pay?",
      "How are GST invoices produced?",
      "What are processing fees and add-on costs on top of the plan?",
      "Where is support, and what are its hours?",
      "Can you export your data and leave?",
    ],
  },
  {
    path: "/compare/gymmaster-alternative-india",
    name: "GymMaster",
    shortName: "GymMaster",
    sources: [{ label: "GymMaster pricing page", url: "https://www.gymmaster.com/pricing" }],
    lead: "GymMaster publishes its plans clearly, by member count, in US, Australian and New Zealand dollars. It also states no lock-in contract and a 60-day money-back guarantee. This page lists what GymMaster says on its pricing page and what Fitvario says here, as of 11 October 2026. GymMaster does not mention India on that page, so confirm availability and GST handling before you rely on it.",
    whoFor: {
      them: "GymMaster describes gym software with plans sized by current members and optional 24/7 door access control, aimed at the markets it prices for.",
      fitvario: "Fitvario is built for Indian gym owners, with rupee quotes, GST extra and a focus on renewals, QR attendance and enquiry follow-up.",
    },
    rows: [
      { feature: "Plans by member count", theirs: "Up to 100, 400 and 1,300 current members, plus Enterprise", fitvario: "Quote by branches, members, messaging and modules" },
      { feature: "Door access control", theirs: "Available at about US$40 a month more per plan", fitvario: "Blocks an expired member on a compatible biometric device. It does not control a door lock itself" },
      { feature: "Branded member app", theirs: "US$150 a month plus a US$450 setup fee", fitvario: "Your gym's name and logo on the app's splash screen and on the owner and member home screens; not a separate app, and the app name, icon and colours stay Fitvario's" },
      { feature: "Lock-in and refund", theirs: "No lock-in contract; 60-day money-back guarantee", fitvario: "Not stated on this site; see the refund policy" },
      { feature: "Free trial", theirs: "Not stated (a free demo is offered)", fitvario: "Not stated on this site (a demo is offered)" },
      { feature: "India and rupee pricing", theirs: "Not stated on the pricing page", fitvario: "Built for India; quoted in rupees, GST extra" },
      { feature: "GST invoicing", theirs: "Not stated on the pricing page", fitvarioKey: "gst_tax_lines" },
    ],
    pricing: [
      "GymMaster lists software plans per site per month, excluding tax: US$89 for up to 100 current members, US$129 for up to 400 and US$209 for up to 1,300, with Enterprise by quote. Paying yearly gives a 10% discount. Prices are shown in US, Australian and New Zealand dollars. Add-ons such as a branded app and SMS are priced separately.",
      "Fitvario does not publish prices yet and quotes in rupees, with GST on top. See how Fitvario pricing works on the pricing page.",
    ],
    better: [
      "You value a stated no-lock-in policy and a 60-day money-back guarantee.",
      "You want door access control from the same vendor.",
      "You have confirmed with GymMaster that it supports an Indian gym and GST invoicing.",
    ],
    fitvarioFits: [
      "You want rupee pricing and a team in India.",
      "You want the follow-up list for enquiries and renewals built into the daily routine.",
    ],
    checklist: [
      "Is the vendor available and supported for an Indian gym?",
      "Which currency are you billed in, and what does GST add?",
      "What are the add-on and SMS charges for your size?",
      "What are the cancellation and refund terms in writing?",
      "Can you export your data and leave?",
    ],
  },
];

export function getCompetitor(path: string): Competitor {
  const c = competitors.find((x) => x.path === path);
  if (!c) throw new Error(`No comparison data for ${path}`);
  return c;
}
