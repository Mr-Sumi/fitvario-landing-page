import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";

const PATH = "/hi/blog/gym-me-member-kaise-badhaye";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "pehle", label: "Pehle ye theek karein" },
  { id: "maps", label: "1. Google Maps" },
  { id: "insta", label: "2. Instagram" },
  { id: "trial", label: "3. Trial pass" },
  { id: "followup", label: "4. Enquiry follow-up" },
  { id: "referral", label: "5. Referral" },
  { id: "local", label: "6. Aas-paas ke log" },
  { id: "status", label: "7. WhatsApp status" },
  { id: "faq", label: "Aam sawal" },
];

const faqs = [
  {
    q: "Sabse pehle kya karna chahiye?",
    a: "Google Maps par apna profile theek karein aur har enquiry ko agle din call karein. Dono mein paisa nahi lagta, aur dono se wo log wapas aate hain jo pehle se interested the.",
  },
  {
    q: "Kya discount dene se member badhte hain?",
    a: "Kuch aate hain, par wo agle sasti jagah par chale jaate hain. Pehle visibility aur follow-up theek karein, fir offer dein, aur offer ko lambe plan se jodein.",
  },
  {
    q: "Instagram par kya daalein?",
    a: "Apna asli gym: trainers, class ka ek chhota clip aur members ki achievements. Bade brands ki nakal na karein, kyunki log aapke aas-paas ke hain.",
  },
  {
    q: "Kitne din mein farak dikhega?",
    a: "Follow-up aur trial ka farak kuch hafton mein dikhta hai. Maps aur reviews dheere dheere kaam karte hain. Har source ka hisaab rakhein, taaki pata chale kaun sa chal raha hai.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      lang="hi-Latn"
      h1="Gym me member kaise badhaye: 7 aasan tarike chhote gym ke liye"
      lead="Gym me member kaise badhaye, iska sabse seedha jawab hai: pehle log aapko dhoondh sakein, fir aasani se try kar sakein, aur har enquiry par aapka call agle din ho. Uske baad referral aur aas-paas ki society ya office se baat karein. Ye guide 7 tarike deti hai jo ek chhota gym bina bade budget ke shuru kar sakta hai."
      toc={toc}
      related={["/hi", "/features/gym-crm", "/tools/gym-churn-calculator", "/tools/gym-revenue-calculator"]}
    >
      <Section id="pehle" title="Pehle ye theek karein">
        <p>
          Zyada tar owner member badhane ke liye ad par paisa lagate hain, jabki unke paas pehle se aaye logon ka follow-up
          nahi hota. Sawal ye hai ki aapke paas hafte mein kitni enquiry aati hain aur unmein se kitni ko aapne
          wapas call kiya. Ye number likhna aaj hi shuru kar dein.
        </p>
      </Section>

      <Section id="maps" title="1. Google Maps par profile theek karein">
        <p>
          Jab koi &quot;gym near me&quot; search karta hai, to wo aapka Google profile dekhta hai. Wahan sahi address,
          timing, ek phone number jo uthta ho, gym ki asli photos aur kuch reviews hone chahiye. Khush members se
          review ka link share karke review maangein, aur har review ka politely jawab dein.
        </p>
      </Section>

      <MidCta text="Har enquiry ko ek list mein rakhna hai?" location="hi-grow-mid" />

      <Section id="insta" title="2. Instagram par apna asli gym dikhayein">
        <p>
          Trainer ka ek move samjhana, class ka 15 second ka clip ya member ki achhi progress. Ye cheezein kisi bhi
          stock photo se zyada kaam karti hain. Bio mein location, timing aur ek number zaroor rakhein.
        </p>
        <VideoPlaceholder title="Gym ke liye Instagram reels kaise banayein" />
      </Section>

      <Section id="trial" title="3. Trial pass se jhijhak kam karein">
        <p>
          Naye log do cheezon se darte hain: price se aur ye sochkar ki wo wahan fit honge ya nahi. Ek ya teen din ka
          trial, trainer ke saath, dono darr kam kar deta hai. Trial ke baad agle din hi baat karein.
        </p>
      </Section>

      <Section id="followup" title="4. Har enquiry ka follow-up">
        <p>
          Har enquiry ka naam, number, kaun sa plan poocha aur agla call kab karna hai, ye likhein. Agle din call karein
          aur har baar ek chhota note jodein. Ye kaam sabse zyada member laata hai, aur ye ek shared list se aasan
          hota hai, jaise{" "}
          <PageLink href="/features/gym-crm">gym CRM</PageLink> mein.
        </p>
      </Section>

      <Section id="referral" title="5. Referral: members se kehlwayein">
        <p>
          Aapke members hi aapka sabse achha marketing hain. Achha mahina khatam hone par unse ek friend laane ko
          kahein, aur dono ko kuch chhota dein, jaise kuch din free ya ek session. Naam ya referral code joining form
          par likhwayein, taaki baad mein jhagda na ho.
        </p>
      </Section>

      <Section id="local" title="6. Aas-paas ke log">
        <p>
          Apartment society, offices, coaching centres aur clinics apne aas-paas hi hote hain. Ek contact person se
          baat karein aur ek saaf offer rakhein, jaise 10 log aaye to ek khaas batch. Ek visit mein kai members aa
          jaate hain.
        </p>
      </Section>

      <Section id="status" title="7. WhatsApp status aur broadcast sambhal kar">
        <p>
          Apne gym ka number save karwayein aur kabhi kabhi status par timing, naya batch ya koi photo daalein. Kisi ko
          bina poochhe group mein na jodein. Zyada promotional message bhejne se log number block kar dete hain.
        </p>
      </Section>

      <Section id="faq" title="Aam sawal">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Member aane ke baad unhe rokna bhi zaroori hai. Churn ka apna number{" "}
        <PageLink href="/tools/gym-churn-calculator">churn calculator</PageLink> se nikaal lein, aur{" "}
        <Link href="/hi" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Hinglish hub
        </Link>{" "}
        par aur guides dekhein.
      </p>
    </ContentLayout>
  );
}
