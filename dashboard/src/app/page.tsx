"use client";

import React, { useEffect } from "react";
import mqtt from "mqtt";

import { Control } from "@/components/control";
import { Header } from "@/components/header";
import { Stats } from "@/components/stats";
import { Status, MQTT_USERNAME, MQTT_PASSWORD, OFFLINE, ONLINE, StatusMessage } from "@/types/network";
import NetworkState from "@/components/network-state";
import { Item } from "react-nestable";

export default function Home() {
  const [mqttClient, setClient] = React.useState<mqtt.MqttClient | null>(null);

  const [mqttConnected, setMqttConnected] = React.useState<Status>(OFFLINE);
  const [pullenwandConnected, setPullenwandConnected] = React.useState<Status>(OFFLINE);
  const [maingameConnected, setMaingameConnected] = React.useState<Status>(OFFLINE);
  const [dataWatcherConnected, setDataWatcherConnected] = React.useState<Status>(OFFLINE);

  const [data, setData] = React.useState<any>(null);
  const [ranking, setRanking] = React.useState<Item[]>([]);

  useEffect(() => {
    if (mqttClient) {
      mqttClient.on("connect", () => {
        console.log("MQTT Connected");
        setMqttConnected(ONLINE);

        mqttClient.subscribe("game/status");
        mqttClient.subscribe("pullenwand/status");
        mqttClient.subscribe("data-watcher/#");

        mqttClient.publish("dashboard/status", JSON.stringify({
          status: "online",
        }), { qos: 1, retain: true });
      });

      mqttClient.on("close", () => {
        console.log("MQTT Connection closed");
        setMqttConnected(OFFLINE);
      });

      mqttClient.on("error", (err: any) => {
        console.error("Connection error: ", err);
        mqttClient.end();
        setMqttConnected(OFFLINE);
      });

      mqttClient.on("message", (topic: string, message: Buffer, packet: mqtt.IPublishPacket) => {
        if (topic.includes("/status")) {
          const statusMessage = JSON.parse(message.toString()) as StatusMessage;

          if (topic.includes("game/")) {
            setMaingameConnected(statusMessage.status as Status);
          }
          else if (topic.includes("pullenwand/")) {
            setPullenwandConnected(statusMessage.status as Status);
          }
          else if (topic.includes("data-watcher/")) {
            setDataWatcherConnected(statusMessage.status as Status);
          }
        }

        if (topic.includes("/data")) {
          if (topic.includes("data-watcher/")) {
            try {
              const data = JSON.parse(message.toString());
              setData(data);
            } catch (error) {
              console.error("Error parsing data: ", error);
            }
          }
        }
      });
    }
  }, [mqttClient]);

  useEffect(() => {
    setClient(mqtt.connect({
      protocol: "ws",
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
      port: 8888,
      clientId: "dashboard-" + Math.random().toString(16).slice(2),
      will: {
        topic: "dashboard/status",
        payload: Buffer.from(JSON.stringify({
          status: "offline",
        })),
        qos: 1,
        retain: true,
      },
    }));
  }, []);

  return (
    <main className="min-h-screen flex flex-col" >
      <div className="flex-grow-0 flex-shrink basis-auto">
        <Header />
      </div>

      <div className="flex-grow flex-shrink basis-auto">
        <div className="flex flex-row">
          <div className="flex-grow flex-shrink basis-0 mx-4 rounded-lg border">
            <Control mqttClient={mqttClient} ranking={ranking} setRanking={setRanking} />
          </div>
          <div className="flex-grow flex-shrink basis-0 mx-4 rounded-lg border">
            <Stats data={data} setRanking={setRanking} />
          </div>
        </div>
      </div>

      <footer className="flex justify-between items-center p-4 mx-8">
        <p className="text-sm">© {new Date().getFullYear()} TOKENDRINK</p>
        <NetworkState
          mqttState={mqttConnected}
          mainGameState={mqttConnected ? maingameConnected : "unknown"}
          pullenwandState={mqttConnected ? pullenwandConnected : "unknown"}
          dataWatcherState={mqttConnected ? dataWatcherConnected : "unknown"}
        />
        <p>Made with 💕 by the Difficult Things Committee</p>
      </footer>


    </main>
  );
}
