/**
 * Recursive binary search
 * @param {number[]} arr non-decreasing array
 * @param {number} s start index
 * @param {number} e end index
 * @param {number} t target
 * @returns the index of value is equal to the target
 */
function recursiveBinarySearch(arr, s, e, t) {
  if (t > arr[e] || t < arr[s] || s > e) return -1;

  if (s === e || e - s === 1) {
    if (arr[s] === t) return s;
    if (arr[e] === t) return e;

    return -1;
  }

  const m = Math.round((s + e) / 2);

  if (arr[m] > t) return recursiveBinarySearch(arr, s, m, t);

  return recursiveBinarySearch(arr, m, e, t);
}

console.log(recursiveBinarySearch([5, 25, 75, 78], 0, 3, 76));

/**
 *
 * @param {number[]} arr a non-decreasing array
 * @param {number} t target should be found withih the array
 * @returns the index of the value that match with the target; -1 if not found
 */
function loopBinarySearch(arr, t) {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const m = Math.round(l + (r - l) / 2);

    if (arr[m] > t) {
      r = m - 1;
    } else if (arr[m] < t) {
      l = m + 1;
    } else {
      return m;
    }
  }

  return -1;
}

console.log(loopBinarySearch([5, 25, 75, 78], 78));