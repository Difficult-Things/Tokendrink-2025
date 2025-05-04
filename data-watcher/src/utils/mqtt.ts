import mqtt from "mqtt";
import { Session } from "./session";
import {
  MQTT_PASSWORD,
  MQTT_USERNAME,
  TOPIC_DATA_WATCHER_DATA,
  TOPIC_DATA_WATCHER_STATUS,
} from "../../../specifications/mqtt";

export class MqttClient {
  client: mqtt.MqttClient | null = null;

  constructor() {
    this.client = mqtt.connect("mqtt://localhost:1883", {
      clientId: "data-watcher-" + Math.random().toString(16).substr(2, 8),
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
      will: {
        topic: TOPIC_DATA_WATCHER_STATUS,
        payload: Buffer.from(
          JSON.stringify({
            status: "offline",
          })
        ),
        qos: 1,
        retain: true,
      },
    });

    this.client.on("connect", () => {
      console.log("Connected to MQTT server");
      this.client?.publish(
        TOPIC_DATA_WATCHER_STATUS,
        JSON.stringify({
          status: "online",
        }),
        {
          qos: 1,
          retain: true,
        }
      );
    });

    this.client.on("error", (error) => {
      console.error("MQTT error: ", error);
    });

    this.client.on("close", () => {
      console.info("Connection closed");
    });
  }

  sendUpdatedSession(session: Session) {
    if (!session) {
      console.error("Session is null or undefined");
      return;
    }

    if (!this.client) {
      console.error("MQTT client is not connected");
      return;
    }

    this.client.publish(
      TOPIC_DATA_WATCHER_DATA,
      JSON.stringify(session.getData()),
      { qos: 1, retain: true },
      (error) => {
        if (error) {
          console.error("Error publishing message: ", error);
        } else {
          console.log("Message published successfully");
        }
      }
    );
  }

  sendOfflineStatus() {
    if (!this.client) {
      console.error("MQTT client is not connected");
      return;
    }

    this.client.publish(
      TOPIC_DATA_WATCHER_STATUS,
      JSON.stringify({
        status: "offline",
      }),
      { qos: 1, retain: true },
      (error) => {
        if (error) {
          console.error("Error publishing message: ", error);
        } else {
          console.log("Offline status published successfully");
        }
      }
    );
  }
}
