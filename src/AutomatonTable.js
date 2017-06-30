import React from 'react';

import './AutomatonTable.css';
import Matrix from './Matrix';
import { classes, range } from './util';

function nfaState(text, pattern, maxErrors) {
  const states = new Matrix(maxErrors, pattern.length);

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    // Test if we can move from start state to match for first
    // cell.
    if (pattern[0] === ch) {
      states.set(0, 0, true);
    }

    // TODO - Handle transitions from currently active states to next states.

    // TODO - Epsilon diagonal transitions

    // TODO - Vertical transitions

    // TODO - Horizontal transitions where active state matches.
  }

  return states;
}

/**
 * Table showing the NFA solution for approx string search.
 */
export default function AutomatonTable({ text, pattern, maxErrors }) {
  const states = nfaState(text, pattern, maxErrors);
  const isActive = (k, c) => states.get(k, c);

  const cellCls = (k, c) => classes('AutomatonTable-cell', {
    active: isActive(k, c),
    final: c === pattern.length - 1,
  });

  return (<table className="AutomatonTable">
    <tbody>
      <tr>
        <td className="AutomatonTable-header-cell" />
        {range(0, pattern.length).map(c =>
          <td
            className="AutomatonTable-header-cell"
            key={c}
          >{pattern.charAt(c)}</td>,
        )}
      </tr>
      {range(0, maxErrors).map(k =>
        <tr key={k}>
          <td>{k}</td>
          {range(0, pattern.length).map(c =>
            <td key={c} className={cellCls(k, c)} />,
          )}
        </tr>,
      )}
    </tbody>
  </table>);
}
