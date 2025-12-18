// Binary Search Tree form
//       8
//      / \
//     3   10
//    / \    \
//   1   6    14

const binaryTree = {
  value: 8,
  left: {
    value: 3,
    left: {
      value: 1,
    },
    right: {
      value: 6,
    },
  },
  right: {
    value: 10,
    right: {
      value: 14,
    },
  },
};
// binary tree always follow this rule
// + left leaf < branch < right leaf
// + if we use a sorted array to create a binary tree,
// then the middle item is the root of the tree.

// move pointer curr deeply on the left side then start
// to work from the left leaf => branch => right leaf
function inorderIretative(root) {
  const stack = [];
  let curr = root;

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr?.left;
    }

    curr = stack.pop();

    // perform main operation here
    console.log(curr?.value);

    curr = curr?.right;
  }
}

inorderIretative(binaryTree);
