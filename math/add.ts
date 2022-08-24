import type { Expect, Equal } from "../test";
import type { Split } from "./utils";
import type {
  ZERO,
  ONE,
  TWO,
  TEN,
  TWENTY,
  HUNDRED,
  TWO_HUNDRED,
  THOUSAND,
  TWO_THOUSAND,
  TEN_THOUSAND,
  TWENTY_THOUSAND,
  MILLION,
  TWO_MILLION,
  ToDigit,
} from "./constants";

type _MakeAddDigit<
  L extends number,
  I extends any[],
  R extends any[] = []
> = R["length"] extends L
  ? R
  : _MakeAddDigit<
      L,
      I,
      [...R, [[...R, ...I]["length"], [...R, ...I, never]["length"]]]
    >;

type MakeAddDigitMap<
  L extends number = 10,
  R extends any[] = []
> = R["length"] extends L ? R : MakeAddDigitMap<L, [...R, _MakeAddDigit<L, R>]>;

type AddDigitMap = MakeAddDigitMap;

type AddDigit<A, B, C = 0> = A extends number
  ? B extends number
    ? C extends number
      ? AddDigitMap[A][B][C]
      : never
    : never
  : never;

type AddDigitCarry<A, B, C = 0> = Split<AddDigit<A, B, C>> extends [
  infer U,
  ...infer Tail
]
  ? Tail["length"] extends 0
    ? 0
    : U extends keyof ToDigit
    ? ToDigit[U]
    : never
  : never;

type AddDigitCarryCases = [
  Expect<Equal<AddDigitCarry<5, 5>, 1>>,
  Expect<Equal<AddDigitCarry<5, 4, 1>, 1>>,
  Expect<Equal<AddDigitCarry<1, 0, 0>, 0>>,
  Expect<Equal<AddDigitCarry<0, 0, 0>, 0>>
];

type _AddDigitBody<A, B, C = 0> = Split<AddDigit<A, B, C>> extends [
  infer U,
  ...infer Tail
]
  ? Tail["length"] extends 0
    ? U
    : Tail[0]
  : never;

type AddDigitBody<
  A,
  B,
  C = 0,
  Result = _AddDigitBody<A, B, C>
> = Result extends keyof ToDigit ? ToDigit[Result] : never;

type AddDigitBodyCases = [
  Expect<Equal<AddDigitBody<5, 5>, 0>>,
  Expect<Equal<AddDigitBody<5, 4, 1>, 0>>,
  Expect<Equal<AddDigitBody<1, 0, 0>, 1>>,
  Expect<Equal<AddDigitBody<0, 0, 0>, 0>>
];

export type AddNumber<A, B, C = 0, R extends any[] = []> = A extends [
  ...infer RestA,
  infer ValA
]
  ? B extends [...infer RestB, infer ValB]
    ? AddNumber<
        RestA,
        RestB,
        AddDigitCarry<ValA, ValB, C>,
        [AddDigitBody<ValA, ValB, C>, ...R]
      >
    : never
  : R;

type AddNumberCases = [
  Expect<Equal<AddNumber<ZERO, ZERO>, ZERO>>,
  Expect<Equal<AddNumber<ONE, ONE>, TWO>>,
  Expect<Equal<AddNumber<TEN, TEN>, TWENTY>>,
  Expect<Equal<AddNumber<HUNDRED, HUNDRED>, TWO_HUNDRED>>,
  Expect<Equal<AddNumber<THOUSAND, THOUSAND>, TWO_THOUSAND>>,
  Expect<Equal<AddNumber<TEN_THOUSAND, TEN_THOUSAND>, TWENTY_THOUSAND>>,
  Expect<Equal<AddNumber<MILLION, MILLION>, TWO_MILLION>>
];
