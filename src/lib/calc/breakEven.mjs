import { assertNonNegative, assertPercent, toPaise, fromPaise, sum } from "./money.mjs";

/**
 * Break-even members for a gym.
 * fixedCosts: monthly costs that do not change with member count (list of amounts).
 * feePerMember: what one member pays per month (use the monthly equivalent of longer plans).
 * feeIncludesGst: true when that fee already contains GST, so GST is taken out before it counts as income.
 */
export function breakEven({
  fixedCosts,
  feePerMember,
  feeIncludesGst = false,
  gstRatePercent = 18,
  variableCostPerMember = 0,
  membersNow = 0,
}) {
  if (!Array.isArray(fixedCosts)) throw new RangeError("fixedCosts must be a list");
  fixedCosts.forEach((c, i) => assertNonNegative(`fixed cost ${i + 1}`, c));
  assertNonNegative("fee per member", feePerMember);
  assertNonNegative("variable cost per member", variableCostPerMember);
  assertNonNegative("members now", membersNow);
  assertPercent("GST rate", gstRatePercent);

  const fixedP = sum(fixedCosts.map(toPaise));
  const feeP = toPaise(feePerMember);
  const netFeeP = feeIncludesGst ? Math.round((feeP * 100) / (100 + gstRatePercent)) : feeP;
  const contributionP = netFeeP - toPaise(variableCostPerMember);

  const profitAt = (members, contribution) => fromPaise(Math.round(members * contribution) - fixedP);

  if (contributionP <= 0) {
    return {
      reachable: false,
      fixed: fromPaise(fixedP),
      netFee: fromPaise(netFeeP),
      contribution: fromPaise(contributionP),
      breakEvenMembers: null,
      profitAtMembersNow: profitAt(membersNow, contributionP),
      sensitivity: [],
    };
  }

  const members = fixedP === 0 ? 0 : Math.ceil(fixedP / contributionP);

  // How the answer moves if the fee changes. Same costs, fee scaled.
  const sensitivity = [-20, -10, 0, 10, 20].map((deltaPercent) => {
    const scaledNetP = Math.round((netFeeP * (100 + deltaPercent)) / 100);
    const c = scaledNetP - toPaise(variableCostPerMember);
    return {
      deltaPercent,
      netFee: fromPaise(scaledNetP),
      breakEvenMembers: c > 0 ? (fixedP === 0 ? 0 : Math.ceil(fixedP / c)) : null,
      profitAtMembersNow: profitAt(membersNow, c),
    };
  });

  return {
    reachable: true,
    fixed: fromPaise(fixedP),
    netFee: fromPaise(netFeeP),
    contribution: fromPaise(contributionP),
    breakEvenMembers: members,
    profitAtMembersNow: profitAt(membersNow, contributionP),
    sensitivity,
  };
}
