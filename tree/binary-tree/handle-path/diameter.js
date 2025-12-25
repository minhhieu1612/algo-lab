const { measureTime } = require("../../../utils");
const { toBalancedBinaryTree, printTree } = require("../utils");
const { rootToLeafPaths } = require("./all-root-to-leaf-paths");
const { mergeToPathFromRoot } = require("./utils");

const tree = toBalancedBinaryTree(
  new Array(10).fill(0).map((_, index) => index + 1)
);
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
/**
 * diameter of tree
 * @param {import("../utils").NodeType} root
 * @returns number
 */
const diameterByDFSStack = (root) => {
  const paths = rootToLeafPaths(root);

  // console.log(paths);

  const plen = paths.length;
  const firstPLen = (paths?.[0].length ?? 1) - 1;

  if (plen < 2) return plen ? firstPLen : 0;

  let max = 0;

  for (let i = 0; i < paths.length - 1; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      const merged = mergeToPathFromRoot(paths[i], paths[j]);

      max = Math.max(max, merged.length - 1);
    }
  }

  return max;
};

/**
 * @param {import("../utils").NodeType} root
 * @returns {number}
 */
const diameterByDFSStackV2 = (root) => {
  // FIXME: remain unresolvable
  const stack = [];
  let curr = root;
  let depth = 0;
  let maxL = 0;
  let maxR = 0;
  let processRightStarted = false;
  let lastVisited = null;

  // use postorder
  while (stack.length || curr) {
    while (curr) {
      console.log("add", depth, { value: curr.value });
      depth++;
      stack.push(curr);
      curr = curr.left;
    }

    const peek = stack[stack.length - 1];

    if (peek?.right && peek.right !== lastVisited) {
      curr = peek.right;
      if (root === peek) {
        processRightStarted = true;
      }
    } else {
      lastVisited = stack.pop();

      if (!lastVisited?.left && !lastVisited.right) {
        if (!processRightStarted) {
          maxL = Math.max(depth - 1, maxL);
        } else {
          maxR = Math.max(depth - 1, maxR);
        }
      }

      console.log("subtract", depth, { value: lastVisited.value });
      depth--;
    }
  }

  return maxL + maxR;
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

measureTime("diameterByDFSStack", () => {
  const result = diameterByDFSStack(tree);
  console.log(result);
});

measureTime("diameterByDFSStackV2", () => {
  const result = diameterByDFSStackV2(tree);
  console.log(result);
});

measureTime("diameterByDFSRecursion", () => {
  const result = diameterByDFSRecursion(tree);
  console.log(result);
});
