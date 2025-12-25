/**
 * @typedef {Object} NodeType
 * @property {number} value
 * @property {NodeType | undefined} left
 * @property {NodeType | undefined} right
 */

/**
 * Given the input is sorted array
 * and return a balanced binary search tree
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
const toBalancedBinaryTree = function (arr) {
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

/**
 * Convert a formated array to binary tree
 * 
 * Format will be like this:
 * 
 * [
 * 
 * root,
 * 
 * left1, right1,
 * 
 * left2_left1, right2_left1, left2_right1, right2_right1,
 * 
 * ... // so on
 * 
 * ]
 * 
 * @param {number[]} arr
 * @returns {NodeType}
 * @example
 * ```
 * printTree(toBinaryTree([1, 2, null, 4, 5, null, null, 6, 7, 8]))
 * =>
 *             1
 *
 *            2 -
 *
 *
 *         4 5   - -
 *
 *
 *
 *   6 7   8 -   - -   - -
 * ```
 */
const toBinaryTree = (arr) => {
  const toTree = (arr, idx) => {
    if (idx > arr.length - 1 || typeof arr[idx] !== "number") return null;

    const result = {
      value: arr[idx],
    };

    result.left = toTree(arr, 2 * idx + 1);
    result.right = toTree(arr, 2 * idx + 2);

    return result;
  };

  return toTree(arr, 0);
};

/**
 * Print out the tree structure
 * @param {NodeType} root binary node
 */
const printTree = (root) => {
  let result = [];
  const queue = [root];
  let height = 0;
  let siblingsHaveChildren = false;

  while (queue.length) {
    const node = queue.shift();
    const val = node?.value ?? "-";

    if (!result?.[height]) {
      result[height] = [val];
    } else {
      result[height].push(val);
    }

    if (node?.left || node?.right) {
      siblingsHaveChildren = true;
    }

    if (siblingsHaveChildren) {
      queue.push(node?.left);
      queue.push(node?.right);
    }

    if (queue.length === Math.pow(2, height + 1)) {
      height++;
      siblingsHaveChildren = false;
    }
  }

  const strArr = result.map((r) => {
    let str = "";
    r.forEach((val, idx) => {
      if (idx) {
        str += idx % 2 === 0 ? "   " : " ";
      }
      str += val;
    });

    return str;
  });
  const lastLen = strArr[strArr.length - 1].length;

  console.log(
    strArr
      .map(
        (s) =>
          new Array(Math.round((lastLen - s.length) / 2)).fill(" ").join("") + s
      )
      .reduce(
        (res, _, idx) => res + (idx ? new Array(idx + 2).join("\t\n") : "") + _,
        ""
      )
    // .join("\n\n")
  );
};

// printTree(toBalancedBinaryTree(new Array(15).fill(0).map((_, idx) => idx + 1)));
// expect
/**
 *             8
 *
 *           4 12
 *
 *
 *        2 6   10 14
 *
 *
 *
 * 1 3   5 7   9 11   13 15
 */

printTree(toBinaryTree([1, 2, null, 4, 5, null, null, 6, 7, 8]));

module.exports = {
  toBalancedBinaryTree,
  toBinaryTree,
  printTree,
};
