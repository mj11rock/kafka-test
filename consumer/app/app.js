const {Kafka} = require("kafkajs")
const process = require("process")

async function init() {
  const app = {
    kafka: new Kafka({
      brokers: ["kafka3:19093", "kafka3:19093", "kafka3:19093"],
    }),
  }

  const consumer = app.kafka.consumer({
    groupId: "all1",
  })
  await new Promise((r) => setTimeout(r, 5000))
  await consumer.connect()
  await consumer.subscribe({topic: "test-stream2"})
  app.consumer = consumer

  return app
}

async function run(app) {
  console.log("run function")
  let i = 0
  let r = await app.consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      console.log("=== in R ===")
      console.log({
        key: message?.key?.toString(),
        value: message.value.toString(),
        headers: message.headers,
      })
      console.log(topic, partition)
    },
  })
  console.log("r is ", r)
  while (true) {
    // console.log("in while loop\n\n")
    await new Promise((r) => {
      // console.log("in promise", r())
      setTimeout(r, 15000)
    })
  }
}

module.exports = async () => {
  const app = await init()
  try {
    await run(app)
    console.log("EXIT")
    process.exit(0)
  } catch (e) {
    app.global_error(e)
  }
}
