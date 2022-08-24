import { Equal, Expect } from "../test";
import { ToDigit } from "./constants";
import { Number } from "./number";
import { Split } from "./utils";

type _StringNumber<
  T extends any[],
  R extends string = ""
> = T["length"] extends 0
  ? R
  : T extends [infer U, ...infer Tail]
  ? U extends number
    ? R extends ""
      ? U extends 0
        ? _StringNumber<Tail, R>
        : _StringNumber<Tail, `${U}`>
      : _StringNumber<Tail, `${R}${U}`>
    : never
  : never;

export type StringNumber<T extends any[]> = _StringNumber<T>;

type StringNumberCases = [Expect<Equal<StringNumber<Number<[1, 0]>>, "10">>];

type _ToNumber<T extends any[], R extends any[] = []> = T extends [
  infer U,
  ...infer Tail
]
  ? U extends keyof ToDigit
    ? _ToNumber<Tail, [...R, ToDigit[U]]>
    : never
  : R;

export type ToNumber<T extends number> = Number<_ToNumber<Split<T>>>;

type ToNumberCases = [Expect<Equal<ToNumber<10>, Number<[1, 0]>>>];
