/**
 * Merge two paths started from root node
 * @param {import("../utils").NodeType[]} a path from root node
 * @param {NodeType[]} b path
 * @returns {NodeType[]} merged path from start => end
 */
const mergeToPathFromRoot = (a, b) => {
  const pathA = [...a];
  const pathB = [...b];

  if (!pathA.length || !pathB.length) return [];

  while (
    typeof pathA?.[1] === "object" &&
    typeof pathB?.[1] === "object" &&
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
 * @param {Array<import("../utils").NodeType>} path
 */
const printPath = (path) => {
  let str = `path from start (${DEFAULT_START}) to end (${DEFAULT_END}): `;
  path.forEach((node, idx) => {
    if (idx) str += " => ";
    str += node.value;
  });

  console.log(str);
  console.log("distance:", path.length - 1);
};

/**
 * Print out the beautified version of paths
 * @param {Array<Array<import("../utils").NodeType>>} paths
 */
const printPaths = (paths) => {
  let str = "";

  paths.forEach((p, id) => {
    str += `Root to leaf path ${id + 1}: `;
    p.forEach((node, idx) => {
      if (idx) str += " => ";
      str += node.value;
    });

    str += "\n";
  });
};

module.exports = {
  mergeToPathFromRoot,
  printPath,
  printPaths,
};
