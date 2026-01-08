class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this._up(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._down(0);
    return root;
  }

  _up(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  _down(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
      if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;
      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

const mh = new MinHeap();

mh.push(3);
mh.push(0);
mh.push(-1);
mh.push(2);
mh.push(1);

console.log(mh.heap); // [ -1, 1, 0, 3, 2 ]
console.log(mh.pop(), mh.heap); // -1 [ 0, 1, 2, 3 ]
/**
  time complexity of up operator:
    1 => n/2^0
    2 => n/2^1
    3 => n/2^2
    x => 2 = n / 2^(x-1) => x = log(n)

  INSERT
  Step 1 — Insert at the end
    Insert: 2
    Array: [1, 4, 3, 7, 6, 5, 2]

    Tree:
            1
          /   \
        4     3
        / \   / \
      7   6 5   2

    ⚠️ Violation: 2 < 3 (parent)

  Step 2 — Swap with parent
    Swap 2 ↔ 3

    Array: [1, 4, 2, 7, 6, 5, 3]

    Tree:
            1
          /   \
        4     2
        / \   / \
      7   6 5   3


    ⚠️ Still violation: 2 < 1 ❌ → actually NO
    ✅ Heap property satisfied
*/

/*
  time complexity of down operator:
    1 => 2^1 + 2^0
    2 => 2^2 + 2^1 + 1
    3 => 2^3 + 2^2 + 2^1+ 1
    ...
    x => E(sum(2^x)) = n = 2^x - 1 => x = log(n + 1)

  INSERT
  Step 0 — Original Heap
    Array: [1, 4, 2, 7, 6, 5, 3]

    Tree:
            1
          /   \
        4     2
        / \   / \
      7   6 5   3

  Step 1 — Remove root, move last to root
    Remove 1 → Move 3 to root

    Array: [3, 4, 2, 7, 6, 5]

    Tree:
            3
          /   \
        4     2
        / \   /
      7   6 5


    ⚠️ Violation: 3 > 2

  Step 2 — Swap with smaller child
    Swap 3 ↔ 2

    Array: [2, 4, 3, 7, 6, 5]

    Tree:
            2
          /   \
        4     3
        / \   /
      7   6 5

  Step 3 — Continue sinking
    3 ≤ 5 → OK
    (no more violations)
*/