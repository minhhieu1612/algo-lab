/**
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

Constraints:

1 <= n <= 45
*/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  function dp(remainning = n, memoize = {}) {
    if (remainning === 2) {
      return 2;
    }

    if (remainning === 1) return 1;

    if (remainning <= 0) return 0;

    if (!memoize[remainning]) {
      memoize[remainning] =
        dp(remainning - 1, memoize) + dp(remainning - 2, memoize);
    }

    return memoize[remainning];
  }

  return dp();
};

console.log(climbStairs(44));
/**
0
| -- +1
|    | -- +1+1
|    |      | -- +1+1+1 = 3 // result here exit
|    | -- +1+2 = 3 // result here
| -- +2
*/
