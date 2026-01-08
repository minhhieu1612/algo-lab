class CustomHeap {
  // min heap by default
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator;
  }

  push(num) {
    this.heap.push(num);
    this.up(this.heap.length - 1);
  }

  peek() {
    return this.heap[0];
  }

  up(i) {
    let childIdx = i;

    while (childIdx > 0) {
      const parentIndex = Math.floor((childIdx - 1) / 2);

      if (this.comparator(this.heap[parentIndex], this.heap[childIdx]) <= 0) {
        break;
      }

      this.swapIndex(parentIndex, childIdx);
      childIdx = parentIndex;
    }
  }

  swapIndex(idx1, idx2) {
    const temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.down(0);
    return root;
  }

  down(i) {
    const length = this.heap.length;

    while (true) {
      let parIdx = i; // parent index
      const lcIdx = 2 * i + 1; // left child index
      const rcIdx = 2 * i + 2; // right child index

      // children are smaller/bigger => swap
      if (
        lcIdx < length &&
        this.comparator(this.heap[parIdx], this.heap[lcIdx]) > 0
      ) {
        parIdx = lcIdx;
      }
      if (
        rcIdx < length &&
        this.comparator(this.heap[parIdx], this.heap[rcIdx]) > 0
      ) {
        parIdx = rcIdx;
      }

      if (parIdx === i) return;

      this.swapIndex(i, parIdx);

      i = parIdx;
    }
  }

  size() {
    return this.heap.length;
  }
}

class KthLargest {
  constructor(k, nums) {
    this.kMinHeap = new CustomHeap();
    this.k = k;

    nums.forEach((num) => {
      this.add(num);
    });

    return null;
  }

  add(val) {
    if (this.kMinHeap.size() < this.k) {
      this.kMinHeap.push(val);
    } else if (val > this.kMinHeap.peek()) {
      this.kMinHeap.pop();
      this.kMinHeap.push(val);
    }

    return this.kMinHeap.peek();
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param1 = obj.add(val)
 */

const obj = new KthLargest(3, [4, 5, 8, 2]);

console.log(obj.add(3)); // 4
console.log(obj.add(5)); // 5
console.log(obj.add(10)); // 5
console.log(obj.add(9)); // 8
console.log(obj.add(4)); // 8

// ========= USE HASH MAP ==============
// store the range of numbers inside an array based on index and count the occured value
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargestV2 = function (k, nums) {
  this.shift = 10000;
  let maxVal = 2 * 10000;
  this.counts = Array(maxVal + 1);
  this.counts[maxVal] = 0;
  this.k = k;
  this.curK = maxVal;
  this.prevCount = 0;
  this.size = 0;
  for (num of nums) {
    this.add(num);
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargestV2.prototype.add = function (v) {
  let val = v + this.shift;
  if (this.size < this.k) {
    if (val < this.curK) {
      this.prevCount += this.counts[this.curK];
      if (this.counts[val]) {
        this.counts[val]++;
      } else {
        this.counts[val] = 1;
      }
      this.size++;
      this.curK = val;
    } else if (val === this.curK) {
      this.counts[val]++;
      this.size++;
    } else {
      this.prevCount++;
      if (this.counts[val]) {
        this.counts[val]++;
      } else {
        this.counts[val] = 1;
      }
      this.size++;
    }
  } else {
    if (val > this.curK) {
      if (this.counts[val]) {
        this.counts[val]++;
      } else {
        this.counts[val] = 1;
      }
      this.prevCount++;
      if (this.prevCount === this.k) {
        for (let i = this.curK + 1; i < this.counts.length; i++) {
          if (this.counts[i]) {
            this.prevCount -= this.counts[i];
            this.curK = i;
            break;
          }
        }
      }
    }
  }
  return this.curK - this.shift;
};

// const obj = new KthLargestV2(3, [4, 5, 8, 2]);

// console.log(obj.add(3)); // 4
// console.log(obj.add(5)); // 5
// console.log(obj.add(10)); // 5
// console.log(obj.add(9)); // 8
// console.log(obj.add(4)); // 8
