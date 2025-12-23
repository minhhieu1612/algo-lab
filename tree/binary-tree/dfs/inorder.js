const { toBinaryTree } = require("../utils");

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

console.log(tree);

// order: left => root => right
const processByRecursion = (root) => {
  if (!root) return;

  // process left
  processByRecursion(root.left);

  // perform operation
  console.log(root.value);

  // then process right
  processByRecursion(root.right);
};

// processByRecursion(tree); // 1,2,3,4,5,6,7,8,9,10

const processByStack = (root) => {
  if (!root) return;

  let curr = root;
  const stack = [];

  while (stack.length || curr) {
    // move to left first
    while (curr) {
      stack.push(curr);
      curr = curr?.left;
    }

    // perform the operations
    node = stack.pop();
    console.log(node.value);

    // then right node
    curr = node?.right;
  }
};

processByStack(tree); // 1,2,3,4,5,6,7,8,9,10
