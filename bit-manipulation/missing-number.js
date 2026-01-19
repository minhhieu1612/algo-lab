/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let n = 0;

  for (let i = 0; i < nums.length; i++) {
    n ^= nums[i] ^ (i + 1);
  }

  return n;
};
