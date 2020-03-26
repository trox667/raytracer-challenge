import { rangeZero, isOdd, compareFloat } from '../util'
import { Tuple, tuple } from './tuples'

/**
 * Matrix storing elements in an array in column major order
 */
export interface Matrix {
  m: number[]
  rowSize: number
  colSize: number
}

/**
 * Matrix4x4 constructor in column major order
 * @param m00
 * @param m01
 * @param m02
 * @param m03
 * @param m10
 * @param m11
 * @param m12
 * @param m13
 * @param m20
 * @param m21
 * @param m22
 * @param m23
 * @param m30
 * @param m31
 * @param m32
 * @param m33
 */
export const matrix4x4 = (
  m00: number,
  m01: number,
  m02: number,
  m03: number,
  m10: number,
  m11: number,
  m12: number,
  m13: number,
  m20: number,
  m21: number,
  m22: number,
  m23: number,
  m30: number,
  m31: number,
  m32: number,
  m33: number
): Matrix => {
  return {
    rowSize: 4,
    colSize: 4,
    m: [
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33,
    ],
  }
}

/**
 * Matrix2x2 constructor in column major order
 * @param m00
 * @param m01
 * @param m10
 * @param m11
 */
export const matrix2x2 = (
  m00: number,
  m01: number,
  m10: number,
  m11: number
): Matrix => {
  return {
    rowSize: 2,
    colSize: 2,
    m: [m00, m01, m10, m11],
  }
}

/**
 * Matrix3x3 constructor in column major order
 * @param m00
 * @param m01
 * @param m02
 * @param m10
 * @param m11
 * @param m12
 * @param m20
 * @param m21
 * @param m22
 */
export const matrix3x3 = (
  m00: number,
  m01: number,
  m02: number,
  m10: number,
  m11: number,
  m12: number,
  m20: number,
  m21: number,
  m22: number
): Matrix => {
  return {
    rowSize: 3,
    colSize: 3,
    m: [m00, m01, m02, m10, m11, m12, m20, m21, m22],
  }
}

/**
 * Get the element of a matrix at given row and column
 * @param m
 * @param row
 * @param col
 */
export const matrixAt = (m: Matrix, row: number, col: number): number => {
  if (row >= m.rowSize || col >= m.colSize) return undefined
  const i = row * m.colSize + col
  return m.m[i]
}

export const compare = (a: Matrix, b: Matrix): boolean => {
  if (
    a.rowSize === b.rowSize &&
    a.colSize === b.colSize &&
    a.m.length == b.m.length
  ) {
    for (let i = 0; i < a.m.length; i++) {
      if (!compareFloat(a.m[i], b.m[i])) return false
    }
    return true
  }

  return false
}

export const mul4x4 = (a: Matrix, b: Matrix): Matrix => {
  let m = matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
  rangeZero(4).forEach(row => {
    rangeZero(4).forEach(col => {
      const i = row * a.rowSize + col
      m.m[i] =
        matrixAt(a, row, 0) * matrixAt(b, 0, col) +
        matrixAt(a, row, 1) * matrixAt(b, 1, col) +
        matrixAt(a, row, 2) * matrixAt(b, 2, col) +
        matrixAt(a, row, 3) * matrixAt(b, 3, col)
    })
  })
  return m
}

export const transform4 = (a: Matrix, b: Tuple): Tuple => {
  let t = [0, 0, 0, 0]
  rangeZero(4).forEach(row => {
    t[row] =
      matrixAt(a, row, 0) * b.x +
      matrixAt(a, row, 1) * b.y +
      matrixAt(a, row, 2) * b.z +
      matrixAt(a, row, 3) * b.w
  })
  return tuple(t[0], t[1], t[2], t[3])
}

export const identity4x4 = (): Matrix =>
  matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)

export const transpose4x4 = (m: Matrix): Matrix => {
  const r = identity4x4()
  rangeZero(4).forEach(row => {
    rangeZero(4).forEach(col => {
      const i = row * m.rowSize + col
      r.m[i] = matrixAt(m, col, row)
    })
  })
  return r
}

export const determinant = (m: Matrix): number => {
  if (m.rowSize === 2) {
    return (
      matrixAt(m, 0, 0) * matrixAt(m, 1, 1) -
      matrixAt(m, 0, 1) * matrixAt(m, 1, 0)
    )
  } else {
    let d = 0
    for (let i = 0; i < m.colSize; i++) {
      d = d + matrixAt(m, 0, i) * cofactor(m, 0, i)
    }
    return d
  }
}

export const submatrix = (a: Matrix, row: number, col: number): Matrix => {
  let m = []

  rangeZero(a.rowSize).forEach(currRow => {
    if (row !== currRow) {
      rangeZero(a.colSize).forEach(currCol => {
        if (col !== currCol) {
          m.push(matrixAt(a, currRow, currCol))
        }
      })
    }
  })

  return {
    rowSize: a.rowSize - 1,
    colSize: a.colSize - 1,
    m,
  }
}

export const minor = (a: Matrix, row: number, col: number): number =>
  determinant(submatrix(a, row, col))

export const cofactor = (a: Matrix, row: number, col: number): number => {
  const m = minor(a, row, col)
  if (isOdd(row + col)) return -m
  else return m
}

export const isInvertible = (a: Matrix): boolean =>
  !compareFloat(determinant(a), 0)

export const inverse = (a: Matrix): Matrix => {
  if (!isInvertible) return undefined
  const d = determinant(a)
  let m = []
  rangeZero(a.rowSize * a.colSize).forEach(_ => m.push(0))

  rangeZero(a.rowSize).forEach(row => {
    rangeZero(a.colSize).forEach(col => {
      const i = col * a.colSize + row
      const c = cofactor(a, row, col)
      m[i] = c / d
    })
  })
  return {
    m,
    rowSize: a.rowSize,
    colSize: a.colSize,
  }
}
