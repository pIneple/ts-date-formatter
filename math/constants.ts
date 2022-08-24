import type { Number } from "./number";

export interface ToDigit {
  "0": 0;
  "1": 1;
  "2": 2;
  "3": 3;
  "4": 4;
  "5": 5;
  "6": 6;
  "7": 7;
  "8": 8;
  "9": 9;
}

export type ZERO = Number<[0]>;
export type ONE = Number<[1]>;
export type TWO = Number<[2]>;

export type TEN = Number<[1, 0]>;
export type TWENTY = Number<[2, 0]>;

export type HUNDRED = Number<[1, 0, 0]>;
export type TWO_HUNDRED = Number<[2, 0, 0]>;

export type THOUSAND = Number<[1, 0, 0, 0]>;
export type TWO_THOUSAND = Number<[2, 0, 0, 0]>;

export type TEN_THOUSAND = Number<[1, 0, 0, 0, 0]>;
export type TWENTY_THOUSAND = Number<[2, 0, 0, 0, 0]>;

export type HUNDRED_THOUSAND = Number<[1, 0, 0, 0, 0, 0]>;
export type TWO_HUNDRED_THOUSAND = Number<[2, 0, 0, 0, 0, 0]>;

export type MILLION = Number<[1, 0, 0, 0, 0, 0, 0]>;
export type TWO_MILLION = Number<[2, 0, 0, 0, 0, 0, 0]>;
