// Shared money helpers. All calculators work in whole paise internally so results never drift.

export function assertNonNegative(name, value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a number that is zero or more`);
  }
}

export function assertPercent(name, value, { max = 100 } = {}) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > max) {
    throw new RangeError(`${name} must be between 0 and ${max}`);
  }
}

export function toPaise(rupees) {
  return Math.round(rupees * 100);
}

export function fromPaise(paise) {
  return paise / 100;
}

// Round a rupee amount to the nearest step (for tidy prices such as 10 or 50). Step 0 means "paise only".
export function roundToStep(rupees, step) {
  assertNonNegative("rounding step", step);
  if (step === 0) return fromPaise(toPaise(rupees));
  return Math.round(rupees / step) * step;
}

export function sum(list) {
  return list.reduce((t, v) => t + v, 0);
}
