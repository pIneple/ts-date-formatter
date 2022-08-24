import type { ParseToDate } from "./parse";

type KnownSymbols = "Y" | "M" | "D";

interface Date {
  year: string;
  month: string;
  day: string;
}

interface KnownKeys extends Record<KnownSymbols, keyof Date> {
  Y: "year";
  M: "month";
  D: "day";
}

type _FormatDate<
  T extends Date,
  F extends string,
  R extends string = ""
> = F extends `${infer U}${infer Tail}`
  ? U extends KnownSymbols
    ? _FormatDate<T, Tail, `${R}${T[KnownKeys[U]]}`>
    : _FormatDate<T, Tail, `${R}${U}`>
  : R;

type FormatDate<T extends number, F extends string> = _FormatDate<
  ParseToDate<T>,
  F
>;

export declare function format<T extends number, F extends string>(
  date: T,
  format: F
): FormatDate<T, F>;
