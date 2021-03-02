import { isOk } from '../util'
import {
  isPoint,
  isVector,
  point,
  Tuple,
  vector,
  isEqual as isTupleEqual,
  add as tupleAdd,
  sub as tupleSub,
  negate,
} from './tuples'

describe('tuples', () => {
  it('A tuple with w=1.0 is a point', () => {
    const a: Tuple = [4.3, -4.2, 3.1, 1.0]
    const [x, y, z, w] = a
    expect(x).toBeCloseTo(4.3, 5)
    expect(y).toBeCloseTo(-4.2, 5)
    expect(z).toBeCloseTo(3.1, 5)
    expect(w).toBeCloseTo(1.0, 5)
    expect(isPoint(a)).toBeTruthy()
    expect(isVector(a)).toBeFalsy()
  })

  it('A tuple with w=0 is a vector', () => {
    const a: Tuple = [4.3, -4.2, 3.1, 0.0]
    const [x, y, z, w] = a
    expect(x).toBeCloseTo(4.3, 5)
    expect(y).toBeCloseTo(-4.2, 5)
    expect(z).toBeCloseTo(3.1, 5)
    expect(w).toBeCloseTo(0.0, 5)
    expect(isPoint(a)).toBeFalsy()
    expect(isVector(a)).toBeTruthy()
  })

  it('point() creates tuples with w=1', () => {
    const p = point(4, -4, 3)
    const t: Tuple = [4, -4, 3, 1.0]
    expect(isTupleEqual(p, t)).toBeTruthy()
  })

  it('vector() creates tuples with w=0', () => {
    const v = vector(4, -4, 3)
    const t: Tuple = [4, -4, 3, 0.0]
    expect(isTupleEqual(v, t)).toBeTruthy()
  })

  it('Adding two tuples', () => {
    const a1: Tuple = [3, -2, 5, 1]
    const a2: Tuple = [-2, 3, 1, 0]
    const t: Tuple = [1, 1, 6, 1]
    const r = tupleAdd(a1, a2)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Subtracting two points', () => {
    const a1 = point(3, 2, 1)
    const a2 = point(5, 6, 7)
    const t = vector(-2, -4, -6)
    const r = tupleSub(a1, a2)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Subtracting a vector from a point', () => {
    const p = point(3, 2, 1)
    const v = vector(5, 6, 7)
    const t = point(-2, -4, -6)
    const r = tupleSub(p, v)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Subtracting two vectors', () => {
    const v1 = vector(3, 2, 1)
    const v2 = vector(5, 6, 7)
    const t = vector(-2, -4, -6)
    const r = tupleSub(v1, v2)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Subtracting a vector from the zero vector', () => {
    const zero = vector(0, 0, 0)
    const v = vector(1, -2, 3)
    const t = vector(-1, 2, -3)
    const r = tupleSub(zero, v)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Negating a tuple', () => {
    const a: Tuple = [1, -2, 3, -4]
    const t: Tuple = [-1, 2, -3, 4]
    const r = negate(a)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })
})
