// Given a 2-d array with values represent as below:
// + -1 => start point
// + 0 => a cell can move to
// + 1 => a wall
// + 2 => exit point
// return the path from entry to exit(an array of coordinates)

/**
 * Get exit path
 * @param {number[][]} maze
 */
const getExitPath = (maze) => {
  console.log(maze);

  /** @type {{x: number, y: number}[]} */
  const path = [];
  const directions = [];
  let result = null;

  /**
  [
    [-1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 2],
  ]
  */
  /**
   * move to specific point if it is eligible => push to the path
   * @param {{ x: number, y: number }} coordinate
   */
  function processPoint(point = { x: 0, y: 0 }) {
    // exit was existed
    if (result) return;

    // out of range check
    if (
      point.y >= maze.length ||
      point.x >= maze[0].length ||
      point.x < 0 ||
      point.y < 0
    )
      return;

    // move forward whether it is a wall or a cell
    path.push(point);
    switch (maze[point.y][point.x]) {
      case 2: {
        result = { path: [...path], directions: [...directions] };
        return;
      }
      case -1:
      case 0:
        {
          const moveToPoints = [
            { x: point.x + 1, y: point.y }, // right
            { x: point.x, y: point.y + 1 }, // bottom
            { x: point.x - 1, y: point.y }, // left
            { x: point.x, y: point.y - 1 }, // top
          ];
          const guidances = ["right", "bottom", "left", "top"];

          moveToPoints.forEach((p, index) => {
            directions.push(guidances[index]);
            if (path.findIndex((_) => p.x === _.x && p.y === _.y) < 0) {
              processPoint(p);
            }
            directions.pop();
          });
        }
        break;
      case 1:
        break;
    }

    // move back
    path.pop();
  }

  processPoint();

  return result;
};

console.log(
  getExitPath([
    [-1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 2],
  ])
);
// {
//   path: [
//     { x: 0, y: 0 }, { x: 1, y: 0 },
//     { x: 1, y: 1 }, { x: 2, y: 1 },
//     { x: 3, y: 1 }, { x: 3, y: 0 },
//     { x: 4, y: 0 }, { x: 5, y: 0 },
//     { x: 5, y: 1 }, { x: 5, y: 2 },
//     { x: 5, y: 3 }, { x: 5, y: 4 }
//   ],
//   directions: [
//     'right',  'bottom',
//     'right',  'right',
//     'top',    'right',
//     'right',  'bottom',
//     'bottom', 'bottom',
//     'bottom'
//   ]
// }
