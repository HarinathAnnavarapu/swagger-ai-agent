import { Operation } from "./Operation";

export interface NormalizedSpec {
  id: string;
  title?: string;
  version?: string;
  servers?: string[];
  operations: Operation[];
  tags?: { [tag: string]: number };
  // raw original spec can be stored for debugging (optional)
  raw?: any;
}
