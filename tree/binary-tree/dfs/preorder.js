const { toBalancedBinaryTree } = require("../utils");

const tree = toBalancedBinaryTree(new Array(10).fill(0).map((_, index) => index + 1));
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

// preorder mean: root => left => right
const processByRecursion = (root) => {
  if (!root) return;

  // operation first as name preorder
  console.log(root.value);

  // then process left => right
  processByRecursion(root?.left);
  processByRecursion(root?.right);
};

// processByRecursion(tree); // 6,3,1,2,4,5,9,7,8,10

const processByStack = (root) => {
  if (!root) return;

  const stack = [root];

  while (stack.length) {
    const node = stack.pop();

    // operation first
    console.log(node.value);

    // then process lef => right
    if (node?.right) stack.push(node.right);
    if (node?.left) stack.push(node.left);
  }
};

processByStack(tree); // 6,3,1,2,4,5,9,7,8,10
