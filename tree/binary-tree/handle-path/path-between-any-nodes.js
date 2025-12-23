const { toBinaryTree } = require("../utils");
const { rootToTargetNode } = require("./root-to-target-node");

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
const DEFAULT_START = 6;
const DEFAULT_END = 6;
console.log("tree: ", tree);
console.log("start:", DEFAULT_START, ", end:", DEFAULT_END);

/**
 * Get path between two nodes
 * @param {import("../utils").NodeType} root node tree
 * @param {number} start
 * @param {number} end
 * @returns {Array<Array<number>>}
 */
const processByStack = (root, start, end) => {
  const pathStart = rootToTargetNode(root, start);
  const pathEnd = rootToTargetNode(root, end);

  return mergeToPathFromRoot(pathStart, pathEnd);
};

const path = processByStack(tree, DEFAULT_START, DEFAULT_END);
// const path = rootToTargetNode(tree, end)

printPath(path);
