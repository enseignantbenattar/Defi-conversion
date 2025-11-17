
import { Unit } from '../types';
import type { Question } from '../types';


const factors: Record<Unit, number> = {
  [Unit.KM]: 1000,
  [Unit.HM]: 100,
  [Unit.DAM]: 10,
  [Unit.M]: 1,
  [Unit.DM]: 0.1,
  [Unit.CM]: 0.01,
  [Unit.MM]: 0.001,
};

const allUnits = Object.values(Unit);

export function convert(value: number, from: Unit, to: Unit): number {
  if (!from || !to || value === undefined) return 0;
  const valueInMeters = value * factors[from];
  const result = valueInMeters / factors[to];
  
  // Round to a reasonable number of decimal places to avoid floating point issues
  return parseFloat(result.toPrecision(10));
}

export function generateQuestion(allowedUnits?: Unit[]): Question {
  const units = (allowedUnits && allowedUnits.length >= 2) ? allowedUnits : allUnits;
  let fromUnit: Unit;
  let toUnit: Unit;

  do {
    fromUnit = units[Math.floor(Math.random() * units.length)];
    toUnit = units[Math.floor(Math.random() * units.length)];
  } while (fromUnit === toUnit);

  const value = parseFloat((Math.random() * 200 + 1).toFixed(Math.random() > 0.5 ? 2 : 0));

  return { value, fromUnit, toUnit };
}
