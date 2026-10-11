import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/hi/gym-billing-software";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "problem", label: "Register ki dikkat" },
  { id: "kaam", label: "Billing software ka kaam" },
  { id: "tareeka", label: "Fees kaise sambhalein" },
  { id: "part", label: "Aadhi payment ka rule" },
  { id: "gst", label: "GST ka sawal" },
  { id: "faq", label: "Aam sawal" },
];

const faqs = [
  {
    q: "Billing software aur Excel mein kya fark hai?",
    a: "Excel mein aap khud har cheez bharte hain aur kisi se galti ho jaye to pata nahi chalta. Software member ke saath uski plan, date aur invoice jodta hai, aur team ke sab log wahi record dekhte hain.",
  },
  {
    q: "Kya member ko invoice milta hai?",
    a: "Fitvario mein har membership ke liye invoice banta hai aur renewal ka record rehta hai. Invoice par kya kya dikhega, ye demo mein dekh lein.",
  },
  {
    q: "Cash aur UPI dono ka record ho sakta hai?",
    a: "Aapko har payment ka tareeka likhna hota hai, jaise cash ya online. Kaun si detail kis tarah save hoti hai, ye demo mein dikhaya jata hai.",
  },
  {
    q: "Kya purana data daal sakte hain?",
    a: "Purani member list laane mein hum madad karte hain. Kitna data aur kis format mein, ye aapke register ya Excel ko dekhkar tay hota hai.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      lang="hi-Latn"
      h1="Gym ka billing software: fees, invoice aur renewal ek jagah"
      lead="Gym ka billing software member ki fees, invoice aur renewal ki date ko ek hi jagah rakhta hai, taaki register aur Excel mein baar baar dekhna na pade. Aap plan ke saath invoice banate hain, payment ka tareeka likhte hain aur dekhte hain ki kiski renewal kab aa rahi hai. Is guide mein simple tareeke se samjhaya gaya hai ki ye kaise kaam karta hai."
      toc={toc}
      related={["/hi", "/hi/whatsapp-reminder", "/hi/gym-fee-reminder-message", "/pricing"]}
    >
      <Section id="problem" title="Register ki dikkat">
        <p>
          Register mein fees likhna asaan lagta hai. Dikkat tab hoti hai jab aapko pata karna ho ki is mahine kitna
          paisa aaya, kiska plan agle hafte khatam ho raha hai, ya kisne pichle mahine aadhi fees di thi. Har sawal ke
          liye aapko pura register ulatna padta hai.
        </p>
        <p>
          Jab do log desk par baithte hain, to ek hi member ki entry do jagah ho jaati hai ya kisi ek jagah rah jaati
          hai. Mahine ke end mein hisaab milane mein ghanta lag jata hai.
        </p>
      </Section>

      <Section id="kaam" title="Billing software ka kaam">
        <ul className="list-disc space-y-2 pl-5">
          <li>Member ka plan aur uski shuruaat aur end date record rakhna.</li>
          <li>Har membership par invoice banana, taaki member ke paas proof ho.</li>
          <li>Renewal par naya invoice banana, purane record ke saath.</li>
          <li>Payment ka tareeka likhna: cash, card ya online.</li>
          <li>Kitna collection hua aur kitna kharcha hua, ek jagah dikhana.</li>
        </ul>
        <p>
          Isse aapko mahine ke end mein hisaab nahi banana padta, kyunki record roz bana rehta hai.
        </p>
      </Section>

      <MidCta text="Apne gym ka billing ek demo mein dekhein." location="hi-billing-mid" />

      <Section id="tareeka" title="Fees kaise sambhalein">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Member join karte hi plan chunein aur uski end date likhein.</li>
          <li>Payment lete hi invoice banayein. Baad mein banane ka wada na karein.</li>
          <li>Har subah dekhein ki aaj aur agle 3 din mein kiske plan khatam ho rahe hain.</li>
          <li>Unhe apne tareeke se reminder bhejein. Ready messages{" "}
            <PageLink href="/hi/gym-fee-reminder-message">is guide</PageLink> mein hain.
          </li>
          <li>Hafte ke end mein collection aur kharcha ka total check karein.</li>
        </ol>
        <ExampleBox title="Misaal">
          <p>
            Agar kisi member ka 3 mahine ka plan ₹3,600 ka hai aur wo aaj ₹3,600 deta hai, to aap aaj hi uska invoice
            banate hain aur end date likh dete hain. Teen mahine baad wahi member renew karta hai to naya invoice
            banta hai. Purana record neeche rehta hai.
          </p>
        </ExampleBox>
        <p>Ye sirf ek example hai. Aapke plans aur fees alag ho sakte hain.</p>
      </Section>

      <Section id="part" title="Aadhi payment ka rule">
        <p>
          Kai member ek saath poori fees nahi dete. Ye normal hai, bas rule pehle se tay rakhein. Jaise: aadhi fees
          pehle din, baaki 10 din mein. Jo paisa mila aur jo baaki hai, dono ko kagaz par ya system mein tareekh ke
          saath likhein. Baaki rakam ki koi entry na ho, to baad mein jhagda hota hai.
        </p>
      </Section>

      <Section id="gst" title="GST ka sawal">
        <p>
          Gym ki fees par GST kab aur kitna lagega, ye aapke CA se poochne wali baat hai, kyunki ye aapki registration
          aur turnover par depend karta hai. Hum yahan koi rate nahi bata rahe. Amount ko GST ke saath ya bina GST ke
          nikalne ke liye ek calculator{" "}
          <PageLink href="/tools/gym-gst-calculator">GST calculator</PageLink> par aa raha hai, jise CA review ke baad
          hi publish kiya jayega.
        </p>
      </Section>

      <Section id="faq" title="Aam sawal">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        English mein{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          features
        </Link>{" "}
        dekhein, kharche ke liye{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          pricing
        </Link>{" "}
        ya demo ke liye{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          contact
        </Link>{" "}
        par jayein.
      </p>
    </ContentLayout>
  );
}
