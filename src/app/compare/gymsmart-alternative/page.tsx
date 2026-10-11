import { buildMetadata } from "@/lib/seo";
import { ComparePage } from "@/components/ComparePage";

const PATH = "/compare/gymsmart-alternative";
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ComparePage path={PATH} />;
}
