/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
 * Note: that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let l = 0,
    r = prices.length - 1;
  let entry = prices[l],
    target = prices[r];

  // [7,1,5,3,6,4]
  // l = 0 , r = 1, pro = 0
  // r = 1  under_review
  // p[l] >= p[r] => l = r, r++
  // p[l] < p[r] => pro = Math.max(p[r] - p[l], pro); r++
  // p[l] < pr[r] => pro = Math.max(p[r] - p[l], pro); r++;
  // until r reach the end of the array
};
