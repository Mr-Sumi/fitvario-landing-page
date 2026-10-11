import { assertNonNegative, assertPercent, toPaise, fromPaise } from "./money.mjs";

/**
 * Split an amount into base, tax and total.
 * mode "exclusive": `amount` is the price before tax. mode "inclusive": `amount` already contains tax.
 * supply "intra": CGST + SGST (half each). supply "inter": IGST.
 * The rate is an input, never a built-in fact. Check the current rate with your CA.
 */
export function splitGst({ amount, ratePercent = 18, mode = "exclusive", supply = "intra" }) {
  assertNonNegative("amount", amount);
  assertPercent("GST rate", ratePercent, { max: 100 });
  if (mode !== "exclusive" && mode !== "inclusive") throw new RangeError("mode must be exclusive or inclusive");
  if (supply !== "intra" && supply !== "inter") throw new RangeError("supply must be intra or inter");

  const amountP = toPaise(amount);
  let baseP;
  let taxP;
  let totalP;
  if (mode === "exclusive") {
    baseP = amountP;
    taxP = Math.round((baseP * ratePercent) / 100);
    totalP = baseP + taxP;
  } else {
    totalP = amountP;
    baseP = Math.round((totalP * 100) / (100 + ratePercent));
    taxP = totalP - baseP;
  }

  // An odd paisa goes to SGST so that CGST + SGST always equals the tax exactly
  const cgstP = supply === "intra" ? Math.floor(taxP / 2) : 0;
  const sgstP = supply === "intra" ? taxP - cgstP : 0;
  const igstP = supply === "inter" ? taxP : 0;

  return {
    base: fromPaise(baseP),
    tax: fromPaise(taxP),
    total: fromPaise(totalP),
    cgst: fromPaise(cgstP),
    sgst: fromPaise(sgstP),
    igst: fromPaise(igstP),
    ratePercent,
    mode,
    supply,
  };
}
