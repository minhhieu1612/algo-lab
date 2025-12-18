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
var invertTree = function (root) {
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
    let node = stack.pop();

    if (!curr) {
      newRoot = node;
    }

    curr = node;
    node = null;

    // perform invert nodes
    if (curr && curr.right) {
      stack.push(curr.right);

      if (curr.left) stack.push(curr.left);

      const temp = curr.right;
      curr.right = curr.left;
      curr.left = temp;
    } else if (curr && curr.left) {
      // no right, just left
      stack.push(curr.left);
      curr.right = curr.left;
      curr.left = null;
    }
  }

  return newRoot;
};

const tree = toBinaryTree([4, 2, 7, 1, 3, 6, 9]);
console.log(tree);


const start = performance.now();
console.log(invertTree(tree));
console.log("depth-first stack take: ", performance.now() - start + "ms")

const newStart = performance.now();
var recursionInvertTree = function(root) {
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

console.log(recursionInvertTree(tree));
console.log("depth-first recursion take: ", performance.now() - newStart + "ms")
