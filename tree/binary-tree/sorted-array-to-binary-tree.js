// const input = [1, 3, 6, 8, 10, 14];

const { toBalancedBinaryTree } = require("./utils");

// // Expect:
// //       8
// //      / \
// //     3   10
// //    / \    \
// //   1   6    14
// console.log(toBalancedBinaryTree(input))

const input = [1, 3, 6, 8, 10, 14, 17];

// Expect:
//        8
//      /   \
//     3     14
//    / \   /  \
//   1   6 10   17
console.log(toBalancedBinaryTree(input));
