import { Equal, Expect } from "../test";

export type _UpTo<
  T extends number,
  R extends any[] = []
> = R["length"] extends T ? R[number] : _UpTo<T, [...R, R["length"]]>;

export type UpTo<T extends number> = _UpTo<T>;

type UpToCases = [Expect<Equal<UpTo<5>, 0 | 1 | 2 | 3 | 4>>];

export type PadStart<Value extends unknown[], Length extends number> = [
  Value["length"]
] extends [Length]
  ? Value
  : PadStart<[0, ...Value], Length>;

type _Split<
  D extends string,
  R extends any[] = []
> = D extends `${infer U}${infer Rest}` ? _Split<Rest, [...R, U]> : R;

export type Split<D extends number> = _Split<`${D}`>;

type SplitCases = [
  Expect<Equal<Split<10>, ["1", "0"]>>,
  Expect<
    Equal<Split<1234567890>, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]>
  >
];
