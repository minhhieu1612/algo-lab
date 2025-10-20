/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let l = 0,
    r = 1;
  // [001122]
  // [010122] l=1 r=2
  // [012102] l=2 r=4

  while (r < nums.length) {
    while (nums[r] === nums[l]) r++;
    // swap
    if (r < nums.length) {
      l++;
      const tmp = nums[r];
      nums[r] = nums[l];
      nums[l] = tmp;
    }
    r++;
  }

  return l + 1;
};

removeDuplicates([1, 1]);
