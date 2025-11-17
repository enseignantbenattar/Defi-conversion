
export enum Unit {
  KM = 'km',
  HM = 'hm',
  DAM = 'dam',
  M = 'm',
  DM = 'dm',
  CM = 'cm',
  MM = 'mm',
}

export interface Question {
  value: number;
  fromUnit: Unit;
  toUnit: Unit;
}
   