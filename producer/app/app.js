const { Kafka } = require("kafkajs");
const process = require("process");

async function init() {
  const app = {
    global_error: (err) => {
      setImmediate(() => {
        console.log(err);
        process.exit(1);
      }).unref();
    },
    kafka: new Kafka({
      brokers: ["kafka3:19093", "kafka3:19093", "kafka3:19093"],
    }),
  };
  await new Promise((r) => setTimeout(r, 15000));
  process
    .on("SIGTERM", app.global_error.bind(app, new Error("Sigterm signal")))
    .on("SIGINT", app.global_error.bind(app, new Error("Sigint signal")))
    .on("uncaughtException", app.global_error);
  process.on("exit", app.global_error.bind(app, new Error("Sigterm signal")));

  const producer = app.kafka.producer();
  await producer.connect();
  app.producer = producer;

  return app;
}

async function run(app) {
  let i = 0;
  while (true) {
    i++;
    console.log("Sending " + String(i));
    let result = await app.producer.send({
      topic: "test-stream2",
      messages: [{ value: "my-value #" + String(i) }],
      acks: 1,
    });
    console.log(result);
    await new Promise((r) => {
      setTimeout(r, 100);
    });
  }
}

module.exports = async () => {
  const app = await init();
  try {
    await run(app);
    console.log("EXIT");
    process.exit(0);
  } catch (e) {
    app.global_error(e);
  }
};
