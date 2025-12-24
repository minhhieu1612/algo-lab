const measureTime = (label, invoker) => {
  const start = performance.now();
  invoker();
  console.log(`${label} took: ${performance.now() - start}ms`);
};

module.exports = {
  measureTime,
};
