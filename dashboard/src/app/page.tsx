"use client";

import React, { useEffect } from "react";
import mqtt from "mqtt";

import { Control } from "@/components/control";
import { Header } from "@/components/header";
import { Stats } from "@/components/stats";
import { Status, OFFLINE, ONLINE, MQTT_USERNAME, MQTT_PASSWORD } from "@/types/network";
import NetworkState from "@/components/network-state";
import { Item } from "react-nestable";

export default function Home() {
  const [mqttClient, setClient] = React.useState<any>(null);

  const [pullenwandConnected, setPullenwandConnected] = React.useState<Status>(OFFLINE);
  const [maingameConnected, setMaingameConnected] = React.useState<Status>(OFFLINE);
  const [dataWatcherConnected, setDataWatcherConnected] = React.useState<Status>(OFFLINE);

  const [data, setData] = React.useState<any>(null);
  const [ranking, setRanking] = React.useState<Item[]>([]);

  useEffect(() => {
    if (mqttClient) {
      mqttClient.on("connect", () => {
        console.log("Connected");
        mqttClient.subscribe("game/status");
        mqttClient.subscribe("pullenwand/status");
        mqttClient.subscribe("data-watcher/#");

        mqttClient.publish("dashboard/status", "ONLINE", { qos: 1 });
      });

      mqttClient.on("close", () => {
        console.log("Connection closed");
      });

      mqttClient.on("error", (err: any) => {
        console.error("Connection error: ", err);
        mqttClient.end();
      });

      mqttClient.on("message", (topic: string, message: any) => {
        if (topic === "game/status") {
          setMaingameConnected(message.toString() as Status);
        }
        if (topic === "pullenwand/status") {
          setPullenwandConnected(message.toString() as Status);
        }
        if (topic === "data-watcher/status") {
          setDataWatcherConnected(message.toString() as Status);
        }
        if (topic === "data-watcher/data") {
          const json = JSON.parse(message.toString());
          console.log("Data: ", json);
          setData(json);
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
          mqttState={mqttClient ? ONLINE : OFFLINE}
          mainGameState={maingameConnected}
          pullenwandState={pullenwandConnected}
          dataWatcherState={dataWatcherConnected}
        />
        <p>Made with 💕 by the Difficult Things Committee</p>
      </footer>


    </main>
  );
}
