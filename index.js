const express = require("express");
const http = require('http');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

const server = http.createServer(app);

io = require('socket.io').listen(server);

const mqttHandler = require('./mqtt_handler');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const mqttClient = new mqttHandler();
mqttClient.connect(io);

// Routes
app.post("/send-mqtt", function(req, res) {
  mqttClient.sendMessage(req.body.message);
  res.status(200).send("Message sent to mqtt");
});

app.get("/socket", function(req, res) {
  // io.emit("evento", {message: "Hola socket!"})
  res.status(200).send("Socket sent")
})


server.listen(3000, () => console.log(`Listening on port 3000`));

module.exports = server