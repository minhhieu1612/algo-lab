/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const { toBinaryTree } = require("./utils");

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var dfStackInvertTree = function (root) {
  //      4
  //    /   \
  //   2     7
  //  / \   / \
  // 1   3 6   9

  if (!root) return root;

  // use breadth-first stack
  const stack = [root];
  let newRoot = null;
  let curr = null;

  // maintain loop in case of not traversing through tree
  while (stack.length || curr) {
    const node = stack.pop();

    if (!curr) {
      newRoot = node;
    }

    curr = node;

    if (curr?.right) stack.push(curr.right);
    if (curr?.left) stack.push(curr.left);

    // perform invert nodes
    if (curr && (curr?.left || curr?.right)) {
      const temp = curr?.right;
      curr.right = curr?.left;
      curr.left = temp;
    }
  }

  return newRoot;
};

const tree = toBinaryTree([4, 2, 7, 1, 3, 6, 9]);
console.log(tree);

// const start = performance.now();
// console.log(dfStackInvertTree(tree));
// console.log("depth-first stack take: ", performance.now() - start + "ms");

const newStart = performance.now();

var recursionInvertTree = function (root) {
  if (!root) {
    return root;
  }

  const temp = root.right;
  root.right = root.left;
  root.left = temp;

  recursionInvertTree(root.left);
  recursionInvertTree(root.right);

  return root;
};

// console.log(recursionInvertTree(tree));
// console.log(
//   "depth-first recursion take: ",
//   performance.now() - newStart + "ms"
// );

const bfQueueInvertTree = (root) => {
  let newRoot = null;
  let curr = null;
  const queue = [root];

  while (queue.length || curr) {
    const node = queue.shift();

    if (!curr) {
      newRoot = node;
    }
    curr = node;

    if (curr?.right) queue.push(curr.right);
    if (curr?.left) queue.push(curr.left);

    // invert node
    if (curr && (curr?.right || curr?.left)) {
      const temp = curr?.right;
      curr.right = curr?.left;
      curr.left = temp;
    }
  }

  return newRoot;
};

console.log(bfQueueInvertTree(tree))