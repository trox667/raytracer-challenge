import { scaling, translation } from './transformations'
import { point, isEqual as isTupleEqual, vector } from './tuples'
describe('Transformations', () => {
  it('Multiplying by a translation matrix', () => {
    const transform = translation(5, -3, 2)
    const p = point(-3, 4, 5)
    const r = point(2, 1, 7)
    expect(isTupleEqual(transform.mulVec(p), r)).toBeTruthy()
  })

  it('Multiplying by the inverse of a translation matrix', () => {
    const transform = translation(5, -3, 2)
    const inv = transform.inverse()
    const p = point(-3, 4, 5)
    const r = point(-8, 7, 3)
    expect(isTupleEqual(inv.mulVec(p), r)).toBeTruthy()
  })

  it('Translation does not affect vectors', () => {
    const transform = translation(5, -3, 2)
    const v = vector(-3, 4, 5)
    expect(isTupleEqual(transform.mulVec(v), v)).toBeTruthy()
  })

  it('A scaling matrix applied to a point', () => {
    const transform = scaling(2, 3, 4)
    const p = point(-4, 6, 8)
    const r = point(-8, 18, 32)
    expect(isTupleEqual(transform.mulVec(p), r)).toBeTruthy()
  })

  it('A scaling matrix applied to a vector', () => {
    const transform = scaling(2, 3, 4)
    const v = vector(-4, 6, 8)
    const r = vector(-8, 18, 32)
    expect(isTupleEqual(transform.mulVec(v), r)).toBeTruthy()
  })

  it('Multiplying by the inverse of a scaling matrix', () => {
    const transform = scaling(2, 3, 4)
    const inv = transform.inverse()
    const v = vector(-4, 6, 8)
    const r = vector(-2, 2, 2)
    expect(isTupleEqual(inv.mulVec(v), r)).toBeTruthy()
  })

  it('Reflection is scaling by a negative value', () => {
    const transform = scaling(-1, 1, 1)
    const p = point(2, 3, 4)
    const r = point(-2, 3, 4)
    expect(isTupleEqual(transform.mulVec(p), r)).toBeTruthy()
  })
})
