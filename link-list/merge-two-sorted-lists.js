/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const { arrToList, listToArr } = require("./utils");

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let runner1 = list1;
  let runner2 = list2;
  let head = null;
  let current = null;

  while (runner1 || runner2) {
    const prev = current;

    const justExist1 = runner1 && !runner2;
    const existBothWith1IsMatched =
      runner1 && runner2 && runner1.val <= runner2.val;

    if (justExist1 || existBothWith1IsMatched) {
      current = runner1;
      runner1 = runner1.next;
    } else {
      current = runner2;
      runner2 = runner2.next;
    }

    if (prev) {
      prev.next = current;
    } else {
      head = current;
    }
  }

  return head;
};

const arr1 = [1, 2, 4];
const arr2 = [1, 3, 4];

console.log(arrToList(arr1), arrToList(arr2));

const merged = mergeTwoLists(arrToList(arr1), arrToList(arr2));

console.log(merged, listToArr(merged));
