/**
 * You are given an m x n integer matrix matrix with the following two properties:
 *
 * Each row is sorted in non-decreasing order.
 * The first integer of each row is greater than the last integer of the previous row.
 * Given an integer target, return true if target is in matrix or false otherwise.
 *
 * You must write a solution in O(log(m * n)) time complexity.
 *
 * Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * Output: true
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // ======== Utilities =========
  // simple binary search for an 1d array
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

  /**
   *
   * @param {number} arr 1d array
   * @param {number} t target number
   * @returns
   */
  function bs1d(arr, t) {
    return bs(arr, 0, arr.length, t) > -1;
  }

  // ======== Solution breakdown ========
  // matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
  // t = 3; r = 3; c = 4
  // s = [[0,0], [0,3]]; e = [[2,0], [2,3]];
  // => m = [[1,0], [1,3]]
  // m[0] > t => m become e
  // m[1] < t => m become s
  // m[0] < t < m[1] => simple 1d bs
  // s = [[0,0], [0,3]]; e = [[1,0], [1,3]]
  // when e[0][0] - s[0][0] = 1
  // s[0] > t => return not found
  // s[0] <= t <= s[1] => simple 1d bs
  // s[1] < t < e[0] => return not found
  // e[0] <= t <= e[1] => simple 1d bs
  // e[0] < t => return not found

  // ============= Implementation =========

  /**
   *
   * @param {number[][]} arr a 2d matrix
   * @param {number[][]} s starting data consist of first and the last index of the starting row
   * pattern [[s, 0], [s, cols of the matrix - 1]]
   * @param {number[][]} e ending data consist of first and the last index of the end row
   * * pattern [[e, 0], [e, cols of the matrix - 1]]
   * @param {number} t target number
   */
  function bs2d(arr, s, e, t) {
    const ss = s[0],
      se = s[1]; // start_start, start_end
    const es = e[0],
      ee = e[1]; // end_start, end_end
    const ss_val = arr[ss[0]][ss[1]];
    const se_val = arr[se[0]][se[1]];
    const es_val = arr[es[0]][es[1]];
    const ee_val = arr[ee[0]][ee[1]];

    if (es[0] - ss[0] === 1 || es[0] === ss[0]) {
      // target is not in start range or end range
      if (ss_val > t || (se_val < t && t < es_val) || ee_val < t) return false;

      // in start or end range simple search in a row(an 1d array)
      if (ss_val <= t && t <= se_val) return bs1d(arr[ss[0]], t);
      if (es_val <= t && t <= arr[ee[0]][ee[1]]) return bs1d(arr[es[0]], t);
    }

    const mr = Math.round((ss[0] + es[0]) / 2); // middle_row
    const ms = [mr, ss[1]]; // middle start point index
    const me = [mr, se[1]]; // middle end point index
    const ms_val = arr[ms[0]][ms[1]];
    const me_val = arr[me[0]][me[1]];

    // between start range and middle range
    if (ms_val > t) return bs2d(arr, s, (m = [ms, me]), t);

    // between middle range and end range
    if (me_val < t) return bs2d(arr, (m = [ms, me]), e, t);

    // in middle range
    if (ms_val <= t && t <= me_val) return bs1d(arr[ms[0]], t);

    return false;
  }

  const rows = matrix.length;

  if (!rows) return false;

  const cols = matrix[0].length;

  return bs2d(
    matrix,
    [
      [0, 0],
      [0, cols - 1],
    ],
    [
      [rows - 1, 0],
      [rows - 1, cols - 1],
    ],
    target
  );
};

var searchMatrixA = function (matrix, target) {
  let rows = matrix.length;
  let cols = matrix[0].length;

  let begin = 0;
  let end = rows * cols - 1;

  while (begin <= end) {
    const mid = Math.floor((begin + end) / 2);
    const row = Math.floor(mid / cols);
    const col = mid % cols;
    const number = matrix[row][col];

    if (number === target) {
      return true;
    } else if (number > target) {
      end = mid - 1;
    } else if (number < target) {
      begin = mid + 1;
    }
  }

  return false;
};

console.log(
  searchMatrixA(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    94
  )
);
