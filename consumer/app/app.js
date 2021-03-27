const { Kafka } = require("kafkajs");
const process = require("process");

async function init() {
  const app = {
    kafka: new Kafka({
      brokers: ["kafka3:19093", "kafka3:19093", "kafka3:19093"],
    }),
  };

  const consumer = app.kafka.consumer({
    groupId: process.env.CONSUMER_GROUP_ID,
  });
  await new Promise((r) => setTimeout(r, 15000));
  await consumer.connect();
  await consumer.subscribe({ topic: "test-stream2" });
  app.consumer = consumer;

  return app;
}

async function run(app) {
  let i = 0;
  let r = await app.consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message?.key?.toString(),
        value: message.value.toString(),
        headers: message.headers,
      });
      console.log(topic, partition);
    },
  });
  console.log(r);
  while (true) {
    await new Promise((r) => setTimeout(r, 1000));
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
