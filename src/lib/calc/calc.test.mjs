// Run: node --test src/lib/calc/
import { test } from "node:test";
import assert from "node:assert/strict";
import { splitGst } from "./gst.mjs";
import { breakEven } from "./breakEven.mjs";
import { costPerMember, priceCostPlus, priceTargetMargin, planLadder } from "./pricing.mjs";
import { churn, churnScenarios } from "./churn.mjs";
import { revenueProjection } from "./revenue.mjs";
import { setupCost } from "./startup.mjs";
import { invoiceTotals } from "./invoice.mjs";
import { roundToStep } from "./money.mjs";

// ---- GST -------------------------------------------------------------------
test("gst exclusive: tax added on top", () => {
  const r = splitGst({ amount: 1000, ratePercent: 18, mode: "exclusive" });
  assert.deepEqual([r.base, r.tax, r.total], [1000, 180, 1180]);
});

test("gst inclusive: tax taken out of the total", () => {
  const r = splitGst({ amount: 1180, ratePercent: 18, mode: "inclusive" });
  assert.deepEqual([r.base, r.tax, r.total], [1000, 180, 1180]);
});

test("gst intra-state splits into CGST and SGST that add up exactly", () => {
  const r = splitGst({ amount: 99.99, ratePercent: 18, mode: "exclusive", supply: "intra" });
  assert.equal(r.tax, 18);
  assert.equal(Math.round((r.cgst + r.sgst) * 100), Math.round(r.tax * 100));
  assert.equal(r.igst, 0);
});

test("gst odd paisa goes to SGST, never lost", () => {
  const r = splitGst({ amount: 0.05, ratePercent: 18, mode: "exclusive" });
  assert.equal(Math.round((r.cgst + r.sgst) * 100), Math.round(r.tax * 100));
});

test("gst inter-state uses IGST only", () => {
  const r = splitGst({ amount: 1000, ratePercent: 18, supply: "inter" });
  assert.deepEqual([r.cgst, r.sgst, r.igst], [0, 0, 180]);
});

test("gst rounds to paise", () => {
  const r = splitGst({ amount: 333.33, ratePercent: 18, mode: "exclusive" });
  assert.equal(r.tax, 60);
  assert.equal(r.total, 393.33);
});

test("gst zero amount and zero rate", () => {
  assert.equal(splitGst({ amount: 0 }).total, 0);
  assert.equal(splitGst({ amount: 500, ratePercent: 0 }).total, 500);
});

test("gst rejects negatives and a rate above 100", () => {
  assert.throws(() => splitGst({ amount: -1 }), RangeError);
  assert.throws(() => splitGst({ amount: 1, ratePercent: -5 }), RangeError);
  assert.throws(() => splitGst({ amount: 1, ratePercent: 101 }), RangeError);
  assert.throws(() => splitGst({ amount: Number.NaN }), RangeError);
});

// ---- break-even ------------------------------------------------------------
test("break-even members rounds up", () => {
  const r = breakEven({ fixedCosts: [50000, 30000, 20000], feePerMember: 1500 });
  assert.equal(r.fixed, 100000);
  assert.equal(r.breakEvenMembers, 67); // 100000 / 1500 = 66.67
});

test("break-even takes GST out of an inclusive fee", () => {
  const r = breakEven({ fixedCosts: [11800], feePerMember: 1180, feeIncludesGst: true, gstRatePercent: 18 });
  assert.equal(r.netFee, 1000);
  assert.equal(r.breakEvenMembers, 12); // 11800 / 1000 = 11.8
});

test("break-even profit at current members", () => {
  const r = breakEven({ fixedCosts: [60000], feePerMember: 1000, membersNow: 80 });
  assert.equal(r.profitAtMembersNow, 20000);
});

test("break-even with variable cost per member", () => {
  const r = breakEven({ fixedCosts: [9000], feePerMember: 1000, variableCostPerMember: 100 });
  assert.equal(r.contribution, 900);
  assert.equal(r.breakEvenMembers, 10);
});

test("break-even is unreachable when each member loses money", () => {
  const r = breakEven({ fixedCosts: [10000], feePerMember: 100, variableCostPerMember: 200 });
  assert.equal(r.reachable, false);
  assert.equal(r.breakEvenMembers, null);
});

test("break-even zero fixed costs", () => {
  assert.equal(breakEven({ fixedCosts: [0], feePerMember: 1000 }).breakEvenMembers, 0);
});

test("break-even sensitivity is monotonic in the fee", () => {
  const { sensitivity } = breakEven({ fixedCosts: [100000], feePerMember: 1000 });
  const members = sensitivity.map((s) => s.breakEvenMembers);
  assert.deepEqual(members, [...members].sort((a, b) => b - a));
});

test("break-even rejects negatives", () => {
  assert.throws(() => breakEven({ fixedCosts: [-1], feePerMember: 100 }), RangeError);
  assert.throws(() => breakEven({ fixedCosts: [1], feePerMember: -100 }), RangeError);
});

// ---- pricing ---------------------------------------------------------------
test("cost per member spreads fixed cost", () => {
  assert.equal(costPerMember({ fixedMonthly: 100000, variablePerMember: 50, members: 200 }), 550);
});

test("cost per member needs at least one member", () => {
  assert.throws(() => costPerMember({ fixedMonthly: 1, members: 0 }), RangeError);
});

test("cost-plus markup", () => {
  assert.equal(priceCostPlus({ cost: 500, markupPercent: 40 }), 700);
});

test("target margin is a share of the price, not of cost", () => {
  assert.equal(priceTargetMargin({ cost: 750, marginPercent: 25 }), 1000);
  assert.throws(() => priceTargetMargin({ cost: 1, marginPercent: 100 }), RangeError);
});

test("plan ladder applies discount and rounds to a step", () => {
  const [m1, m3, m12] = planLadder({
    monthlyPrice: 1000,
    plans: [
      { months: 1, discountPercent: 0 },
      { months: 3, discountPercent: 10 },
      { months: 12, discountPercent: 25 },
    ],
    roundTo: 50,
  });
  assert.equal(m1.price, 1000);
  assert.equal(m3.price, 2700);
  assert.equal(m12.price, 9000);
  assert.equal(m12.saving, 3000);
  assert.equal(m12.perMonth, 750);
});

test("plan ladder rejects bad plans", () => {
  assert.throws(() => planLadder({ monthlyPrice: 1000, plans: [{ months: 0, discountPercent: 0 }] }), RangeError);
  assert.throws(() => planLadder({ monthlyPrice: 1000, plans: [{ months: 3, discountPercent: 120 }] }), RangeError);
});

test("roundToStep", () => {
  assert.equal(roundToStep(2673, 50), 2650);
  assert.equal(roundToStep(2675, 50), 2700);
  assert.equal(roundToStep(10.005, 0), 10.01);
});

// ---- churn -----------------------------------------------------------------
test("churn rate, retention and lifetime", () => {
  const r = churn({ startMembers: 200, lostMembers: 20, newMembers: 30, monthlyFee: 1000 });
  assert.equal(r.churnRate, 0.1);
  assert.equal(r.retentionRate, 0.9);
  assert.equal(r.lifetimeMonths, 10);
  assert.equal(r.lifetimeValue, 10000);
  assert.equal(r.revenueLostPerMonth, 20000);
  assert.equal(r.closingMembers, 210);
});

test("churn zero losses has no finite lifetime", () => {
  const r = churn({ startMembers: 100, lostMembers: 0, monthlyFee: 1000 });
  assert.equal(r.lifetimeMonths, null);
  assert.equal(r.lifetimeValue, null);
});

test("churn applies gross margin to lifetime value", () => {
  const r = churn({ startMembers: 100, lostMembers: 10, monthlyFee: 1000, grossMarginPercent: 50 });
  assert.equal(r.lifetimeValue, 5000);
});

test("churn rejects impossible inputs", () => {
  assert.throws(() => churn({ startMembers: 0, lostMembers: 0, monthlyFee: 1 }), RangeError);
  assert.throws(() => churn({ startMembers: 10, lostMembers: 11, monthlyFee: 1 }), RangeError);
  assert.throws(() => churn({ startMembers: 10, lostMembers: -1, monthlyFee: 1 }), RangeError);
});

test("churn scenarios: a 20% relative cut on 10% churn gives 8%", () => {
  const [s] = churnScenarios({ startMembers: 200, churnRate: 0.1, monthlyFee: 1000, reductionsPercent: [20] });
  assert.ok(Math.abs(s.churnRate - 0.08) < 1e-12);
  assert.ok(Math.abs(s.membersSavedPerMonth - 4) < 1e-9);
  assert.equal(s.revenueSavedPerYear, 48000);
});

// ---- revenue ---------------------------------------------------------------
test("revenue projection with no growth is flat", () => {
  const r = revenueProjection({ plans: [{ members: 100, monthlyFee: 1000 }], ptClients: 10, ptMonthlyFee: 3000, otherMonthly: 5000 });
  assert.equal(r.months.length, 12);
  assert.equal(r.monthOne, 135000);
  assert.equal(r.yearTotal, 135000 * 12);
});

test("revenue projection grows members, not other income", () => {
  const r = revenueProjection({ plans: [{ members: 100, monthlyFee: 1000 }], otherMonthly: 1000, monthlyGrowthPercent: 10 });
  assert.equal(r.monthOne, 101000);
  assert.equal(r.months[1].membership, 110000);
  assert.equal(r.months[1].other, 1000);
});

test("revenue projection allows decline but not -100", () => {
  assert.doesNotThrow(() => revenueProjection({ plans: [{ members: 10, monthlyFee: 100 }], monthlyGrowthPercent: -5 }));
  assert.throws(() => revenueProjection({ plans: [], monthlyGrowthPercent: -100 }), RangeError);
  assert.throws(() => revenueProjection({ plans: [{ members: -1, monthlyFee: 100 }] }), RangeError);
});

test("revenue projection with nothing is zero", () => {
  assert.equal(revenueProjection({ plans: [] }).yearTotal, 0);
});

// ---- setup cost ------------------------------------------------------------
test("setup cost adds working capital and contingency", () => {
  const r = setupCost({
    items: [{ name: "Equipment", amount: 500000 }, { name: "Interiors", amount: 300000 }],
    monthlyRunningCost: 100000,
    workingCapitalMonths: 3,
    contingencyPercent: 10,
    areaSqFt: 2000,
  });
  assert.equal(r.oneTime, 800000);
  assert.equal(r.workingCapital, 300000);
  assert.equal(r.contingency, 110000);
  assert.equal(r.total, 1210000);
  assert.equal(r.perSqFt, 605);
});

test("setup cost without area has no per-sq-ft figure; negatives rejected", () => {
  assert.equal(setupCost({ items: [] }).perSqFt, null);
  assert.throws(() => setupCost({ items: [{ name: "x", amount: -5 }] }), RangeError);
});

// ---- invoice ---------------------------------------------------------------
test("invoice: discount comes off before tax", () => {
  const r = invoiceTotals({ amount: 3000, discount: 500, gstEnabled: true, gstRatePercent: 18, mode: "exclusive" });
  assert.equal(r.taxable, 2500);
  assert.equal(r.tax, 450);
  assert.equal(r.total, 2950);
  assert.equal(r.cgst + r.sgst, 450);
});

test("invoice: no GST means no tax lines", () => {
  const r = invoiceTotals({ amount: 3000, discount: 0, gstEnabled: false });
  assert.deepEqual([r.tax, r.total], [0, 3000]);
});

test("invoice: inclusive amount keeps the total as entered", () => {
  const r = invoiceTotals({ amount: 1180, gstEnabled: true, mode: "inclusive" });
  assert.equal(r.total, 1180);
  assert.equal(r.tax, 180);
});

test("invoice rejects a discount larger than the amount", () => {
  assert.throws(() => invoiceTotals({ amount: 100, discount: 200 }), RangeError);
});
