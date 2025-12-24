const { toBinaryTree } = require("../utils");
const { printPaths } = require("./utils");

const tree = toBinaryTree(new Array(10).fill(0).map((_, index) => index + 1));
/**
 * [1,2,3,4,5,6,7,8,9,10]
 *                       6
 *                      / \
 *                     /   \
 *                    3     9
 *                   / \   /  \
 *                  1   4 7   10
 *                   \   \ \
 *                    2   5 8
 */

/**
 * Get all paths from root node
 * @param {import("../utils").NodeType} root node tree
 * @returns {Array<Array<import("../utils").NodeType>>}
 */
const processByStack = (root) => {
  const paths = [];
  const path = [];
  const stack = [];
  let curr = root;
  let lastVisited = null;

  // use postorder dfs
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      path.push(curr);
      curr = curr.left;
    }

    const peek = stack[stack.length - 1];

    if (peek?.right && lastVisited !== peek.right) {
      curr = peek.right;
    } else {
      lastVisited = stack.pop();

      // start to store path if current node is leaf node
      if (lastVisited && !lastVisited.left && !lastVisited.right) {
        paths.push([...path]);
      }
      path.pop();
    }
  }

  return paths;
};

// const paths = processByStack(tree);

/**
 * Get all paths from root to leaf node by recursion
 * @param {import("../utils").NodeType} root binary tree
 * @param {Array<Array<import("../utils").NodeType>>} paths all paths
 * @param {Array<import("../utils").NodeType>} path
 * @returns {Array<Array<import("../utils").NodeType>>}
 */
const processByRecursion = (root) => {
  const paths = [];
  const path = [];

  const findPaths = (root) => {
    if (!root) {
      return paths;
    }

    path.push(root);

    findPaths(root.left, paths, path);
    findPaths(root.right, paths, path);

    if (!root.left && !root.right) {
      paths.push([...path]);
    }

    path.pop();

    return paths;
  };

  return findPaths(root);
};

const paths = processByRecursion(tree);

printPaths(paths);

module.exports = {
  rootToLeafPaths: processByStack,
};
