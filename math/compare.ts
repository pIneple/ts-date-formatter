import { Number } from "./number";
import { Equal, Expect } from "../test";

type _MakeCompareMap<
  L extends number,
  I extends any[],
  R extends any[] = [],
  Flag = 1
> = R["length"] extends L
  ? R
  : R["length"] extends I["length"]
  ? _MakeCompareMap<L, I, [...R, 0], -1>
  : _MakeCompareMap<L, I, [...R, Flag], Flag>;

type MakeCompareMap<
  L extends number = 10,
  R extends any[] = []
> = R["length"] extends L
  ? R
  : MakeCompareMap<L, [...R, _MakeCompareMap<L, R>]>;

type CompareMap = MakeCompareMap;

type _Compare<
  A extends any[],
  B extends any[],
  R extends any[] = [],
  ValA = A[R["length"]],
  ValB = B[R["length"]]
> = [undefined] extends [ValA | ValB]
  ? 0
  : ValA extends ValB
  ? _Compare<A, B, [...R, never]>
  : ValA extends number
  ? ValB extends number
    ? CompareMap[ValA][ValB]
    : never
  : never;

export type Compare<A extends any[], B extends any[]> = _Compare<A, B>;

type CompareCases = [
  Expect<Equal<Compare<Number<[1]>, Number<[0]>>, 1>>,
  Expect<Equal<Compare<Number<[0]>, Number<[0]>>, 0>>,
  Expect<Equal<Compare<Number<[0]>, Number<[1]>>, -1>>
];
