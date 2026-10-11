export interface GstSplit {
  base: number;
  tax: number;
  total: number;
  cgst: number;
  sgst: number;
  igst: number;
  ratePercent: number;
  mode: "exclusive" | "inclusive";
  supply: "intra" | "inter";
}
export function splitGst(input: {
  amount: number;
  ratePercent?: number;
  mode?: "exclusive" | "inclusive";
  supply?: "intra" | "inter";
}): GstSplit;
