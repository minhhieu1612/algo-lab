/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */

var maxDepth = function (root) {
  let max = 0;

  function countDepth(node, initCount) {
    if (!node) {
      max = Math.max(initCount, max);
      return;
    }

    const count = initCount + 1;

    // dp
    if (node?.left) countDepth(node.left, count);
    if (node?.right) countDepth(node.right, count);
  }

  countDepth(root, 0);

  return max;
};
