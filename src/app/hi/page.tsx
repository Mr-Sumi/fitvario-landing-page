import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/hi";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "kya", label: "Gym software kya karta hai" },
  { id: "kaam", label: "Kin kaamon mein madad" },
  { id: "kaun", label: "Kiske liye hai" },
  { id: "pages", label: "Hinglish guides" },
  { id: "shuru", label: "Shuru kaise karein" },
  { id: "faq", label: "Aam sawal" },
];

const faqs = [
  {
    q: "Kya Fitvario Hindi mein bhi chalta hai?",
    a: "Ye page aur isse jude guides Hinglish mein hain taaki samajhna aasan ho. Software ki bhasha aur messages kis language mein chalte hain, ye demo mein dekh lein, kyunki hum yahan sirf wahi kehna chahte hain jo confirm ho.",
  },
  {
    q: "Chhote gym ke liye bhi software chahiye?",
    a: "Jab tak 30 se 40 members hain, register chal jata hai. Uske baad renewal ki date, pending fees aur enquiry yaad rakhna mushkil hota hai. Wahi waqt hai jab software ka fayda dikhta hai.",
  },
  {
    q: "Pehle kya karna chahiye, software ya numbers?",
    a: "Pehle apne numbers dekhein: kitne members chahiye, kitna kharcha hai. Iske liye neeche diye calculators use kar sakte hain. Fir software ka kharcha usme jodkar dekhein.",
  },
  {
    q: "Demo kaise milega?",
    a: "Contact page par form bhar dein ya email karein. Hum aapke gym ke hisaab se walkthrough karenge.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      lang="hi-Latn"
      h1="Gym management software Hindi mein: gym ke liye software kaise kaam karta hai"
      lead="Gym ke liye software aapke members, fees, attendance aur enquiries ko ek jagah rakhta hai, taaki aapko register, Excel aur WhatsApp group par depend na rehna pade. Is page par Fitvario ko Hinglish mein simple tareeke se samjhaya gaya hai: kya karta hai, kiske kaam ka hai aur shuru kaise karein."
      toc={toc}
      related={["/features", "/pricing", "/features/gym-crm", "/tools/gym-break-even-calculator"]}
    >
      <Section id="kya" title="Gym software kya karta hai">
        <p>
          Gym ke liye software ek aisa system hai jisme aapke gym ka roz ka kaam record hota hai. Kaun member hai, uska
          plan kab khatam ho raha hai, fees aayi ya nahi, aaj kaun aaya, aur kis enquiry par kab call karna hai. Ye sab
          cheezein jab ek jagah hoti hain to kuch bhoolta nahi.
        </p>
        <p>
          Register mein ye sab likhna theek hai jab members kam hon. Jaise jaise gym badhta hai, ek hi cheez teen
          jagah likhi hoti hai aur kisi ek jagah chhoot jaati hai. Software us galti ko kam karta hai.
        </p>
      </Section>

      <MidCta text="Apne gym ke hisaab se demo dekhna hai?" location="hi-hub-mid" />

      <Section id="kaam" title="Kin kaamon mein madad karta hai">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Members aur renewals:</strong> plan kab shuru hua, kab khatam hoga, aur renewal par invoice.
          </li>
          <li>
            <strong>Attendance:</strong> gym ke QR code se member apne phone se check-in kar sakta hai.
          </li>
          <li>
            <strong>Enquiry follow-up:</strong> kisne poocha, kis plan ke baare mein, aur agla call kab karna hai. Dekhein{" "}
            <PageLink href="/features/gym-crm">gym CRM</PageLink>.
          </li>
          <li>
            <strong>Kharcha aur kamai:</strong> roz ka collection aur kharcha app mein ek jagah, Excel ki jagah.
          </li>
          <li>
            <strong>Kai branch:</strong> ek account se saari branches ka hisaab aur comparison.
          </li>
        </ul>
        <p>
          Kaun si cheez kitni tezi se chalegi, ye aapke gym ke size aur team par depend karta hai. Isliye hum demo mein
          aapke apne kaam dikhate hain.
        </p>
      </Section>

      <Section id="kaun" title="Kiske liye hai">
        <p>
          Ye un gym owners ke liye hai jo ek ya kai branch chalate hain, aur jinke paas ek chhoti team hai: owner, kuch
          trainers aur front desk. Agar aap abhi bhi fees WhatsApp group mein poochte hain aur renewal ki date diary
          mein likhte hain, to ye aapke liye hai.
        </p>
      </Section>

      <Section id="pages" title="Hinglish guides">
        <p>Har guide ek sawal ka jawab deti hai. Jo aapke kaam ka ho, wahi padhein.</p>
        <ul className="space-y-3">
          <li>
            <PageLink href="/hi/gym-billing-software">Gym ka billing software</PageLink>: fees, invoice aur renewal kaise
            sambhalte hain.
          </li>
          <li>
            <PageLink href="/hi/whatsapp-reminder">Gym ka fees reminder WhatsApp par</PageLink>: kab aur kaise bhejein.
          </li>
          <li>
            <PageLink href="/hi/gym-fee-reminder-message">Gym fee reminder message in Hindi</PageLink>: 10 ready
            messages, copy button ke saath.
          </li>
          <li>
            <PageLink href="/hi/gym-software-kaise-chune">Gym software kaise chune</PageLink>: lene se pehle ki
            checklist.
          </li>
          <li>
            <PageLink href="/hi/blog/gym-me-member-kaise-badhaye">Gym me member kaise badhaye</PageLink>: 7 aasan tarike.
          </li>
        </ul>
      </Section>

      <Section id="shuru" title="Shuru kaise karein">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Apne numbers dekhein: kitne members chahiye aur kitna kharcha hai.</li>
          <li>Apne kaam ki list banayein: fees, renewal, attendance, enquiry.</li>
          <li>Software se wahi kaam karwa kar dekhein, apne asli members par.</li>
          <li>Support aur data export check karein, fir decide karein.</li>
        </ol>
        <p>
          Pehle step ke liye{" "}
          <PageLink href="/tools/gym-break-even-calculator">break-even calculator</PageLink> kaam aayega. Kharche ka andaza
          lagane ke liye{" "}
          <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            pricing page
          </Link>{" "}
          dekhein.
        </p>
      </Section>

      <Section id="faq" title="Aam sawal">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        English mein poori feature list{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          features page
        </Link>{" "}
        par hai, aur demo ke liye{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          contact page
        </Link>{" "}
        par form bharein.
      </p>
    </ContentLayout>
  );
}
