export interface RevenueMonth {
  month: number;
  membership: number;
  personalTraining: number;
  other: number;
  total: number;
}
export interface RevenueResult {
  months: RevenueMonth[];
  yearTotal: number;
  monthOne: number;
  monthTwelve: number;
}
export function revenueProjection(input: {
  plans: { members: number; monthlyFee: number }[];
  ptClients?: number;
  ptMonthlyFee?: number;
  otherMonthly?: number;
  monthlyGrowthPercent?: number;
}): RevenueResult;
