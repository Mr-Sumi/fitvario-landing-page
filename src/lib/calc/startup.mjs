import { assertNonNegative, assertPercent, toPaise, fromPaise } from "./money.mjs";

/**
 * One-time setup budget for a gym. items: [{ name, amount }] one-off costs.
 * Working capital is your monthly running cost times the number of months you want to be able to survive.
 */
export function setupCost({ items, monthlyRunningCost = 0, workingCapitalMonths = 0, contingencyPercent = 0, areaSqFt = 0 }) {
  if (!Array.isArray(items)) throw new RangeError("items must be a list");
  items.forEach((it, i) => assertNonNegative(`item ${i + 1}`, it.amount));
  assertNonNegative("monthly running cost", monthlyRunningCost);
  assertNonNegative("working capital months", workingCapitalMonths);
  assertPercent("contingency", contingencyPercent, { max: 100 });
  assertNonNegative("area", areaSqFt);

  const itemsP = items.reduce((t, it) => t + toPaise(it.amount), 0);
  const workingP = toPaise(monthlyRunningCost * workingCapitalMonths);
  const baseP = itemsP + workingP;
  const contingencyP = Math.round((baseP * contingencyPercent) / 100);
  const totalP = baseP + contingencyP;

  return {
    oneTime: fromPaise(itemsP),
    workingCapital: fromPaise(workingP),
    contingency: fromPaise(contingencyP),
    total: fromPaise(totalP),
    perSqFt: areaSqFt > 0 ? fromPaise(Math.round(totalP / areaSqFt)) : null,
  };
}
