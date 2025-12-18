/**
 * Given the input is sorted array
 * and return binary search tree
 */

const toBinaryTree = function (arr) {
  function binaryIterate(arr, start, end) {
    if (end - start <= 1) {
      return {
        value: arr[start],
        ...(end > start ? { right: { value: arr[end] } } : undefined),
      };
    }

    const result = {};
    const middle = Math.round((start + end) / 2);

    result.value = arr[middle];
    result.left = binaryIterate(arr, start, middle - 1);
    result.right = binaryIterate(arr, middle + 1, end);

    return result;
  }

  return binaryIterate(arr, 0, arr.length - 1);
};

// const input = [1, 3, 6, 8, 10, 14];

// // Expect:
// //       8
// //      / \
// //     3   10
// //    / \    \
// //   1   6    14
// console.log(toBinaryTree(input))

const input = [1, 3, 6, 8, 10, 14, 17];

// Expect:
//        8
//      /   \
//     3     14
//    / \   /  \
//   1   6 10   17
console.log(toBinaryTree(input));
