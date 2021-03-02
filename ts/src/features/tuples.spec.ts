import {
  isPoint,
  isVector,
  point,
  Tuple,
  vector,
  isEqual as isTupleEqual,
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
})
