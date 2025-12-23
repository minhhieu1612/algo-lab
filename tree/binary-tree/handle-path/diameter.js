const { toBinaryTree } = require("../utils");
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

console.log(JSON.stringify(tree));

// use utils path handler functions to find all
// paths from root to leaf nodes
// then merge two longest paths and get the distance
// diameter is the merged result
const diameter = (root) => {
  const paths = rootToLeafPaths(root);

  if (paths.length < 2) return paths.length ? paths[0].length - 1 : 0;

  let max = 0;

  for (let i = 0; i < paths.length - 1; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      const merged = mergeToPathFromRoot(paths[i], paths[j]);

      console.log(merged);
      max = Math.max(max, merged.length);
    }
  }

  return max - 1;
};

console.log(diameter(tree));
