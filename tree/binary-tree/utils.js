/**
 * @typedef {Object} NodeType
 * @property {number} value
 * @property {Object | null} left
 * @property {Object | null} right
 */

/**
 * Given the input is sorted array
 * and a return binary search tree
 * @param {Array<number>} arr: a sorted array from left to right
 * @returns {NodeType}
 * @example
 * ```
 * arr=[1,2,3,4,5,6,7,8,9,10]
 *
 * =>                    6
 *                      / \
 *                     /   \
 *                    3     9
 *                   / \   /  \
 *                  1   4 7   10
 *                   \   \ \
 *                    2   5 8
 * ```
 */
const toBinaryTree = function (arr) {
  function binaryIterate(arr, start, end) {
    if (end - start <= 1) {
      return {
        value: arr[start],
        ...(end > start ? { right: { value: arr[end] } } : undefined),
      };
    }

    const result = {};
    const middle = Math.round((start + end) / 2);

    result.value = arr[middle];
    result.left = binaryIterate(arr, start, middle - 1);
    result.right = binaryIterate(arr, middle + 1, end);

    return result;
  }

  return binaryIterate(arr, 0, arr.length - 1);
};

module.exports = {
  toBinaryTree,
};
