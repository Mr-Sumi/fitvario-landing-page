export interface SetupCostResult {
  oneTime: number;
  workingCapital: number;
  contingency: number;
  total: number;
  perSqFt: number | null;
}
export function setupCost(input: {
  items: { name: string; amount: number }[];
  monthlyRunningCost?: number;
  workingCapitalMonths?: number;
  contingencyPercent?: number;
  areaSqFt?: number;
}): SetupCostResult;
