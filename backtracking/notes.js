// backtracking follow this pattern
function backtracking() {
  // 1, return when result found to terminate all the recursion stack
  if (foundResut) return;

  // 2, (optional) return when current instance is not eligible
  if (isNotEligible) return;

  // 3, perform action with current instance and move to the next instance(step 2 can be eliminated here)
  performAction(currentInstance);
  backtracking(nextInstance);

  // 4, redo(backtrack) the wrong course of steps
  redo(currentInstance);
}
