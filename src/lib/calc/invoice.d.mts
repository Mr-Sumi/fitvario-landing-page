export interface InvoiceTotals {
  subtotal: number;
  discount: number;
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  tax: number;
  total: number;
}
export function invoiceTotals(input: {
  amount: number;
  discount?: number;
  gstEnabled?: boolean;
  gstRatePercent?: number;
  mode?: "exclusive" | "inclusive";
  supply?: "intra" | "inter";
}): InvoiceTotals;
