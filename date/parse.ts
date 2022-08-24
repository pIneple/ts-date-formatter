import { Number, ToNumber, Compare, AddNumber, StringNumber } from "../math";
import type {
  DAY,
  MONTH,
  UNIX_DAY,
  UNIX_MONTH,
  UNIX_YEAR,
  YEAR,
} from "./constants";

type SubCount<
  A extends any[],
  Steps extends any[][],
  Curr extends any[] = Number<[0]>,
  R extends any[] = [],
  _Step = Steps[0],
  C = Compare<A, AddNumber<Curr, _Step>>
> = C extends -1
  ? Steps extends [infer U, ...infer Tail]
    ? Tail["length"] extends 0
      ? [...R, never]["length"]
      : Tail extends any[][]
      ? SubCount<A, Tail, Curr>
      : never
    : never
  : Steps["length"] extends 1
  ? SubCount<A, Steps, AddNumber<Curr, _Step>, [...R, never]>
  : SubCount<A, Steps, AddNumber<Curr, _Step>, R>;

type ParseYear<T extends any[]> = AddNumber<
  ToNumber<SubCount<T, [YEAR]>>,
  UNIX_YEAR
>;
type ParseMonth<T extends any[]> = AddNumber<
  ToNumber<SubCount<T, [YEAR, MONTH]>>,
  UNIX_MONTH
>;
type ParseDate<
  T extends any[],
  SC extends number = SubCount<T, [YEAR, MONTH, DAY]>
> = AddNumber<ToNumber<SC>, UNIX_DAY>;

type _ParseToDate<T extends number, TN extends any[] = ToNumber<T>> = {
  year: StringNumber<ParseYear<TN>>;
  month: StringNumber<ParseMonth<TN>>;
  day: StringNumber<ParseDate<TN>>;
};

export type ParseToDate<T extends number> = _ParseToDate<T>;
