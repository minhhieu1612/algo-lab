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

/**
 * Print out the tree structure
 * @param {NodeType} root binary node
 */
const printTree = (root) => {
  let result = [];
  const queue = [root];
  let depth = 0;
  let siblingsHaveChildren = false;

  while (queue.length) {
    const node = queue.shift();
    const val = node?.value ?? "-";

    if (!result?.[depth]) {
      result[depth] = [val];
    } else {
      result[depth].push(val);
    }

    if (node?.left || node?.right) {
      siblingsHaveChildren = true;
    }

    if (typeof node?.value === "number" && siblingsHaveChildren) {
      queue.push(node.left);
      queue.push(node.right);
    }

    if (queue.length === Math.pow(2, depth + 1)) {
      depth++;
      siblingsHaveChildren = false;
    }
  }

  // console.log(result);
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
        (res, _, idx) => res + (idx ? new Array(idx + 2).join(" \n") : "") + _,
        ""
      )
      // .join("\n\n")
  );
};

// printTree(toBinaryTree(new Array(15).fill(0).map((_, idx) => idx + 1)));
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

module.exports = {
  toBinaryTree,
  printTree,
};
