/**
 * Return an array with a sequence of values in the range [start, end).
 */
export function range(start, end) {
  return Array(end - start).fill(0).map((_, i) => i + start);
}

export function classes(base, states) {
  let result = base;
  Object.keys(states).forEach((s) => {
    if (states[s]) {
      result += ' is-' + s.toLowerCase();
    }
  });
  return result;
}
