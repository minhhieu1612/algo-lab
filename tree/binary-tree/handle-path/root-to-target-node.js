const { toBinaryTree } = require("../utils");
const { printPath } = require("./utils");

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
const target = 10;
console.log("tree: ", tree);
console.log("target:", target);

/**
 * Get path from root to target node
 * @param {import("../utils").NodeType} root node tree
 * @param {number} target
 * @returns {Array<import("../utils").NodeType>}
 */
const rootToTargetNode = (root, target) => {
  const path = [];
  const stack = [];
  let curr = root;
  let lastVisited = null;

  // use postorder dfs
  while (curr || stack.length) {
    while (curr) {
      path.push(curr);

      if (curr.value === target) {
        return path;
      }

      stack.push(curr);
      curr = curr.left;
    }

    const peek = stack[stack.length - 1];

    if (peek?.right && lastVisited !== peek.right) {
      curr = peek.right;
    } else {
      lastVisited = stack.pop();
      path.pop();
    }
  }

  return [];
};

const path = rootToTargetNode(tree, target);

printPath(path);

module.exports = {
  rootToTargetNode,
};
