import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = buildMetadata("/cookies");

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold text-slate-900 first:mt-8">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{children}</p>;
}

export default function CookiesPage() {
  return (
    <PageShell wide>
      <Breadcrumbs path="/cookies" />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">Cookie &amp; Tracking Policy — Fitvario</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: 10 October 2026</p>
      <P>
        This Cookie Policy explains how Fitvario (&quot;we&quot;) uses cookies, pixels, local storage, session
        storage, and mobile SDK identifiers (collectively &quot;tracking technologies&quot;) when you visit our
        marketing website (<strong className="text-slate-800">fitvario.com</strong>) or use our web-based product
        and Android mobile application.
      </P>

      <H2>1. What are cookies?</H2>
      <P>
        Cookies are small text files placed on your device by a web server. They help us recognize your device,
        keep you signed in, remember preferences, measure site performance, and protect against fraud. Similar
        technologies (pixels, local storage, advertising SDKs) work in analogous ways on web and mobile.
      </P>

      <H2>2. Categories of cookies &amp; tracking technologies we use</H2>

      <div className="mt-5 space-y-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">2a. Strictly Necessary</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Required for security, load balancing, authentication, and core functionality. Cannot be disabled.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-slate-500">
            <li><code className="text-xs bg-slate-100 px-1 rounded">session</code> — Maintains your authenticated login session.</li>
            <li><code className="text-xs bg-slate-100 px-1 rounded">csrf-token</code> — Prevents cross-site request forgery attacks.</li>
            <li><code className="text-xs bg-slate-100 px-1 rounded">fitvario_cookie_consent</code> — Remembers your cookie consent choice (localStorage).</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">2b. Functional</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Remember choices to improve your experience. Disabling may affect non-critical functionality.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-slate-500">
            <li>Language and UI preference cookies.</li>
            <li>Recently viewed gym / section preferences.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">2c. Analytics</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Help us understand how visitors use the site so we can improve content and performance. Data is
            aggregated or pseudonymous.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-slate-500">
            <li>Page view and session analytics (aggregated, no personally identifiable information shared with analytics providers where possible).</li>
            <li>Error and performance monitoring to detect issues in the platform.</li>
            <li>Google Analytics 4 on this website, loaded only after you choose Accept all in the cookie banner. It records page views and clicks on contact and demo buttons. If you decline, it is not loaded.</li>
            <li>When you submit the demo form, we keep the campaign details (UTM tags) and the first page you visited this session with your request, so we know which campaign brought you.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">2d. Marketing &amp; Advertising (requires consent)</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Used to measure the effectiveness of advertising campaigns and to show relevant ads on third-party
            platforms. Only active when you accept marketing cookies.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-slate-500">
            <li>
              <strong className="text-slate-700">Meta Pixel (Facebook Pixel)</strong> — Placed by Meta Platforms, Inc.
              Tracks page views, button clicks, and conversion events on fitvario.com to measure Facebook/Instagram ad
              performance and enable remarketing. Meta may link events to your Facebook account if you&apos;re logged
              in. Governed by Meta&apos;s Data Policy and Business Tools Terms.
            </li>
            <li>
              <strong className="text-slate-700">Meta CAPI (Conversions API)</strong> — Server-side event sharing with
              Meta for improved ad measurement accuracy without cookies.
            </li>
            <li>
              <strong className="text-slate-700">Google Ads / conversion tags</strong> — If enabled, tracks conversions
              from Google ad campaigns.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">2e. Mobile app (Android)</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            The Fitvario Android member app uses the following SDKs that may collect identifiers:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-slate-500">
            <li>
              <strong className="text-slate-700">Firebase Cloud Messaging (FCM)</strong> — For push notifications.
              Collects a device registration token shared with Google&apos;s Firebase infrastructure.
            </li>
            <li>
              <strong className="text-slate-700">Firebase Analytics (if enabled)</strong> — App usage events for
              performance measurement.
            </li>
            <li>
              <strong className="text-slate-700">Razorpay Android SDK</strong> — For in-app payment flows. Razorpay
              may collect device identifiers for fraud prevention per their Privacy Policy.
            </li>
          </ul>
        </div>
      </div>

      <H2>3. Razorpay cookies</H2>
      <P>
        When you make a payment on our platform, Razorpay&apos;s checkout widget may set cookies or use local
        storage for fraud detection, session continuity, and payment flow management. These are third-party strictly
        necessary cookies for the payment transaction and are governed by Razorpay&apos;s Privacy Policy.
      </P>

      <H2>4. Your choices &amp; opt-out</H2>
      <P>
        When you first visit our website, you will see a cookie consent banner where you can accept or decline
        non-essential cookies. You can also:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>
          <strong className="text-slate-800">Browser settings:</strong> Block or delete cookies in your browser
          privacy settings. Note that blocking strictly necessary cookies may prevent login and core functionality.
        </li>
        <li>
          <strong className="text-slate-800">Meta (Facebook) opt-out:</strong> Visit{" "}
          <span className="font-medium text-slate-700">facebook.com/ads/preferences</span> or use the
          &quot;About the Ads&quot; feature on Facebook/Instagram to manage ad preferences.
        </li>
        <li>
          <strong className="text-slate-800">Google opt-out:</strong> Install the Google Analytics Opt-out Browser
          Add-on or adjust ad settings at myaccount.google.com/data-and-privacy.
        </li>
        <li>
          <strong className="text-slate-800">Android mobile app:</strong> Manage app permissions and advertising ID
          in Android Settings &gt; Privacy. You can reset or opt out of ad personalization via your Google account.
        </li>
      </ul>

      <H2>5. Third-party cookies &amp; links</H2>
      <P>
        Some cookies on our site are set by third parties (Meta, Google) when we include their scripts. Those
        parties operate under their own privacy and cookie policies, which we encourage you to read:
      </P>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>Meta / Facebook: <span className="font-medium text-slate-700">facebook.com/privacy/policy</span></li>
        <li>Google / Firebase: <span className="font-medium text-slate-700">policies.google.com/privacy</span></li>
        <li>Razorpay: <span className="font-medium text-slate-700">razorpay.com/privacy</span></li>
      </ul>

      <H2>6. Do Not Track (DNT)</H2>
      <P>
        Our website does not currently respond to browser Do Not Track signals. If a universal standard becomes
        widely adopted, we will update our practices accordingly.
      </P>

      <H2>7. Updates to this policy</H2>
      <P>
        We may update this Cookie Policy when our tracking practices change. Check the &quot;Last updated&quot; date
        above. Material changes will be reflected in the cookie consent banner on first visit.
      </P>

      <H2>8. Contact</H2>
      <P>
        Cookie-related questions:{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>
      </P>
      <p className="mt-10 flex flex-wrap gap-4">
        <Link href="/privacy" className="text-sm font-semibold text-teal-700 hover:underline">
          ← Privacy Policy
        </Link>
        <Link href="/grievance" className="text-sm font-semibold text-teal-700 hover:underline">
          Grievance Officer →
        </Link>
      </p>
    </PageShell>
  );
}
