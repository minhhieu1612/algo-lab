const fibo = (num) => {
  if ([0, 1].includes(num)) return num;

  return fibo(num - 1) + fibo(num - 2);
};

// const a = fibo(6)

// console.log(a)

const twoSum = (arr, target) => {
  const sorted = arr.sort((a, b) => a - b)
  

  return sorted
};

console.log(twoSum([1, 2, 0, 4, 11, 7]), 13);
// 1, 4