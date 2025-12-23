/**
 * Merge two paths started from root node
 * @param {number[]} pathA path from root node
 * @param {number[]} pathB path
 * @returns {number[]} merged path from start => end
 */
const mergeToPathFromRoot = (pathA, pathB) => {
  if (!pathA.length || !pathB.length) return [];

  while (
    typeof pathA?.[1] === "number" &&
    typeof pathB?.[1] === "number" &&
    pathA?.[1] === pathB?.[1]
  ) {
    pathA.shift();
    pathB.shift();
  }

  pathA.shift();

  return pathA.reverse().concat(pathB);
};

/**
 * Print out the beautified version of path
 * @param {Array<Array<number>>} path
 */
const printPath = (path) => {
  let str = `path from start (${DEFAULT_START}) to end (${DEFAULT_END}): `;
  path.forEach((num, idx) => {
    if (idx) str += " => ";
    str += num;
  });

  console.log(str);
  console.log("distance:", path.length - 1);
};

/**
 * Print out the beautified version of paths
 * @param {Array<Array<number>>} paths
 */
const printPaths = (paths) => {
  let str = "";

  paths.forEach((p, id) => {
    str += `Root to leaf path ${id + 1}: `;
    p.forEach((num, idx) => {
      if (idx) str += " => ";
      str += num;
    });

    str += "\n";
  });

  console.log(str);
};

module.exports = {
  mergeToPathFromRoot,
  printPath,
  printPaths,
};
