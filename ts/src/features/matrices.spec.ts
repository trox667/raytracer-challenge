import { compareFloat } from '../util'
import { tuple, compare as compareTuple } from './tuples'
import {
  matrix4x4,
  matrixAt,
  matrix2x2,
  matrix3x3,
  compare,
  mul4x4,
  transform4,
  identity4x4,
  transpose4x4,
  determinant,
  submatrix,
  minor,
} from './matrices'

test('constructing and inspecting a 4x4 matrix', () => {
  const m = matrix4x4(
    1,
    2,
    3,
    4,
    5.5,
    6.5,
    7.5,
    8.5,
    9,
    10,
    11,
    12,
    13.5,
    14.5,
    15.5,
    16.5
  )
  expect(compareFloat(matrixAt(m, 0, 0), 1)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 0, 3), 4)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 0), 5.5)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 2), 7.5)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 2, 2), 11)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 3, 0), 13.5)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 3, 2), 15.5)).toBeTruthy()
})

test('a 2x2 matrix ought to be representable', () => {
  const m = matrix2x2(-3, 5, 1, -2)
  expect(compareFloat(matrixAt(m, 0, 0), -3)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 0, 1), 5)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 0), 1)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 1), -2)).toBeTruthy()
})

test('a 3x3 matrix ought to be representable', () => {
  const m = matrix3x3(-3, 5, 0, 1, -2, -7, 0, 1, 1)
  expect(compareFloat(matrixAt(m, 0, 0), -3)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 1), -2)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 2, 2), 1)).toBeTruthy()
})

test('matrix equality with identical matrices', () => {
  const a = matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
  const b = matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
  expect(compare(a, b)).toBeTruthy()
})

test('matrix equality with different matrices', () => {
  const a = matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
  const b = matrix4x4(2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1)
  expect(compare(a, b)).toBeFalsy()
})

test('multiplying two matrices', () => {
  const a = matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
  const b = matrix4x4(-2, 1, 2, 3, 3, 2, 1, -1, 4, 3, 6, 5, 1, 2, 7, 8)
  const r = matrix4x4(
    20,
    22,
    50,
    48,
    44,
    54,
    114,
    108,
    40,
    58,
    110,
    102,
    16,
    26,
    46,
    42
  )
  expect(compare(mul4x4(a, b), r)).toBeTruthy()
})

test('a matrix multiplied by a tuple', () => {
  const a = matrix4x4(1, 2, 3, 4, 2, 4, 4, 2, 8, 6, 4, 1, 0, 0, 0, 1)
  const b = tuple(1, 2, 3, 1)
  const r = tuple(18, 24, 33, 1)
  expect(compareTuple(transform4(a, b), r)).toBeTruthy()
})

test('multiplying a matrix by the identiy matrix', () => {
  const a = matrix4x4(0, 1, 2, 4, 1, 2, 4, 8, 2, 4, 8, 16, 4, 8, 16, 32)
  expect(compare(mul4x4(a, identity4x4()), a)).toBeTruthy()
})

test('transposing a matrix', () => {
  const a = matrix4x4(0, 9, 3, 0, 9, 8, 0, 8, 1, 8, 5, 3, 0, 0, 5, 8)
  const r = matrix4x4(0, 9, 1, 0, 9, 8, 8, 0, 3, 0, 5, 5, 0, 8, 3, 8)
  expect(compare(transpose4x4(a), r)).toBeTruthy()
})

test('calculating the determinant of a 2x2 matrix', () => {
  const a = matrix2x2(1, 5, -3, 2)
  const A = 17
  expect(compareFloat(determinant(a), A)).toBeTruthy()
})

test('a submatrix of a 3x3 matrix is a 2x2 matrix', () => {
  const a = matrix3x3(1, 5, 0, -3, 2, 7, 0, 6, -3)
  const r = matrix2x2(-3, 2, 0, 6)
  expect(compare(submatrix(a, 0, 2), r)).toBeTruthy()
})

test('a submatrix of a 4x4 matrix is a 3x3 matrix', () => {
  const a = matrix4x4(-6, 1, 1, 6, -8, 5, 8, 6, -1, 0, 8, 2, -7, 1, -1, 1)
  const r = matrix3x3(-6, 1, 6, -8, 8, 6, -7, -1, 1)
  expect(compare(submatrix(a, 2, 1), r)).toBeTruthy()
})

test('calculating a minor of a 3x3 matrix', () => {
  const a = matrix3x3(3, 5, 0, 2, -1, -7, 6, -1, 5)
  const r = 25
  expect(compareFloat(minor(a, 1, 0), r)).toBeTruthy()
})