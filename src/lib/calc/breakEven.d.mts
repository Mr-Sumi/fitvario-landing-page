export interface SensitivityRow {
  deltaPercent: number;
  netFee: number;
  breakEvenMembers: number | null;
  profitAtMembersNow: number;
}
export interface BreakEvenResult {
  reachable: boolean;
  fixed: number;
  netFee: number;
  contribution: number;
  breakEvenMembers: number | null;
  profitAtMembersNow: number;
  sensitivity: SensitivityRow[];
}
export function breakEven(input: {
  fixedCosts: number[];
  feePerMember: number;
  feeIncludesGst?: boolean;
  gstRatePercent?: number;
  variableCostPerMember?: number;
  membersNow?: number;
}): BreakEvenResult;
