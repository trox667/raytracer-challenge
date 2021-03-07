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

export function wrap(line: string, length: number = 70): string[] {
  if (line.length > length) {
    const lines = []
    const words = line.split(' ')
    let currLine = words[0]
    for (let i = 1; i < words.length; i++) {
      if (currLine.length + 1 + words[i].length > length) {
        lines.push(currLine)
        currLine = words[i]
      } else {
        currLine = currLine + ' ' + words[i]
      }
      if (i == words.length - 1) {
        lines.push(currLine)
      }
    }
    return lines
  } else {
    return [line]
  }
}
