const global_error = (err) => {
  setImmediate(() => {
    console.log(err);
    process.exit(1);
  }).unref();
};
process
  .on("SIGTERM", global_error.bind(null, new Error("Sigterm signal")))
  .on("SIGINT", global_error.bind(null, new Error("Sigint signal")))
  .on("uncaughtException", global_error);

let i = 0;
(function wait() {
  console.log(i++);
  setTimeout(wait, 1000);
})();
