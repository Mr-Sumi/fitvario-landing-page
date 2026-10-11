import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { CopyBlock } from "@/components/CopyBlock";

const PATH = "/hi/gym-fee-reminder-message";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "messages", label: "10 ready messages" },
  { id: "kaise", label: "Kaise use karein" },
  { id: "tone", label: "Sahi tone" },
  { id: "faq", label: "Aam sawal" },
];

const messages: { label: string; text: string }[] = [
  {
    label: "1. Pehla reminder (due date par)",
    text: "Namaste {naam} ji, {gym ka naam} se bol rahe hain. Aapki ₹{amount} ki fees aaj due hai. Aap UPI se {UPI number} par ya desk par de sakte hain. Koi dikkat ho to bataiye. Dhanyavaad.",
  },
  {
    label: "2. Date se pehle yaad dilana",
    text: "Hi {naam} ji, aapka plan {date} ko khatam ho raha hai. Renew karna ho to desk par aa jaiye ya UPI se pay kar dijiye. Hum aapka slot waisa hi rakhenge.",
  },
  {
    label: "3. Do din baad dobara",
    text: "Namaste {naam} ji, ₹{amount} ki fees {date} ko due thi. Kya aaj ya kal tak pay ho sakti hai? Agar koi problem hai to batayein, hum madad karenge.",
  },
  {
    label: "4. Jab member bole 'baad mein dunga'",
    text: "Theek hai {naam} ji, maine note kar liya hai ki aap {date} tak fees de denge. Us din hum yaad dila denge. Dhanyavaad.",
  },
  {
    label: "5. Aadhi payment mili hai",
    text: "Thank you {naam} ji, ₹{mili hui amount} mil gaye. Baaki ₹{baaki amount} {date} tak dena hai. UPI number: {UPI number}.",
  },
  {
    label: "6. Payment mil gayi",
    text: "Dhanyavaad {naam} ji, aapki ₹{amount} ki fees mil gayi hai. Aapka plan {end date} tak chalega. Milte hain gym mein!",
  },
  {
    label: "7. Plan khatam hone ke baad",
    text: "Namaste {naam} ji, aapka plan kal khatam ho gaya. Aap kabhi bhi dobara shuru kar sakte hain. Agar timing ya plan badalna ho to bataiye.",
  },
  {
    label: "8. Lambe plan ka offer",
    text: "Hi {naam} ji, is mahine 3 mahine ke plan par {offer} hai, {date} tak. Agar interested hain to YES likh dijiye, hum aapke liye rakh denge.",
  },
  {
    label: "9. Kuch din se gym nahi aaye",
    text: "Namaste {naam} ji, kai din se aap gym nahi aaye. Sab theek hai na? Timing mein koi dikkat ho to bataiye, hum adjust kar denge.",
  },
  {
    label: "10. Agle mahine ki fees",
    text: "Hi {naam} ji, agle mahine ki fees {date} ko due hogi. Pehle se pay karna ho to UPI number {UPI number} par kar sakte hain. Dhanyavaad.",
  },
];

const faqs = [
  {
    q: "Kya ye messages apne aap chale jaate hain?",
    a: "Nahi. Ye ready shabd hain jo aap copy karke khud bhejte hain. Ye aapko wording aur tone sahi rakhne mein madad karte hain.",
  },
  {
    q: "Kya Hindi script mein bhej sakte hain?",
    a: "Haan. Hum yahan Roman Hinglish mein likhte hain kyunki zyada tar log WhatsApp par aise hi type karte hain. Aap apne members ke hisaab se Devanagari mein bhi badal sakte hain.",
  },
  {
    q: "Message kitna lamba hona chahiye?",
    a: "Chhota. Agar phone ki screen par scroll karna pade to wo lamba hai. Naam, amount, date aur payment ka tareeka, bas itna kaafi hai.",
  },
  {
    q: "Reminder ke saath penalty ki baat likhni chahiye?",
    a: "Reminder mein nahi. Penalty ka zikr gym ke joining form mein hona chahiye, aur uski baat alag se, phone par ya saamne.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      lang="hi-Latn"
      h1="Gym fee reminder message in Hindi: 10 ready messages, copy karein"
      lead="Ye gym fee reminder message in Hindi, yaani Roman Hinglish mein, ek ready library hai. Har message ke neeche copy button hai. Curly brackets mein jo naam, amount aur date hai, wahi badalna hai. Ye messages aap khud bhejte hain, apne WhatsApp se, aur inme koi dhamki ya sharminda karne wali baat nahi hai."
      toc={toc}
      related={["/hi/whatsapp-reminder", "/hi", "/hi/gym-billing-software", "/features/gym-crm"]}
    >
      <Section id="messages" title="10 ready messages">
        <div className="space-y-4">
          {messages.map((m) => (
            <CopyBlock key={m.label} label={m.label} text={m.text} />
          ))}
        </div>
      </Section>

      <MidCta text="Reminders ke saath follow-up ki list bhi ek jagah rakhni hai?" location="hi-msg-mid" />

      <Section id="kaise" title="Kaise use karein">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Message copy karein.</li>
          <li>{"{naam}, {amount}, {date}"} jaisi cheezein asli details se badal dein.</li>
          <li>Member ko personal chat mein bhejein, group mein nahi.</li>
          <li>Jawab aaye to apni list mein likh lein.</li>
        </ol>
        <p>
          Reminder bhejne ka poora roz ka routine{" "}
          <PageLink href="/hi/whatsapp-reminder">WhatsApp reminder guide</PageLink> mein diya hai.
        </p>
      </Section>

      <Section id="tone" title="Sahi tone">
        <p>
          Ek achha fee reminder member ko yaad dilata hai, daraata nahi. Naam se shuru karein, amount aur date saaf
          likhein, aur ek aasan tareeka dein. Last mein &quot;koi dikkat ho to batayein&quot; jaisa ek vakya rakhein,
          kyunki aksar member ki dikkat paisa nahi, bhool hoti hai.
        </p>
      </Section>

      <Section id="faq" title="Aam sawal">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        English mein renewal ke templates chahiye? Dekhein{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Fitvario features
        </Link>{" "}
        ya{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          demo book karein
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
