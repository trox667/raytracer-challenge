import {
  rotationX,
  rotationY,
  rotationZ,
  scaling,
  shearing,
  translation,
} from './transformations'
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

  it('Rotating a point around the x axis', () => {
    const p = point(0, 1, 0)
    const halfQuarter = rotationX(Math.PI / 4)
    const fullQuarter = rotationX(Math.PI / 2)
    expect(
      isTupleEqual(
        halfQuarter.mulVec(p),
        point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2)
      )
    )
    expect(isTupleEqual(fullQuarter.mulVec(p), point(0, 0, 1)))
  })

  it('The inverse of an x-rotation rotates in the opposite direction', () => {
    const p = point(0, 1, 0)
    const halfQuarter = rotationX(Math.PI / 4)
    const inv = halfQuarter.inverse()
    expect(
      isTupleEqual(inv.mulVec(p), point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2))
    )
  })

  it('Rotating a point around the y axis', () => {
    const p = point(0, 0, 1)
    const halfQuarter = rotationY(Math.PI / 4)
    const fullQuarter = rotationY(Math.PI / 2)
    expect(
      isTupleEqual(
        halfQuarter.mulVec(p),
        point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2)
      )
    )
    expect(isTupleEqual(fullQuarter.mulVec(p), point(1, 0, 0)))
  })

  it('Rotating a point around the z axis', () => {
    const p = point(0, 1, 0)
    const halfQuarter = rotationZ(Math.PI / 4)
    const fullQuarter = rotationZ(Math.PI / 2)
    expect(
      isTupleEqual(
        halfQuarter.mulVec(p),
        point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0)
      )
    )
    expect(isTupleEqual(fullQuarter.mulVec(p), point(-1, 0, 0)))
  })

  it('A shearing transformation moves x in proportion to y', () => {
    const transform = shearing(1, 0, 0, 0, 0, 0)
    const p = point(2, 3, 4)
    expect(isTupleEqual(transform.mulVec(p), point(5, 3, 4)))
  })

  it('A shearing transformation moves x in proportion to z', () => {
    const transform = shearing(0, 1, 0, 0, 0, 0)
    const p = point(2, 3, 4)
    expect(isTupleEqual(transform.mulVec(p), point(6, 3, 4)))
  })

  it('A shearing transformation moves y in proportion to x', () => {
    const transform = shearing(0, 0, 1, 0, 0, 0)
    const p = point(2, 3, 4)
    expect(isTupleEqual(transform.mulVec(p), point(2, 5, 4)))
  })

  it('A shearing transformation moves y in proportion to z', () => {
    const transform = shearing(0, 0, 0, 1, 0, 0)
    const p = point(2, 3, 4)
    expect(isTupleEqual(transform.mulVec(p), point(2, 7, 4)))
  })

  it('A shearing transformation moves z in proportion to x', () => {
    const transform = shearing(0, 0, 0, 0, 1, 0)
    const p = point(2, 3, 4)
    expect(isTupleEqual(transform.mulVec(p), point(2, 3, 6)))
  })

  it('A shearing transformation moves z in proportion to y', () => {
    const transform = shearing(0, 0, 0, 0, 1, 0)
    const p = point(2, 3, 4)
    expect(isTupleEqual(transform.mulVec(p), point(2, 3, 7)))
  })
})
