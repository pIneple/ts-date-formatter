import type { PadStart, UpTo } from "./utils";

export type Digit = UpTo<10>;

export type MaxSize = 64;

type LegalLength = UpTo<MaxSize> | MaxSize;

// Tests for this can be found in `math/utils.ts`
export type Number<T extends any[]> = [T["length"]] extends [LegalLength]
  ? PadStart<T, MaxSize>
  : never;
