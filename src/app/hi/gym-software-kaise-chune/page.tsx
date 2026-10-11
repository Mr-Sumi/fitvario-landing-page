import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/hi/gym-software-kaise-chune";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "pehle", label: "Pehle apna kaam likhein" },
  { id: "check", label: "Kya check karein" },
  { id: "poochein", label: "Vendor se kya poochein" },
  { id: "red", label: "Red flags" },
  { id: "trial", label: "Trial kaise karein" },
  { id: "faq", label: "Aam sawal" },
];

const faqs = [
  {
    q: "Sabse sasta software chunna theek hai?",
    a: "Sirf price dekhkar nahi. Kai baar sasta plan messaging ya extra staff ke paise alag leta hai. Poore saal ka total nikalkar compare karein.",
  },
  {
    q: "Kya free software chalega?",
    a: "Bahut chhote gym ke liye chal sakta hai, agar aap uski limits jaante hon: members, messages, support aur data export. Gym badhne par kya hoga, ye pehle se poochh lein.",
  },
  {
    q: "Kitne din trial karna chahiye?",
    a: "Kam se kam ek renewal cycle, yaani lagbhag ek mahina. 15 minute ka demo bas achha raasta dikhata hai, asli dikkat hafte bhar use karne par dikhti hai.",
  },
  {
    q: "Team ko seekhne mein kitna time lagega?",
    a: "Jo software aapke 10 roz ke kaam asaan banata hai, wo front desk jaldi seekh leta hai. Isliye trial mein desk ke bande ko hi use karne dein.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      lang="hi-Latn"
      h1="Gym software kaise chune: owner ke liye checklist"
      lead="Gym software kaise chune: pehle apne 10 roz ke kaam likhein, fir har software se wahi kaam karwa kar dekhein. Price, support, data export aur WhatsApp ki baat pehle poochein, aur trial front desk ke bande se karwayein. Is checklist mein wo sab kuch hai jo kisi bhi software ko lene se pehle check karna chahiye, chahe wo kisi ka bhi ho."
      toc={toc}
      related={["/hi", "/pricing", "/features", "/tools/gym-break-even-calculator"]}
    >
      <Section id="pehle" title="Pehle apna kaam likhein">
        <p>
          Software ki list dekhne se pehle ek kaagaz par apne 10 roz ke kaam likhein. Jaise: naya member jodna, fees
          lena, renewal dekhna, aaj kaun aaya, enquiry ka follow-up, mahine ka collection. Isi list se har software ko
          check karein, uske features ki lambi list se nahi.
        </p>
      </Section>

      <Section id="check" title="Kya check karein">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Fees aur invoice:</strong> kya aap invoice bana sakte hain aur renewal ki date dekh sakte hain?
          </li>
          <li>
            <strong>Attendance:</strong> QR, manual ya biometric. Kaun sa aapke gym par chalega?
          </li>
          <li>
            <strong>Enquiry follow-up:</strong> kya aaj kisko call karna hai, wo list dikhti hai?
          </li>
          <li>
            <strong>Messaging:</strong> WhatsApp ya SMS kaise jaate hain, aur har message ka kitna paisa lagta hai?
          </li>
          <li>
            <strong>GST:</strong> kya aapko tax lines chahiye? Rate ke liye CA se poochein.
          </li>
          <li>
            <strong>Staff access:</strong> har staff kya dekh sakta hai, aur kya badal sakta hai?
          </li>
          <li>
            <strong>Member app:</strong> kya members ke paas app hai, aur uspar kiska naam hai?
          </li>
          <li>
            <strong>Reports:</strong> collection, kharcha aur member growth.
          </li>
        </ul>
      </Section>

      <MidCta text="Fitvario ko apne 10 kaam par test karna hai?" location="hi-choose-mid" />

      <Section id="poochein" title="Vendor se kya poochein">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Price per member hai, per branch hai ya flat? Aur 100 members badhne par kya hoga?</li>
          <li>Messaging ke paise plan mein hain ya alag?</li>
          <li>Setup ya data import ka koi charge hai?</li>
          <li>Kya main apna saara data kabhi bhi export kar sakta hoon?</li>
          <li>Refund aur cancel ki policy kya hai?</li>
          <li>Problem aane par kaun, kitni der mein, aur kis language mein jawab deta hai?</li>
        </ol>
        <p>
          Kharche ki baat ke liye{" "}
          <PageLink href="/pricing">pricing page</PageLink> par dekhein ki hum kin cheezon par price tay karte hain.
        </p>
      </Section>

      <Section id="red" title="Red flags">
        <ul className="list-disc space-y-2 pl-5">
          <li>Price batane se bachna, ya sirf &quot;demo ke baad&quot; bolna aur koi range na dena.</li>
          <li>Data export ka jawab gol-matol dena.</li>
          <li>Bahut lamba lock-in aur kam refund.</li>
          <li>Aapke 10 kaam par demo dikhane ke bajaye apna pre-set demo chalana.</li>
          <li>Support sirf ek email par aur koi time batana nahi.</li>
        </ul>
        <p>Ye baatein kisi bhi vendor par lagu hoti hain, hum par bhi. Isliye ye sawal humse bhi poochiye.</p>
      </Section>

      <Section id="trial" title="Trial kaise karein">
        <ol className="list-decimal space-y-2 pl-5">
          <li>5 se 10 asli members daal kar dekhein.</li>
          <li>Ek hafte tak front desk wahi software use kare.</li>
          <li>Ek renewal aur ek enquiry follow-up poora karein.</li>
          <li>Export try karein.</li>
          <li>Fir team se poochein: kaun sa aasan laga?</li>
        </ol>
        <p>
          Apne numbers pehle{" "}
          <PageLink href="/tools/gym-break-even-calculator">break-even calculator</PageLink> mein daal lein, taaki
          software ka kharcha un numbers ke saath dekh sakein.
        </p>
      </Section>

      <Section id="faq" title="Aam sawal">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Fitvario ke baare mein{" "}
        <Link href="/about" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          about page
        </Link>{" "}
        par padh sakte hain, ya seedha{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          demo
        </Link>{" "}
        maangein.
      </p>
    </ContentLayout>
  );
}
