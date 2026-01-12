/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  // sub-problem:
  // we can move one step with cost(current) < cost(next) and finish n - 1 steps later
  // with dp(n-1) cost
  // or two if cost(current) >= cost and finish the last n - 2 steps later with dp(n-2) cost
  // the minimum must be min(current cost 1 step + dp(n-1), current cost 2 step + dp(n-2))
  function dp(index = 0, memoize = new Map()) {
    if (index > cost.length - 1) {
      return 0;
    }

    if (!memoize.has(index)) {
      memoize.set(
        index,
        Math.min(
          cost[index] + dp(index + 1, memoize),
          (cost[index + 1] || 0) + dp(index + 2, memoize)
        )
      );
    }

    return memoize.get(index);
  }

  return dp();
};

// console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairsV2 = function (cost) {
  const len = cost.length
  const dp = new Array(len + 1).fill(0);
  dp[1] = cost[0] ?? 0;
  
  // sub-problem:
  // we can move one step with cost(current) < cost(next) and finish n - 1 steps later
  // with dp(n-1) cost
  // or two if cost(current) >= cost and finish the last n - 2 steps later with dp(n-2) cost
  // the minimum must be min(current cost 1 step + dp(n-1), current cost 2 step + dp(n-2))

  for (let i = 2; i <= len; i++) {
    dp[i] = Math.min(cost[i - 1] + dp[i - 1], cost[i - 2] + dp[i - 2]);
  }

  return dp[len]
};

console.log(minCostClimbingStairsV2([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
