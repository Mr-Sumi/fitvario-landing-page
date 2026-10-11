import { assertNonNegative, assertPercent, toPaise, fromPaise, roundToStep } from "./money.mjs";

/** What one member costs you per month: your fixed costs spread over members, plus anything per member. */
export function costPerMember({ fixedMonthly, variablePerMember = 0, members }) {
  assertNonNegative("fixed monthly cost", fixedMonthly);
  assertNonNegative("variable cost per member", variablePerMember);
  assertNonNegative("members", members);
  if (members === 0) throw new RangeError("members must be at least 1");
  return fromPaise(toPaise(fixedMonthly / members) + toPaise(variablePerMember));
}

/** Cost-plus: add a markup percentage on top of cost. */
export function priceCostPlus({ cost, markupPercent }) {
  assertNonNegative("cost", cost);
  assertNonNegative("markup", markupPercent);
  return fromPaise(Math.round(toPaise(cost) * (1 + markupPercent / 100)));
}

/** Target margin: the share of the price you want to keep. Margin 25 means price - cost = 25% of price. */
export function priceTargetMargin({ cost, marginPercent }) {
  assertNonNegative("cost", cost);
  assertPercent("target margin", marginPercent);
  if (marginPercent >= 100) throw new RangeError("target margin must be below 100");
  return fromPaise(Math.round(toPaise(cost) / (1 - marginPercent / 100)));
}

/**
 * Plan ladder from a one-month price. Each plan has a length in months and a discount against paying monthly.
 * roundTo: round each plan price to the nearest step (for example 50). 0 keeps paise.
 */
export function planLadder({ monthlyPrice, plans, roundTo = 0 }) {
  assertNonNegative("monthly price", monthlyPrice);
  assertNonNegative("rounding step", roundTo);
  return plans.map((p) => {
    assertNonNegative("plan months", p.months);
    assertPercent("plan discount", p.discountPercent);
    if (p.months < 1) throw new RangeError("plan months must be at least 1");
    const gross = monthlyPrice * p.months;
    const price = roundToStep(gross * (1 - p.discountPercent / 100), roundTo);
    return {
      months: p.months,
      discountPercent: p.discountPercent,
      gross: fromPaise(toPaise(gross)),
      price,
      perMonth: fromPaise(toPaise(price / p.months)),
      saving: fromPaise(toPaise(gross) - toPaise(price)),
    };
  });
}
