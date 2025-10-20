/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // abdcba
  // _bdcb_
  // __dc__
  // __##__ => return
  // adccba
  // _dccb_
  // _#dc#_ => return
  // r, l are initialized at both ends of the string array
  // main condition: str[l] === str[r]
  // loop condition: l < r
  // when both conditions are not met: break the loop
  // check l >= r: true means the str are satisfied the requirement of the problem and vice versa

  // fc: first char code
  String.prototype.fc = function () {
    return this.charCodeAt(0);
  };

  const len = s.length;
  const codeA = "A".fc();
  const codea = "a".fc();
  const codeZ = "Z".fc();
  const codez = "z".fc();
  const code0 = "0".fc();
  const code9 = "9".fc();

  let l = 0,
    r = len - 1;

  function isAlphaNumericChar(c) {
    return (
      (c >= codeA && c <= codeZ) ||
      (c >= codea && c <= codez) ||
      (c >= code0 && c <= code9)
    );
  }

  while (l < r) {
    if (!isAlphaNumericChar(s[l].fc())) {
      l++;
      continue;
    }
    if (!isAlphaNumericChar(s[r].fc())) {
      r--;
      continue;
    }

    if (s[l].toLowerCase() === s[r].toLowerCase()) {
      l++;
      r--;
    } else {
      break;
    }
  }

  return l >= r;
  // optimization: replace the initilization of new string 
  // just use char code to work with different kind of chars 
  // time complexity: T(n)
  // space complexity: S(1)
};

console.log(isPalindrome("race a car"));
