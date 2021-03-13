import { isEqual as isFloatEqual } from '../util'
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
