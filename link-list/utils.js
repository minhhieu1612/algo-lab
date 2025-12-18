const arrToList = (arr) => {
  const tempArr = arr.map((val) => ({ val, next: null }));
  tempArr.forEach((item, idx) => {
    item.next = tempArr[idx + 1] ?? null;
  });

  return tempArr[0];
};

const listToArr = (list) => {
  const arr = [];
  while (list.next) {
    arr.push(list);
    list = list.next;
  }

  return arr;
};

module.exports = {
  arrToList,
  listToArr
}