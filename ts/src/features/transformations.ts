import { Matrix, identity4x4, transform4 } from "./matrices";
import { point, compare as compareTuples,  } from "./tuples";

export const translation = (x: number, y: number, z: number): Matrix => {
  let m = identity4x4()
  m.m[3] = x
  m.m[7] = y
  m.m[11] = z
  return m
}