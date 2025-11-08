/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const close = {
    round: ")",
    square: "]",
    normal: "}",
  };
  const open = {
    round: "(",
    square: "[",
    normal: "{",
  };

  let i = 0;

  while (i < s.length) {
    switch (s[i]) {
      case open.round:
      case open.square:
      case open.normal:
        stack.push(s[i]);
        break;
      case close.round:
        if (open.round !== stack.pop()) {
          return false;
        }
        break;
      case close.square:
        if (open.square !== stack.pop()) {
          return false;
        }
        break;
      case close.normal:
        if (open.normal !== stack.pop()) {
          return false;
        }
        break;
    }
    i++;
  }

  return stack.length === 0;
};

console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("([)]")); // false
