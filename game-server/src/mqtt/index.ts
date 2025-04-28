import Aedes, { AuthenticateError } from "aedes";
import {
  MQTT_PASSWORD,
  MQTT_USERNAME,
} from "../../../specifications/common.ts";

const aedes = new Aedes();
const server = require("net").createServer(aedes.handle);
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const mqttPort = 1883;
const websocketPort = 8888;

const authorizedClients = new Set();

aedes.authenticate = (client, username, password, callback) => {
  if (
    username === MQTT_USERNAME &&
    (password ?? "").toString() === MQTT_PASSWORD
  ) {
    authorizedClients.add(client.id);
    console.log(
      "Client authenticated: " + (client ? client.id : client) + " ",
      "to broker",
      aedes.id
    );
    callback(null, true);
  } else {
    console.log(
      "Client authentication failed: " + (client ? client.id : client) + " ",
      "to broker",
      aedes.id
    );
    callback(
      { returnCode: 1, message: "Authentication failed" } as AuthenticateError,
      false
    );
  }
};

aedes.authorizePublish = (client, packet, callback) => {
  if (client && authorizedClients.has(client.id)) {
    callback(null);
  } else {
    callback(new Error("Unauthorized for publishing"));
  }
};

aedes.on("subscribe", function (subscriptions, client) {
  console.log(
    "MQTT client :" +
      (client ? client.id : client) +
      " subscribed to topics: " +
      subscriptions.map((s) => s.topic).join("\n"),
    "from broker",
    aedes.id
  );
});

aedes.on("unsubscribe", function (subscriptions, client) {
  console.log(
    "MQTT client :" +
      (client ? client.id : client) +
      " unsubscribed to topics: " +
      subscriptions.join("\n"),
    "from broker",
    aedes.id
  );
});

aedes.on("client", function (client) {
  console.log(
    "Client Connected: " + (client ? client.id : client) + " ",
    "to broker",
    aedes.id
  );
});

aedes.on("clientDisconnect", function (client) {
  console.log(
    "Client Disconnected: " + (client ? client.id : client) + " ",
    "to broker",
    aedes.id
  );
  authorizedClients.delete(client.id);
});

aedes.on("publish", async function (packet, client) {
  console.log(
    "Client :" +
      (client ? client.id : "BROKER_" + aedes.id) +
      " has published ",
    packet.payload.toString(),
    " on ",
    packet.topic,
    " to broker",
    aedes.id
  );
});

server.listen(mqttPort, () => {
  console.log("MQTT server started and listening on port", mqttPort);
});

ws.createServer({ server: httpServer }, aedes.handle);
httpServer.listen(websocketPort, () => {
  console.log("Websocket server listening on port", websocketPort);
});
