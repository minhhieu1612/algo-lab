/**
Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
 

Constraints:

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];
  // const combine = []; // version 1

  // pass "combine" as a parameter help engine access variable faster
  // since it does not have to trace back through scope chain to reach
  // the combine in outer scope as annotated as version 1 
  function backtrack(index = 0, sum = 0, combine = []) {
    if (sum === target) {
      result.push([...combine]);
      return;
    }

    if (sum > target) return;
    for (let i = index; i < candidates.length; i++) {

      combine.push(candidates[i]);
      backtrack(i, sum + candidates[i], combine);
      combine.pop();
    }
  }

  backtrack();
  return result;
};

/**
    [] 
    | -- [2]
    |     | -- [2,2]
    |     |      | -- [2,2,2]
    |     |      |       | -- [2,2,2,2] => result push here, escape this branch
    |     |      | -- [2,2,3]
    |     |      |       | -- [2,2,3,2] => exceed target
    |     |      | -- [2,2,5] => exceed target
    |     | -- [2,3]
    |     |      | -- [2,3,2]
    |     |      | -- [2,3,3] => result here
    |     | -- [2,5]
    |     |      | -- [2,5,2] => exeed
    | -- [3]
    |     | -- [3,2]
    |     |      | -- [3,2,2]
    |     |      |       | -- [3,2,2,2] => exceed
    |     |      | -- [3,2,3] => result here
    |     | -- [3,3]
    |     |      | -- [3,3,2] => result here
    |     | -- [3,5] => result here
    | -- [5]
    |     | -- [5,2]
    |     |      | -- [5,2,2] => exceed
    |     | -- [5,3] => result here
 */

console.log(combinationSum([2, 3, 5], 8));

// NOTE: CAN DO WITH DFS
