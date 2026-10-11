export interface LadderRow {
  months: number;
  discountPercent: number;
  gross: number;
  price: number;
  perMonth: number;
  saving: number;
}
export function costPerMember(input: { fixedMonthly: number; variablePerMember?: number; members: number }): number;
export function priceCostPlus(input: { cost: number; markupPercent: number }): number;
export function priceTargetMargin(input: { cost: number; marginPercent: number }): number;
export function planLadder(input: {
  monthlyPrice: number;
  plans: { months: number; discountPercent: number }[];
  roundTo?: number;
}): LadderRow[];
