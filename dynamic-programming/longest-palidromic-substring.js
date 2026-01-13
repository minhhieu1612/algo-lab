/**
Given a string s, return the longest palindromic substring in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (!s.length) return "";

  let maxLength = 0;
  let startIdx = 0;

  // bottom-up
  function dp(start = 0, len = 2, memoize = new Map()) {
    if (start + len > s.length) return false;

    // sub-problem:
    // if we have an eligible substring with start and end indices
    // in `s`, we call dp[start, end]
    // we need s[start] === s[end] and dp[start + 1, end - 1] sastisfy too
    // in case start + 1 === end - 1, the same char in string `s` => true
    // make sure to calculate dp[start + 1, end - 1] beforehand so we can
    // reuse result of child substring

    // this work was done so the other should be done too
    if (memoize.has(`${start}_${len}`)) return;

    const isPanlidrome =
      s[start] === s[start + len - 1] &&
      (len <= 3 || (len > 3 && memoize.get(`${start + 1}_${len - 2}`)));
    // can get from memoize cause of all children were calculated

    memoize.set(`${start}_${len}`, isPanlidrome);

    if (isPanlidrome && len > maxLength) {
      startIdx = start;
      maxLength = len;
    }

    // shift to next element
    dp(start + 1, len, memoize);

    // check larger substring
    dp(start, len + 1, memoize);
  }

  dp();

  return s.slice(startIdx, startIdx + maxLength);
};

// console.log(longestPalindrome("chgadadadadab")); // adadadada
// console.log(longestPalindrome("abbcccbbbcaaccbababcbcabca")); // cbababc
// console.log(longestPalindrome("lphntrsqudccteewsdmpjmgmfnxegawjclzobpnxdrvxeygafiwyqsvsecictqkmiqvrdjajfngvlhdezdpqpzjjzbhoyggrbkuzeocrpzqishvfairdvvabopyubfisxbrgnlughbrzunitwowvnsqhdtnkotitgxwzjhbgltksorygpdberdgzgvogrvwluhixfbrfhliedjylxuspjpitwlhdkneonreqrueqphirmgxtqumllqropaefddplspkrtkbmuvwkyryworojlvwzdlacuoqzokrmcgmwkopsbqjjkaoqjqbrderwzmhbhfgwvrjakyfeqcbtvlcgbsxkngymxyievihiskdmmppmmdksihiveiyxmygnkxsbgclvtbcqefykajrvwgfhbhmzwredrbqjqoakjjqbspokwmgcmrkozqoucaldzwvljorowyrykwvumbktrkpslpddfeaporqllmuqtxgmrihpqeurqernoenkdhlwtipjpsuxlyjdeilhfrbfxihulwvrgovgzgdrebdpgyrosktlgbhjzwxgtitokntdhqsnvwowtinuzrbhgulngrbxsifbuypobavvdriafvhsiqzprcoezukbrggyohbzjjzpqpdzedhlvgnfjajdrvqimkqtcicesvsqywifagyexvrdxnpbozlcjwagexnfmgmjpmdsweetccduqsrtnhpl"));

/**
 * @param {string} s
 * @return {string}
 */
function longestPalindromeV2(s) {
  if (s.length <= 1) return s;

  // sub-problem:
  // if we have an eligible substring with start and end indices
  // in `s`, we call dp[start, end]
  // we need s[start] === s[end] and dp[start + 1, end - 1] sastisfy too
  // in case start + 1 === end - 1, the same char in string `s` => true
  // make sure to calculate dp[start + 1, end - 1] beforehand so we can
  // reuse result of child substring

  let start = 0;
  let maxRange = 0;
  const dp = new Map();

  for (let len = 1; len <= s.length; len++) {
    for (let i = 0; i <= s.length - len; i++) {
      const j = i + len - 1;
      
      if (dp.has(`${i}_${j}`)) continue;

      dp.set(
        `${i}_${j}`,
        s[i] === s[j] &&
          (j <= i + 2 ||
            (j > i + 2 &&
              dp.has(`${i + 1}_${j - 1}`) &&
              dp.get(`${i + 1}_${j - 1}`)))
      );

      if (dp.get(`${i}_${j}`) && len > maxRange) {
        maxRange = len;
        start = i;
      }
    }
  }

  return s.slice(start, start + maxRange);
}

// console.log(longestPalindromeV2("chgadadadadab")); // adadadada
console.log(longestPalindromeV2("lphntrsqudccteewsdmpjmgmfnxegawjclzobpnxdrvxeygafiwyqsvsecictqkmiqvrdjajfngvlhdezdpqpzjjzbhoyggrbkuzeocrpzqishvfairdvvabopyubfisxbrgnlughbrzunitwowvnsqhdtnkotitgxwzjhbgltksorygpdberdgzgvogrvwluhixfbrfhliedjylxuspjpitwlhdkneonreqrueqphirmgxtqumllqropaefddplspkrtkbmuvwkyryworojlvwzdlacuoqzokrmcgmwkopsbqjjkaoqjqbrderwzmhbhfgwvrjakyfeqcbtvlcgbsxkngymxyievihiskdmmppmmdksihiveiyxmygnkxsbgclvtbcqefykajrvwgfhbhmzwredrbqjqoakjjqbspokwmgcmrkozqoucaldzwvljorowyrykwvumbktrkpslpddfeaporqllmuqtxgmrihpqeurqernoenkdhlwtipjpsuxlyjdeilhfrbfxihulwvrgovgzgdrebdpgyrosktlgbhjzwxgtitokntdhqsnvwowtinuzrbhgulngrbxsifbuypobavvdriafvhsiqzprcoezukbrggyohbzjjzpqpdzedhlvgnfjajdrvqimkqtcicesvsqywifagyexvrdxnpbozlcjwagexnfmgmjpmdsweetccduqsrtnhpl"));
