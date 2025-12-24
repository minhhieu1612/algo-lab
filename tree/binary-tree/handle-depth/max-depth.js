const { toBinaryTree, printTree } = require("../utils");

const tree = toBinaryTree(new Array(10).fill(0).map((_, idx) => idx + 1));

printTree(tree);
/**
               6 

              3 9


            1 4   7 10



      - 2   - 5   - 8   - -
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var processByDFSRecursion = function (root) {
  let max = 0;
  let count = 0;

  // use postorder
  function countDepth(node) {
    if (!node) {
      return max;
    }

    count++;

    countDepth(node.left);
    countDepth(node.right);

    max = Math.max(count, max);
    count--;

    return max;
  }

  return countDepth(root);
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var processByDFSRecursionV2 = function (root) {
  if (!root) return 0;

  const left = processByDFSRecursionV2(root.left);
  const right = processByDFSRecursionV2(root.right);

  const max = Math.max(left, right);

  return max + 1;
};

/**
 * Get max depth
 * @param {import("../utils").NodeType} root
 * @returns number
 */
var processByDFSStack = function (root) {
  const stack = [];
  let curr = root;
  let depth = 0;
  let max = 0;
  let lastVisited = null;

  // use postorder
  while (stack.length || curr) {
    while (curr) {
      depth++;
      stack.push(curr);
      curr = curr.left;
    }

    const peek = stack[stack.length - 1];

    if (peek?.right && peek.right !== lastVisited) {
      curr = peek.right;
    } else {
      lastVisited = stack.pop();

      if (!lastVisited?.left && !lastVisited.right) {
        max = Math.max(max, depth);
      }

      depth--;
    }
  }

  return max;
};

/**
 * get max depth
 * @param {import("../utils").NodeType} root
 * @returns number
 */
const processByBFSQueue = (root) => {
  const queue = [root];
  let height = 0;
  let max = 0;
  let siblingsHaveChildren = false;

  while (queue.length) {
    const node = queue.shift();

    if (!node?.left && !node?.right) {
      max = Math.max(height + 1, max);
    } else {
      siblingsHaveChildren = true;
    }

    if (siblingsHaveChildren) {
      // left, right are undefined can be acceptable
      queue.push(node?.left);
      queue.push(node?.right);
    }

    // when all nodes with the same height are in the queue
    // the queue start to shift out and restart the check for
    // children of siblings
    if (queue.length === Math.pow(2, height + 1)) {
      height++;
      siblingsHaveChildren = false;
    }
  }

  return max;
};

// const depth = processByDFSRecursion(tree);
const depth = processByDFSRecursionV2(tree);
// const depth = processByDFSStack(tree);
// const depth = processByBFSQueue(tree);

console.log("depth:", depth);
