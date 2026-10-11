import { buildMetadata } from "@/lib/seo";
import { ComparePage } from "@/components/ComparePage";

const PATH = "/compare/mindbody-alternative-india";
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ComparePage path={PATH} />;
}
