/**
 *
 * @param {number[]} arr
 */
const allPossibleSubsets = (arr) => {
  const result = [];
  const length = arr.length;
  const visited = {};

  const recursion = (start = 0, end = length) => {
    // out of range check
    if (start >= length || end < start) {
      return;
    }

    // invalid check
    if (visited[`${start}_${end}`] || (start === end && visited["empty"]))
      return;

    if (start < end) {
      visited[`${start}_${end}`] = true;
    } else {
      // start === end
      visited["empty"] = true;
    }
    result.push(arr.slice(start, end));

    recursion(start + 1, end);
    recursion(start, end - 1);

    // result.pop(); take all so dont undo here
  };

  recursion();

  return result;
};

console.log(allPossibleSubsets([0, 1, 2, 3]));

/**
 *
 * @param {number[]} arr
 */
const allPossibleSubsetsV2 = (arr) => {
  const result = [];
  const path = [];
  const length = arr.length;

  const backtrack = (index = 0) => {
    // path is always valid
    result.push([...path]);

    for (let i = index; i < length; i++) {
      // skip the wrong order here
      // newly inserted must be the closest item of arr[i] in arr
      if (path.length && i > 0 && path[path.length - 1] !== arr[i - 1])
        continue;

      // do action
      path.push(arr[i]);

      // iterate
      backtrack(i + 1);

      // undo action
      path.pop();
    }
  };

  backtrack();

  return result;
};

console.log(allPossibleSubsetsV2([0, 1, 2, 3]));

function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(index) {
    // every state is a valid subset
    result.push([...path]);

    for (let i = index; i < nums.length; i++) {
      // choose
      path.push(nums[i]);

      // explore
      backtrack(i + 1);

      // unchoose (backtrack)
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

// console.log(subsets([0, 1, 2, 3]));
