// backtracking pattern
function backtracking() {
  // 1, return when result found to terminate all the recursion stack
  if (foundResut) return;

  // 2, (optional) return when current instance is not eligible
  if (isNotEligible) return;

  // 3, perform action with current instance
  doAction(currentInstance);

  // 4, move to the next instance(step 2 can be eliminated here)
  // yes means can move to/ no means skip the next instance
  if (yes) backtracking(nextInstance);

  // 5, undo(backtrack) with the current instance
  undoAction(currentInstance);
}

// Notes: instance can be a range or an enumeration or can process next
// multiple instances
