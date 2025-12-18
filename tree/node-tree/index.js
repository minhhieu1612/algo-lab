// Binary Search Tree form
//       8
//      / \
//     3   10
//    / \    \
//   1   6    14

const nodeTree = {
  value: 8,
  children: [
    {
      value: 3,
      children: [
        {
          value: 1,
          children: [],
        },
        {
          value: 6,
          children: [],
        },
      ],
    },
    {
      value: 10,
      children: [
        {
          value: 14,
          children: [],
        },
      ],
    },
  ],
};

// traverse with stack (depth-first)
function stackIterate(root) {
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();

    // can perform action here
    // for example, read, update, insert,
    console.log(node.value);

    // push children in reverse order to ensure
    // sibling nodes are read left to right
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
}

// stackIterate(nodeTree);

// traverse with recursion (depth-first)
function recursionIterate(node) {
  console.log(node.value);

  for (const child of node.children) {
    recursionIterate(child);
  }
}

// recursionIterate(nodeTree);

// traverse with queue (breadth-first)
function queueIterate(root) {
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    console.log(node.value);

    if (node.children.length) queue.push(...node.children);
  }
}

// queueIterate(nodeTree);