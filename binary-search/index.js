// arr is a non-decreasing array of numbers
function bs(arr, s, e, t) {
  if (t > arr[e] || t < arr[s] || s > e) return -1;

  if (s === e || e - s === 1) {
    if (arr[s] === t) return s;
    if (arr[e] === t) return e;

    return -1;
  }

  const m = Math.round((s + e) / 2);

  if (arr[m] > t) return bs(arr, s, m, t);

  return bs(arr, m, e, t);
}

console.log(bs([5, 25, 75, 78], 0, 3, 76));
