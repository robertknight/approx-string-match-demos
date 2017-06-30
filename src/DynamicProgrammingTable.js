import React from 'react';

import Matrix from './Matrix';
import './DynamicProgrammingTable.css';

function dpSearch(text, pattern) {
  const nCols = text.length + 1;
  const nRows = pattern.length + 1;

  const cell = (r, c) => (nCols * r) + c;
  const mat = new Matrix(nRows, nCols);

  for (let r = 0; r < nRows; r += 1) {
    mat.set(r, 0, r);
  }

  for (let c = 1; c < nCols; c += 1) {
    for (let r = 1; r < nRows; r += 1) {
      const insertCost = mat.get(r, c - 1) + 1;
      const delCost = mat.get(r - 1, c) + 1;
      const subCost = mat.get(r - 1, c - 1) + (text[c - 1] === pattern[r - 1] ? 0 : 1);
      mat.set(r, c, Math.min(insertCost, delCost, subCost));
    }
  }

  // Find the end offset of the best match
  let minCost = pattern.length + 1;
  let minCostPos = -1;

  for (let c = 1; c < nCols; c += 1) {
    const cost = mat[cell(pattern.length, c)];
    if (cost < minCost) {
      minCost = cost;
      minCostPos = c;
    }
  }

  return {
    matrix: mat,
    minCostPos,
  };
}

function range(start, end) {
  return Array(end - start).fill(0).map((_, i) => i + start);
}

function isMinCostCol(mat, r, c) {
  let minCost = Infinity;
  for (let i = 0; i < mat.nCols; i += 1) {
    minCost = Math.min(minCost, mat.get(r, i));
  }
  return mat.get(r, c) === minCost;
}

/**
 * Table showing the dynamic programming solution for approx string search.
 */
export default function DynamicProgrammingTable({ text, pattern }) {
  const { matrix } = dpSearch(text, pattern);
  return (<table className="DynamicProgrammingTable">
    <tbody>
      <tr key={-1} className="DynamicProgrammingTable-text">
        <td />
        <td />
        {range(0, matrix.nCols).map(c =>
          <td key={c}><b>{text.charAt(c)}</b></td>,
        )}
      </tr>
      {range(0, matrix.nRows).map(r =>
        <tr key={r}>
          <td className="DynamicProgrammingTable-pattern">
            <b>{r > 0 ? pattern.charAt(r - 1) : ''}</b>
          </td>
          {range(0, matrix.nCols).map(c =>
            <td
              className={`${isMinCostCol(matrix, r, c) ? 'is-best' : ''} DynamicProgrammingTable-cell`}
              key={c}
            >
              {matrix.get(r, c)}
            </td>,
          )}
        </tr>,
      )}
    </tbody>
  </table>);
}
