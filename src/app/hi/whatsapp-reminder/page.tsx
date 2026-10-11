import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";

const PATH = "/hi/whatsapp-reminder";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "kyun", label: "Reminder kyun zaroori hai" },
  { id: "routine", label: "Roz ka simple routine" },
  { id: "flow", label: "Message ka flow" },
  { id: "galti", label: "Kya na karein" },
  { id: "software", label: "Software kahan kaam aata hai" },
  { id: "faq", label: "Aam sawal" },
];

const faqs = [
  {
    q: "Kitni baar reminder bhejna theek hai?",
    a: "Due date par ek message aur 2 din baad ek call. Usse zyada bhejne se member ko bura lagta hai. Jo jawab nahi deta, usse agle din phone karein.",
  },
  {
    q: "Group mein reminder bhejein ya personal?",
    a: "Hamesha personal. Group mein kisi ki fees ka zikr karna sharmindagi ka kaaran bankar member ko gym se door kar sakta hai.",
  },
  {
    q: "Kis time par bhejein?",
    a: "Subah 10 se 12 ke beech ya shaam 5 se 7 ke beech. Raat ko late ya bahut subah message na bhejein.",
  },
  {
    q: "Kya message apne aap chala jata hai?",
    a: "Is page par jo tareeka hai, usme aap khud message bhejte hain. Fitvario mein WhatsApp, SMS aur push alerts ka system hai, par kaun se alerts aapke gym ke liye chalu hain, ye demo mein poochhiye.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      lang="hi-Latn"
      h1="Gym ka fees reminder WhatsApp par: kab aur kaise bhejein"
      lead="Gym ka fees reminder WhatsApp par due date ke din bhejein, member ke naam aur amount ke saath, aur payment ka tareeka bhi likhein. Agar do din mein jawab na aaye to ek chhota sa call karein. Ye guide ek simple roz ka routine aur ready message flow deti hai, jise aap bina kisi software ke bhi chala sakte hain."
      toc={toc}
      related={["/hi", "/hi/gym-fee-reminder-message", "/hi/gym-billing-software", "/features/gym-crm"]}
    >
      <Section id="kyun" title="Reminder kyun zaroori hai">
        <p>
          Zyada tar log fees dene se mana nahi karte. Wo bhool jaate hain, ya unhe pata hi nahi hota ki date aa gayi.
          Ek chhota, politely likha hua message wahi kaam kar deta hai jo baad mein ek mushkil conversation karti hai.
        </p>
        <p>
          Aur jab aap pehle din message bhejte hain, to member ko lagta hai ki gym dhyan rakhta hai, notice nahi bhej
          raha.
        </p>
      </Section>

      <Section id="routine" title="Roz ka simple routine">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Subah ek list banayein: aaj kiski fees ya renewal due hai.</li>
          <li>Har naam ke saath ek personal message bhejein. Naam aur amount zaroor likhein.</li>
          <li>Jawab aaye to likh lein: &quot;kal dunga&quot;, &quot;paid&quot;, ya &quot;baad mein&quot;.</li>
          <li>Shaam ko jinhone jawab nahi diya, unki list alag kar lein.</li>
          <li>Agle din un logon ko ek chhota call karein.</li>
        </ol>
      </Section>

      <MidCta text="Reminders aur follow-up ek jagah dekhna hai?" location="hi-wa-mid" />

      <Section id="flow" title="Message ka flow">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Din 0 (due date):</strong> pehla message, payment ke tareeke ke saath.
          </li>
          <li>
            <strong>Din 2:</strong> agar jawab nahi aaya, ek chhota follow-up ya call.
          </li>
          <li>
            <strong>Din 5:</strong> baat karke koi nayi date tay karein.
          </li>
          <li>
            <strong>Payment aane par:</strong> dhanyavaad ka message bhejein.
          </li>
        </ul>
        <p>
          Har stage ke liye ready shabd{" "}
          <PageLink href="/hi/gym-fee-reminder-message">fee reminder messages</PageLink> par hain. Aap unhe copy karke
          apne naam aur amount ke saath bhej sakte hain.
        </p>
        <VideoPlaceholder title="WhatsApp par fees reminder ka demo" />
      </Section>

      <Section id="galti" title="Kya na karein">
        <ul className="list-disc space-y-2 pl-5">
          <li>Group mein kisi ki fees ka zikr na karein.</li>
          <li>Dhamki ya penalty ki baat reminder mein na likhein.</li>
          <li>Ek hi message sabko na bhejein. Naam aur amount badlein.</li>
          <li>Raat ko late ya subah bahut jaldi message na bhejein.</li>
          <li>Jawab na aane par roz message na bhejein. Ek call kaafi hai.</li>
        </ul>
      </Section>

      <Section id="software" title="Software kahan kaam aata hai">
        <p>
          Roz ki list banana aur har naam ke saath note likhna wahi kaam hai jo software saaf-saaf dikhata hai.
          Fitvario mein members ki end dates aur enquiry ki follow-up list ek jagah rehti hai, aur WhatsApp, SMS aur
          push alerts ka system bhi hai. Kaun se alerts aapke gym par chalu hain, ye demo mein dekh lein. Enquiry ke
          follow-up ke liye{" "}
          <PageLink href="/features/gym-crm">gym CRM</PageLink> ka page dekhein.
        </p>
      </Section>

      <Section id="faq" title="Aam sawal">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Aur Hinglish guides{" "}
        <Link href="/hi" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          is hub
        </Link>{" "}
        par hain. Demo ke liye{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          contact
        </Link>{" "}
        karein.
      </p>
    </ContentLayout>
  );
}
