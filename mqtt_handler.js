const mqtt = require('mqtt');
// const server = require('./index')

// var io = require('socket.io')(server);

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://192.168.1.63';
    this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
    this.password = 'YOUR_PASSWORD';
  }
  
  connect(socket) {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host,{clientId:"mqttjs01"});

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('salida', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', (topic, message) => {
      socket.emit('evento', {message: message.toString()})
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message , socket) {
    this.mqttClient.publish('entrada', message);
  }
}

module.exports = MqttHandler;