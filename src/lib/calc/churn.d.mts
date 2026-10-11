export interface ChurnResult {
  churnRate: number;
  retentionRate: number;
  yearRetention: number;
  lifetimeMonths: number | null;
  lifetimeValue: number | null;
  revenueLostPerMonth: number;
  closingMembers: number;
}
export interface ChurnScenario {
  reductionPercent: number;
  churnRate: number;
  lifetimeMonths: number | null;
  membersSavedPerMonth: number;
  revenueSavedPerYear: number;
}
export function churn(input: {
  startMembers: number;
  lostMembers: number;
  newMembers?: number;
  monthlyFee: number;
  grossMarginPercent?: number;
}): ChurnResult;
export function churnScenarios(input: {
  startMembers: number;
  churnRate: number;
  monthlyFee: number;
  reductionsPercent?: number[];
}): ChurnScenario[];
