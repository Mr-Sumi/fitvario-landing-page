import { buildMetadata } from "@/lib/seo";
import { ComparePage } from "@/components/ComparePage";

const PATH = "/compare/gymmaster-alternative-india";
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ComparePage path={PATH} />;
}
