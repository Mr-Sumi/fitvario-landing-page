import { assertNonNegative, toPaise, fromPaise } from "./money.mjs";
import { splitGst } from "./gst.mjs";

/**
 * Totals for the sample invoice generator. A discount is taken off before tax.
 * gstEnabled false means the invoice carries no tax lines at all.
 */
export function invoiceTotals({ amount, discount = 0, gstEnabled = false, gstRatePercent = 18, mode = "exclusive", supply = "intra" }) {
  assertNonNegative("amount", amount);
  assertNonNegative("discount", discount);
  if (discount > amount) throw new RangeError("discount cannot be more than the amount");

  const afterDiscount = fromPaise(toPaise(amount) - toPaise(discount));
  if (!gstEnabled) {
    return { subtotal: fromPaise(toPaise(amount)), discount: fromPaise(toPaise(discount)), taxable: afterDiscount, cgst: 0, sgst: 0, igst: 0, tax: 0, total: afterDiscount };
  }
  const g = splitGst({ amount: afterDiscount, ratePercent: gstRatePercent, mode, supply });
  return {
    subtotal: fromPaise(toPaise(amount)),
    discount: fromPaise(toPaise(discount)),
    taxable: g.base,
    cgst: g.cgst,
    sgst: g.sgst,
    igst: g.igst,
    tax: g.tax,
    total: g.total,
  };
}
