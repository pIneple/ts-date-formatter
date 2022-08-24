import type { ToNumber } from "../math";

export type YEAR = ToNumber<31556952000>;
export type MONTH = ToNumber<2629746000>;
export type DAY = ToNumber<86400000>;

export type UNIX_YEAR = ToNumber<1969>;
export type UNIX_MONTH = ToNumber<0>;
export type UNIX_DAY = ToNumber<1>;
