/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // { val: 1, next } => { val: 2, next } => { val: 3, next: null }
  // init: curr = n1, newList = null and prev = null
  // curr = n2, newList = n1 with next = prev = null
  // curr = n3, newList = n2 and newList.next = prev = n1
  //
  // { val: 1, next: null } <= { val: 2, next } <= { val: 3, next }
  let runner = head;
  let newList = null;
  let processedHead = false;

  if (!runner || !runner.next) return runner;

  while (runner.next) {
    // reverse pointer
    const prev = newList;
    newList = runner;
    runner = runner.next;

    if (prev) {
      newList.next = prev;
    } else {
      newList.next = null;
      processedHead = true;
    }
  }

  // move current node of new List to its head
  runner.next = newList;
  newList = runner;

  return newList;
};

const arr = new Array(5).fill(0).map((_, idx) => ({ val: idx + 1, next: null }))

arr.forEach((_, idx) => {
  _.next = arr[idx + 1] ?? null;
})

console.log(arr);

let reversedList = reverseList(arr[0]);

const newArr = [];

while (reversedList.next) {
  newArr.push(reversedList);
  reversedList = reversedList.next;
}

console.log(newArr);