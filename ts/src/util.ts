export const EPSILON = 0.0001

export function isEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < EPSILON
}

export function zip<T, U>(a: Array<T>, b: Array<U>): Array<[T, U]> {
  return Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]])
}

export type Result<T> = T | Error

export function isOk<T>(r: Result<T>): boolean {
  return !(r instanceof Error)
}

export function isErr<T>(r: Result<T>): boolean {
  return !isOk(r)
}

export function unwrap<T>(r: Result<T>): T {
    if (isOk(r)) {
        return r as T
    } else {
        throw r as Error
    }
}
