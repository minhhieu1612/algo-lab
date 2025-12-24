const { measureTime } = require("../../../utils");
const { toBinaryTree, printTree } = require("../utils");
const { rootToLeafPaths } = require("./all-root-to-leaf-paths");
const { mergeToPathFromRoot } = require("./utils");

const tree = toBinaryTree(new Array(500).fill(0).map((_, index) => index + 1));
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

// printTree(tree);

// use utils path handler functions to find all
// paths from root to leaf nodes
// then merge two longest paths and get the distance
// diameter is the merged result
/**
 * diameter of tree
 * @param {import("../utils").NodeType} root
 * @returns number
 */
const diameterByDFSStack = (root) => {
  let paths = [];

  paths = rootToLeafPaths(root);

  // console.log(paths);

  let plen = 0;
  let firstPLen = 0;

  plen = paths.length;
  firstPLen = (paths?.[0].length ?? 1) - 1;

  if (plen < 2) return plen ? firstPLen : 0;

  // for (let i = 0; i < paths.length - 1; i++) {
  //   for (let j = i + 1; j < paths.length; j++) {
  //     const merged = mergeToPathFromRoot(paths[i], paths[j]);

  //     max = Math.max(max, merged.length - 1);
  //   }
  // }

  let maxDepthLeft = 0;
  let maxDepthRight = 0;

  maxDepthLeft = paths.reduce(
    (res, p) =>
      Math.max(p?.[1].value === root.left.value ? p.length - 1 : 0, res),
    0
  );

  maxDepthRight = paths.reduce(
    (res, p) =>
      Math.max(p?.[1].value === root.right.value ? p.length - 1 : 0, res),
    0
  );

  return maxDepthLeft + maxDepthRight;
};

const diameterByDFSStackV2 = (root) => {
  if (!root) return 0;
  let maxDepthRight = 0;
}

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

measureTime("diameterByDFSStack", () => {
  console.log(diameterByDFSStack(tree));
});

measureTime("diameterByDFSRecursion", () => {
  console.log(diameterByDFSRecursion(tree));
});
