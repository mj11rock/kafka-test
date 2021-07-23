module.exports = () => {
  const {KafkaStreams} = require("kafka-streams")
  const config = require("./config.json")
  const factory = new KafkaStreams(config)

  const stream = factory.getKStream("test-stream2")
  console.log("stream: ", stream)
  stream.forEach((message) => console.log("msg: ", message))
  stream.start().then(
    () => {
      console.log("stream started, as kafka consumer is ready.")
    },
    (error) => {
      console.log("streamed failed to start: " + error)
    }
  )

  // const ktable = factory.getKTable(/* .. */)
  // kstream
  //   .merge(ktable)
  //   .filter(/* .. */)
  //   .map(/* .. */)
  //   .reduce(/* .. */)
  //   .to("output-topic")
}
