const { toBinaryTree, printTree } = require("../utils");
const { rootToLeafPaths } = require("./all-root-to-leaf-paths");
const { mergeToPathFromRoot } = require("./utils");

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

printTree(tree);

// use utils path handler functions to find all
// paths from root to leaf nodes
// then merge two longest paths and get the distance
// diameter is the merged result
const diameterByDFSStack = (root) => {
  const paths = rootToLeafPaths(root);

  if (paths.length < 2) return paths.length ? paths[0].length - 1 : 0;

  let max = 0;

  for (let i = 0; i < paths.length - 1; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      const merged = mergeToPathFromRoot(paths[i], paths[j]);

      max = Math.max(max, merged.length - 1);
    }
  }

  return max;
};

const diameterByDFSRecursion = (root) => {
  const maxDepth = (root) => {
    if (!root) return 0;

    const left = maxDepth(root.left);
    const right = maxDepth(root.right);

    return 1 + Math.max(left, right);
  };

  const maxDepthLeft = maxDepth(root.left);
  const maxDepthRight = maxDepth(root.right);

  return maxDepthLeft + maxDepthRight;
};

// console.log(diameterByDFSStack(tree));
console.log(diameterByDFSRecursion(tree));
