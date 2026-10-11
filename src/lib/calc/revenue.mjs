import { assertNonNegative, toPaise, fromPaise } from "./money.mjs";

/**
 * 12-month revenue projection.
 * plans: [{ members, monthlyFee }] your plan mix. Personal training: ptClients x ptMonthlyFee.
 * otherMonthly: any other fixed monthly income (store, supplements...). Not scaled by growth.
 * monthlyGrowthPercent: net change in members and PT clients each month. May be negative, never -100 or lower.
 */
export function revenueProjection({ plans, ptClients = 0, ptMonthlyFee = 0, otherMonthly = 0, monthlyGrowthPercent = 0 }) {
  if (!Array.isArray(plans)) throw new RangeError("plans must be a list");
  plans.forEach((p, i) => {
    assertNonNegative(`plan ${i + 1} members`, p.members);
    assertNonNegative(`plan ${i + 1} fee`, p.monthlyFee);
  });
  assertNonNegative("PT clients", ptClients);
  assertNonNegative("PT fee", ptMonthlyFee);
  assertNonNegative("other monthly income", otherMonthly);
  if (typeof monthlyGrowthPercent !== "number" || !Number.isFinite(monthlyGrowthPercent) || monthlyGrowthPercent <= -100) {
    throw new RangeError("monthly growth must be above -100");
  }

  const membershipNow = plans.reduce((t, p) => t + p.members * p.monthlyFee, 0);
  const ptNow = ptClients * ptMonthlyFee;
  const growth = 1 + monthlyGrowthPercent / 100;

  const months = [];
  let totalP = 0;
  for (let m = 1; m <= 12; m++) {
    const factor = Math.pow(growth, m - 1); // month 1 is today's numbers
    const membership = toPaise(membershipNow * factor);
    const pt = toPaise(ptNow * factor);
    const other = toPaise(otherMonthly);
    const total = membership + pt + other;
    totalP += total;
    months.push({
      month: m,
      membership: fromPaise(membership),
      personalTraining: fromPaise(pt),
      other: fromPaise(other),
      total: fromPaise(total),
    });
  }
  return { months, yearTotal: fromPaise(totalP), monthOne: months[0].total, monthTwelve: months[11].total };
}
