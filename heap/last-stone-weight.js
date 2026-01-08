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

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const maxHeap = new CustomHeap((a, b) => b - a);
  const minHeap = new CustomHeap();

  stones.forEach((val) => {
    maxHeap.push(val);
  });

  while (maxHeap.size() + minHeap.size() > 1) {
    if (minHeap.size() < 2) {
      minHeap.push(maxHeap.pop());
    } else {
      const x = minHeap.pop();
      const y = minHeap.pop();
      const diff = y - x;

      if (diff) {
        maxHeap.push(diff);
      }
    }
  }

  return maxHeap.size() ? maxHeap.peek() : 0;
};

console.log(lastStoneWeight([3,1])); // 1
