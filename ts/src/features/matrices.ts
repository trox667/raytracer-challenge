import { isEqual as isFloatEqual } from '../util'
import { Tuple, tuple4 } from './tuples'
export class Matrix {
  private data: number[]

  constructor(protected rows: number, protected columns: number) {
    this.data = Array(rows * columns).fill(0.0)
  }

  set(row: number, column: number, value: number) {
    if (row > this.rows || column > this.columns) return
    this.data[row * this.rows + column] = value
  }

  at(row: number, column: number): number {
    if (row > this.rows || column > this.columns) return
    return this.data[row * this.rows + column]
  }

  equal(b: Matrix): boolean {
    if (this.rows !== b.rows || this.columns !== b.columns) return false

    return this.data.every((value, i) => {
      return isFloatEqual(value, b.data[i])
    })
  }

  mul(b: Matrix): Matrix {
    if (this.rows !== b.columns && this.columns !== b.rows) return
    const m = new Matrix(this.rows, b.columns)

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < b.columns; c++) {
        let p = 0
        for (let i = 0; i < this.rows; i++) {
          p += this.at(r, i) * b.at(i, c)
        }
        m.set(r, c, p)
      }
    }
    return m
  }

  mulVec(b: Tuple): Tuple {
    const [x, y, z, w] = b
    const m = new Matrix(4, 1)
    m.set(0, 0, x)
    m.set(1, 0, y)
    m.set(2, 0, z)
    m.set(3, 0, w)
    const r = this.mul(m)
    return tuple4(r.at(0, 0), r.at(1, 0), r.at(2, 0), r.at(3, 0))
  }

  transpose(): Matrix {
    const m = new Matrix(this.columns, this.rows)
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        m.set(r, c, this.at(c, r))
      }
    }
    return m
  }
}

export function identityMatrix4x4(): Matrix4x4 {
  return new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
}

export class Matrix2x2 extends Matrix {
  constructor(m00: number, m01: number, m10: number, m11: number) {
    super(2, 2)
    this.set(0, 0, m00)
    this.set(0, 1, m01)
    this.set(1, 0, m10)
    this.set(1, 1, m11)
  }
}

export class Matrix3x3 extends Matrix {
  constructor(
    m00: number,
    m01: number,
    m02: number,
    m10: number,
    m11: number,
    m12: number,
    m20: number,
    m21: number,
    m22: number
  ) {
    super(3, 3)
    this.set(0, 0, m00)
    this.set(0, 1, m01)
    this.set(0, 2, m02)
    this.set(1, 0, m10)
    this.set(1, 1, m11)
    this.set(1, 2, m12)
    this.set(2, 0, m20)
    this.set(2, 1, m21)
    this.set(2, 2, m22)
  }
}

export class Matrix4x4 extends Matrix {
  constructor(
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
  ) {
    super(4, 4)
    this.set(0, 0, m00)
    this.set(0, 1, m01)
    this.set(0, 2, m02)
    this.set(0, 3, m03)
    this.set(1, 0, m10)
    this.set(1, 1, m11)
    this.set(1, 2, m12)
    this.set(1, 3, m13)
    this.set(2, 0, m20)
    this.set(2, 1, m21)
    this.set(2, 2, m22)
    this.set(2, 3, m23)
    this.set(3, 0, m30)
    this.set(3, 1, m31)
    this.set(3, 2, m32)
    this.set(3, 3, m33)
  }
}
