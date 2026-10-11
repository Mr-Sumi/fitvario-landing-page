// General-information diet chart templates. No calorie numbers, no medical claims.
// This content must be reviewed by a qualified nutritionist before the page is published.

export type DietType = "veg" | "egg" | "nonveg";
export type Goal = "fatloss" | "muscle" | "maintain";

export const DIET_TYPES: { value: DietType; label: string }[] = [
  { value: "veg", label: "Vegetarian" },
  { value: "egg", label: "Eggetarian" },
  { value: "nonveg", label: "Non-vegetarian" },
];

export const GOALS: { value: Goal; label: string; note: string }[] = [
  { value: "fatloss", label: "Fat loss", note: "Lighter portions of rice and roti, more vegetables and protein, less fried and sweet food." },
  { value: "muscle", label: "Muscle gain", note: "Larger portions of roti and rice, a protein source in every meal, and a snack before and after training." },
  { value: "maintain", label: "Maintenance", note: "Balanced plate with a protein source, vegetables, grains and fruit across the day." },
];

export interface Meal {
  slot: string;
  options: string[];
}

const proteinAtMeal: Record<DietType, { breakfast: string[]; lunch: string[]; dinner: string[]; snack: string[] }> = {
  veg: {
    breakfast: ["Moong dal cheela with mint chutney", "Besan chilla with vegetables", "Paneer bhurji with one roti"],
    lunch: ["Dal and paneer sabzi", "Rajma or chole with salad", "Soya chunk curry"],
    dinner: ["Paneer tikka with salad", "Dal khichdi with curd", "Vegetable and tofu stir fry"],
    snack: ["Roasted chana", "Sprouts chaat", "Curd with fruit"],
  },
  egg: {
    breakfast: ["Egg bhurji with one roti", "Boiled eggs with fruit", "Vegetable omelette with toast"],
    lunch: ["Egg curry with roti and salad", "Dal with a boiled egg and vegetables", "Paneer sabzi with salad"],
    dinner: ["Egg bhurji with sabzi and roti", "Dal khichdi with curd", "Vegetable omelette with salad"],
    snack: ["Boiled egg", "Roasted chana", "Sprouts chaat"],
  },
  nonveg: {
    breakfast: ["Egg bhurji with one roti", "Boiled eggs with fruit", "Chicken sandwich on brown bread"],
    lunch: ["Chicken curry with roti and salad", "Fish curry with rice and vegetables", "Dal with grilled chicken and salad"],
    dinner: ["Grilled or tandoori chicken with sabzi", "Fish tikka with salad", "Chicken and vegetable soup with one roti"],
    snack: ["Boiled eggs", "Roasted chana", "Curd with fruit"],
  },
};

export function mealPlan(diet: DietType, goal: Goal): Meal[] {
  const p = proteinAtMeal[diet];
  const carbNote =
    goal === "fatloss" ? "one roti or a small bowl of rice" : goal === "muscle" ? "two to three rotis or a full bowl of rice" : "two rotis or a medium bowl of rice";
  const preTraining =
    goal === "muscle"
      ? ["Banana with a spoon of peanut butter", "A glass of milk with a handful of dates"]
      : goal === "fatloss"
        ? ["A fruit such as apple or papaya", "Black coffee or green tea without sugar"]
        : ["A banana", "A glass of buttermilk"];

  return [
    { slot: "On waking", options: ["Warm water with lemon, or jeera water", "A few soaked almonds"] },
    { slot: "Breakfast", options: p.breakfast },
    { slot: "Mid-morning", options: ["A seasonal fruit", "Coconut water or buttermilk", ...(goal === "muscle" ? ["A glass of milk"] : [])] },
    { slot: "Lunch", options: p.lunch.map((x) => `${x}, with ${carbNote}`) },
    { slot: "Before training", options: preTraining },
    { slot: "Evening snack", options: p.snack },
    {
      slot: "Dinner",
      options: p.dinner.map((x) => (goal === "fatloss" ? `${x} (keep it lighter, fewer grains)` : x)),
    },
    { slot: "Before bed (optional)", options: ["Warm milk with a pinch of turmeric", ...(goal === "fatloss" ? [] : ["A small bowl of curd"])] },
  ];
}

export function planAsText(diet: DietType, goal: Goal): string {
  const d = DIET_TYPES.find((x) => x.value === diet)?.label ?? "";
  const g = GOALS.find((x) => x.value === goal)?.label ?? "";
  const lines = [`${d} diet chart, ${g} (general template, not personal advice)`, ""];
  for (const m of mealPlan(diet, goal)) {
    lines.push(`${m.slot}:`);
    for (const o of m.options) lines.push(`  - ${o}`);
  }
  lines.push("", "Drink water through the day. Adjust portions to the person. See a qualified dietitian for personal advice.");
  return lines.join("\n");
}
