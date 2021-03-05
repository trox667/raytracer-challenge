import { isOk, isEqual as isFloatEqual, unwrap } from '../util'
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
  tuple,
  mulScalar as tupleScalarMul,
  divScalar as tupleScalarDiv,
  magnitude,
  normalize,
  dot,
  cross,
  color,
  mulScalar,
  hadamardProduct,
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

  it('Multiplying a tuple by a scalar', () => {
    const a = tuple(1, -2, 3, -4)
    const t = tuple(3.5, -7, 10.5, -14)
    const r = tupleScalarMul(a, 3.5)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Multiplying a tuple by a fraction', () => {
    const a = tuple(1, -2, 3, -4)
    const t = tuple(0.5, -1, 1.5, -2)
    const r = tupleScalarMul(a, 0.5)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Dividing a tuple by a scalar', () => {
    const a = tuple(1, -2, 3, -4)
    const t = tuple(0.5, -1, 1.5, -2)
    const r = tupleScalarDiv(a, 2)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Computing the magnitude of vector(1,0,0)', () => {
    const v = vector(1, 0, 0)
    const t = 1
    const r = magnitude(v)
    expect(isOk(r)).toBeTruthy()
    expect(isFloatEqual(r as number, t)).toBeTruthy()
  })

  it('Computing the magnitude of vector(0,1,0)', () => {
    const v = vector(0, 1, 0)
    const t = 1
    const r = magnitude(v)
    expect(isOk(r)).toBeTruthy()
    expect(isFloatEqual(r as number, t)).toBeTruthy()
  })

  it('Computing the magnitude of vector(0,0,1)', () => {
    const v = vector(0, 0, 1)
    const t = 1
    const r = magnitude(v)
    expect(isOk(r)).toBeTruthy()
    expect(isFloatEqual(r as number, t)).toBeTruthy()
  })

  it('Computing the magnitude of vector(1,2,3)', () => {
    const v = vector(1, 2, 3)
    const t = Math.sqrt(14)
    const r = magnitude(v)
    expect(isOk(r)).toBeTruthy()
    expect(isFloatEqual(r as number, t)).toBeTruthy()
  })

  it('Computing the magnitude of vector(-1,-2,-3)', () => {
    const v = vector(-1, -2, -3)
    const t = Math.sqrt(14)
    const r = magnitude(v)
    expect(isOk(r)).toBeTruthy()
    expect(isFloatEqual(r as number, t)).toBeTruthy()
  })

  it('Normalizing vector(4,0,0) gives (1,0,0)', () => {
    const v = vector(4, 0, 0)
    const t = vector(1, 0, 0)
    const r = normalize(v)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('Normalizing vector(1,2,3)', () => {
    const v = vector(1, 2, 3)
    const t = vector(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14))
    const r = normalize(v)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(r as Tuple, t)).toBeTruthy()
  })

  it('The magnitude of a normalized vector', () => {
    const v = vector(1, 2, 3)
    const t = 1
    const r = normalize(v)
    expect(isOk(r)).toBeTruthy()
    const m = magnitude(r as Tuple)
    expect(isOk(m)).toBeTruthy()
    expect(isFloatEqual(m as number, t)).toBeTruthy()
  })

  it('The dot product of two tuples', () => {
    const a = vector(1, 2, 3)
    const b = vector(2, 3, 4)
    const t = 20
    const r = dot(a, b)
    expect(isOk(r)).toBeTruthy()
    expect(isFloatEqual(r as number, t)).toBeTruthy()
  })

  it('The cross product of two vectors', () => {
    const a = vector(1, 2, 3)
    const b = vector(2, 3, 4)
    const t1 = vector(-1, 2, -1)
    const t2 = vector(1, -2, 1)
    const r1 = cross(a, b)
    const r2 = cross(b, a)
    expect(isOk(r1)).toBeTruthy()
    expect(isTupleEqual(r1 as Tuple, t1)).toBeTruthy()
    expect(isOk(r2)).toBeTruthy()
    expect(isTupleEqual(r2 as Tuple, t2)).toBeTruthy()
  })

  it('Colors are (red, green, blue) tuples', () => {
    const c = color(-0.5, 0.4, 1.7)
    expect(isFloatEqual(c[0], -0.5)).toBeTruthy()
    expect(isFloatEqual(c[1], 0.4)).toBeTruthy()
    expect(isFloatEqual(c[2], 1.7)).toBeTruthy()
  })

  it('Adding colors', () => {
    const c1 = color(0.9, 0.6, 0.75)
    const c2 = color(0.7, 0.1, 0.25)
    const t = color(1.6, 0.7, 1.0)
    const r = tupleAdd(c1, c2)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(t, unwrap(r))).toBeTruthy()
  })

  it('Subtracting colors', () => {
    const c1 = color(0.9, 0.6, 0.75)
    const c2 = color(0.7, 0.1, 0.25)
    const t = color(0.2, 0.5, 0.5)
    const r = tupleSub(c1, c2)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(t, unwrap(r))).toBeTruthy()
  })

  it('Multiplying a color by a scalar', () => {
    const c = color(0.2, 0.3, 0.4)
    const t = color(0.4, 0.6, 0.8)
    const r = mulScalar(c, 2)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(t, unwrap(r))).toBeTruthy()
  })

  it('Multiplying colors', () => {
    const c1 = color(1, 0.2, 0.4)
    const c2 = color(0.9, 1, 0.1)
    const t = color(0.9, 0.2, 0.04)
    const r = hadamardProduct(c1, c2)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(t, unwrap(r))).toBeTruthy()
  })
})
