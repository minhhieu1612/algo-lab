/**
 * @typedef {Object} NodeType
 * @property {number} value
 * @property {Object | undefined} left
 * @property {Object | undefined} right
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
 * =>                   6
 *                     / \
 *                    3   9
 *                   / \  / \
 *                  1   47   10
 *                   \   \\
 *                    2   58
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

const DEFAULT_SPAN = "   "
/**
 * Print out the tree structure
 * @param {NodeType} root binary node
 */
const printTree = (root) => {
  let result = [];
  const queue = [root];
  let depth = 0;

  while (queue.length) {
    const node = queue.shift();

    let str = result?.[depth] || "";
    let increaseDepth = false;

    if (node?.left) {
      queue.push(node.left);
      increaseDepth = true;

    }
    if (node?.right) {
      queue.push(node.right);
      increaseDepth = true;
    }
    if (increaseDepth) {
      depth++;
    }
  }

  console.log(result);
};

// printTree(toBinaryTree(new Array(3).fill(0).map((_, idx) => idx + 1)));

module.exports = {
  toBinaryTree,
  printTree,
};
