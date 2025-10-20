/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // l represents the corrected element
  // r is repsponsible for scanning
  // condition nums[l] == 0 && nums[r] != 0
  // loop condition l < r < nums.length
  // swap when both conditions are met then take action and increase l
  // [0,1,0,3,12]
  // [1,0,0,3,12]
  // [1,3,0,0,12]
  // [1,3,12,0,0]
  // [1,1,0,3,12]

  let l = 0,
    r = 1;

  while (r < nums.length) {
    if (nums[r] !== 0 && nums[l] === 0) {
      nums[l] = nums[r];
      nums[r] = 0;
      l++;
    }

    r++;
  }
};

moveZeroes([0, 1, 0, 3, 12]);
