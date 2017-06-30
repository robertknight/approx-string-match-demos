export default class Matrix {
  constructor(nRows, nCols, clearVal = 0) {
    this.cells = Array(nRows * nCols).fill(clearVal);
    this.nRows = nRows;
    this.nCols = nCols;
    this.clearVal = clearVal;
  }

  get(r, c) {
    return this.cells[(this.nCols * r) + c];
  }

  set(r, c, val) {
    this.cells[(this.nCols * r) + c] = val;
  }

  clone() {
    const m = new Matrix(this.nRows, this.nCols);
    m.cells = this.cells.slice();
    return m;
  }

  clear() {
    this.cells.fill(this.clearVal);
  }
}
