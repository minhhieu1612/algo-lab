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

// order of postorder traversal: left => right => root (perform action here)
const processByRecursion = (root) => {
  if (!root) return;

  processByRecursion(root.left);
  processByRecursion(root.right);

  // perform action
  console.log(root.value);
};

// processByRecursion(tree); // 2,1,5,4,3,8,7,10,9,6

const processByStack = (root) => {
  if (!root) return;

  const stack = [];
  const visitedNodes = [];
  let curr = root;

  while (stack.length || curr) {
    // prioritize all left nodes and subtree node first then right node
    while (curr) {
      stack.push(curr);
      visitedNodes.push(curr);

      if (curr?.left && !visitedNodes.includes(curr.left)) {
        curr = curr.left;
      } else {
        if (!curr?.right || (curr?.right && !visitedNodes.includes(curr.right)))
          curr = curr.right;
      }
    }

    const node = stack.pop();

    // recheck right sub-tree
    if (node?.right && !visitedNodes.includes(node?.right)) {
      // retain root node
      stack.push(node);
      // then start from right sub-tree
      curr = node.right;
    } else {
      // perform action here
      console.log(node.value);
    }
  }
};

// processByStack(tree); // 2,1,5,4,3,8,7,10,9,6

const processByStackV2 = (root) => {
  if (!root) return;

  const stack = [];
  let lastVisisted = null;
  let curr = root;

  while (stack.length || curr) {
    // prioritize all left nodes
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    const peek = stack[stack.length - 1];

    // then right node
    if (peek?.right && lastVisisted !== peek.right) {
      // then start from right sub-tree
      curr = peek.right;
    } else {
      // perform action here
      console.log(peek.value);
      lastVisisted = stack.pop();
    }
  }
};

processByStackV2(tree); // 2,1,5,4,3,8,7,10,9,6
