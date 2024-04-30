module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  console.log(globalThis.__TEARDOWN_MESSAGE__);

  // Stop the API server initiated in global-setup
  if (globalThis.__SERVER_PROCESS__) {
    globalThis.__SERVER_PROCESS__.kill();
  }
};
