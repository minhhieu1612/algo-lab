/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  console.log(a.toString(2), b.toString(2), (a + b).toString(2));
  const sameDirect = a * b >= 0;
  let c = 0;

  if (!a || !b) return a ^ b;

  // add bit
  // 0 + 0 => 0
  // 1 + 0 => 1
  // 1 + 1 => 0 has extra
  // shift bit left x level then unite with c
  // x depends on
  // c = 101; hasExtra = true; => c = 10101 => consume extra first
  // next round bit = 1 => c = 100101
  function add(a, b) {
    let digits = 1; // either a or b can have at least 1 digit
    let hasExtra = false;
    let result = 0;

    while (a || b) {
      let bit = 0;

      // both have 1 bit at last digit in their binary form
      // true = 101 & 111
      if (hasExtra) {
        if (a & b & 1) {
          bit = 1;
        } else {
          bit = ((a | b) & 1) ^ 1; // reverse of bit 1
          if (bit) hasExtra = false;
        }
      } else {
        if (a & b & 1) {
          hasExtra = true;
        } else {
          bit = (a | b) & 1;
        }
      }

      if (bit & 1) {
        bit = digits;
      }

      result = bit | result;
      a = a >> 1;
      b = b >> 1;
      digits = digits << 1;

      if (a === b && b === 0 && hasExtra) {
        result = digits | result;
      }
    }

    return result;
  }

  if (sameDirect) {
    if (a < 0) {
      c = -add(-a, -b);
    } else {
      c = add(a, b);
    }
  } else {
    function swap(x, y) {
      const temp = x;
      x = y;
      y = temp;

      return [x, y];
    }

    // try to achieve bigger - smaller and let isNegative
    // work as a flag to decide pos/neg of the return result
    let isNegative = false;

    if (a < 0) {
      a = -a;

      if (a > b) {
        isNegative = true;
      } else {
        [a, b] = swap(a, b);
      }
    } else {
      b = -b;

      if (a < b) {
        isNegative = true;
        [a, b] = swap(a, b);
      }
    }

    do {
      const borrow = ~a & b;
      console.log({
        a: a.toString(2),
        b: b.toString(2),
        borrow: borrow.toString(2),
      });
      a = a ^ b;
      b = borrow << 1;
    } while (b);

    c = isNegative ? -a : a;
  }

  return c;
};

function getSumV2(a, b) {
  // For add case (a and b have the same sign)
  // we can follow this formula: a + b = (a ^ b) + (a & b << 1)  (1)
  // a ^ b solve the sum between: 1 - 0 and 0 - 1
  // a & b << 1 is the carry part for sum of: 1 - 1 => 10 and 0 - 0 => 0

  // For subtract case (a has opposite sign compared with b)
  // The same formula (1) can be applied
  // a ^ b has two properties:
  // + the sign: 11..negative ^ 00..positive = 11..another_negative
  // + convert negative to two's complement and back to complete the XOR operation
  // for eg: 3 ^ -5 = 00..11 ^ -00..101 = 00..0011 ^ 11..1011(converted) 
  // = 11..1000 = -8
  // The carry (a & b << 1) has two properties:
  // + the sign: alway positive
  // + use two's complement to perform action:
  // for eg: 3 & -5 = 00..11 & -00..101 = 00..0011 & 11..1011(converted)
  // = 00..0011 = 3 => 00..0110 = 6
  // one round with XOR get 11..1000 and carry get 00..0110 in checking 
  // (a = 00..0011, b = 11..1011)

  // subtract bit table:
  // + a |-b | c |
  // +---+---+---+
  // + 0 | 0 | 0 |
  // + 1 | 0 | 1 |
  // + 0 | 1 |-1 | (borrow here)
  // + 1 | 1 | 0 |
  // +---+---+---+
  // if we flip bit and add 1(-b = ~b + 1):
  // + a |~b+1| c |
  // +---+----+---+
  // + 0 |  0 | 0 |
  // + 1 |  0 | 1 |
  // + 0 |  1 | 1 | (become normal addition)
  // + 1 |  1 | 0 | (become carry)
  // +---+----+---+
  while (b !== 0) {
    let carry = (a & b) << 1;

    console.log(a.toString(2), b.toString(2), carry.toString(2));
    a = a ^ b;
    b = carry;
  }

  return a;
}

console.log(getSumV2(3, -5));
// 3 => 11 => -3 = ~3 + 1 = 100 + 1 = 101
// -3 => 101 => 3 = ~-3 + 1 = 10 + 1 = 11
// -1000 ^ 110
// first flip -1000 = 111 then add 1 => 1000
// now xor the -1000 and 110 become -(1000 ^ 110) = 1110
// now flip back and add 1 to get the result = -(1 + 1) = -10(-2)
// a ^ -b => - (a ^ (b_flip + 1)) = -(c_flip + 1)

// convert to two's complement
// -3 ^ 7 = -11 ^ 111 = 11..101 ^ 00..111 = 11..010
// convert back from two's complement
// 11..010 => -00..101 => -00..110

// -3 ^ -7 = -11 ^ -111
// convert to two's complement
// -00..11 ^ -00..111 => 11..101 ^ 11..1001 = 00..100
// convert back
// 00..100 => 00..11 => 00..100