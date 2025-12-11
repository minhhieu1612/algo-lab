/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // l = 0, r = 0, set = {} ;
  // set.add(s[l])
  // set contains s[r]
  // => l++ until s[l] == s[r], remove set s[l] concurrently
  // set !contains s[r] => r++
  // set is sliding window in this case, l and r are its sides

  if (s.length < 2) return s.length;

  let l = 0,
    r = 1,
    set = new Set(s[0]),
    max = 1;

  while (l <= r && r < s.length) {
    if (!set.has(s[r])) {
      set.add(s[r]);
      r++;
    } else {
      set.delete(s[l]);
      l++;
    }
    max = Math.max(max, set.size);
  }

  return max;
};

console.log(lengthOfLongestSubstring("au"));
