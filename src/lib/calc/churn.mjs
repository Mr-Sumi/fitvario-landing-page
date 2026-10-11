import { assertNonNegative, assertPercent, toPaise, fromPaise } from "./money.mjs";

/**
 * Monthly churn for a gym.
 * startMembers: active members at the start of the month. lostMembers: members who left (did not renew) in it.
 * newMembers: joined during the month (only used for the closing count).
 */
export function churn({ startMembers, lostMembers, newMembers = 0, monthlyFee, grossMarginPercent = 100 }) {
  assertNonNegative("members at start", startMembers);
  assertNonNegative("members lost", lostMembers);
  assertNonNegative("new members", newMembers);
  assertNonNegative("monthly fee", monthlyFee);
  assertPercent("gross margin", grossMarginPercent);
  if (startMembers === 0) throw new RangeError("members at start must be at least 1");
  if (lostMembers > startMembers) throw new RangeError("members lost cannot be more than members at start");

  const churnRate = lostMembers / startMembers;
  const lifetimeMonths = churnRate > 0 ? 1 / churnRate : null;
  const marginFee = monthlyFee * (grossMarginPercent / 100);

  return {
    churnRate,
    retentionRate: 1 - churnRate,
    // share of today's members still there after a year if the monthly rate stays the same
    yearRetention: Math.pow(1 - churnRate, 12),
    lifetimeMonths,
    lifetimeValue: lifetimeMonths === null ? null : fromPaise(toPaise(marginFee * lifetimeMonths)),
    revenueLostPerMonth: fromPaise(toPaise(lostMembers * monthlyFee)),
    closingMembers: startMembers - lostMembers + newMembers,
  };
}

/**
 * What a lower churn rate would be worth. reductionPercent is relative: 20 means churn falls by a fifth
 * (for example from 10% to 8%). Revenue saved per year is a simple monthly saving times twelve and ignores compounding.
 */
export function churnScenarios({ startMembers, churnRate, monthlyFee, reductionsPercent = [10, 20, 30] }) {
  assertNonNegative("members at start", startMembers);
  assertNonNegative("monthly fee", monthlyFee);
  assertPercent("churn rate", churnRate * 100);
  return reductionsPercent.map((r) => {
    assertPercent("reduction", r);
    const newRate = churnRate * (1 - r / 100);
    const savedPerMonth = startMembers * (churnRate - newRate);
    return {
      reductionPercent: r,
      churnRate: newRate,
      lifetimeMonths: newRate > 0 ? 1 / newRate : null,
      membersSavedPerMonth: savedPerMonth,
      revenueSavedPerYear: fromPaise(toPaise(savedPerMonth * monthlyFee * 12)),
    };
  });
}
