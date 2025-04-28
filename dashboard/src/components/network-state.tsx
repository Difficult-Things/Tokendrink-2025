"use client";

import { Status } from "@/types/network";

interface NetworkStateProps {
  mqttState: Status;
  mainGameState: Status;
  pullenwandState: Status;
  dataWatcherState: Status;
}

export default function NetworkState({
  mqttState,
  mainGameState,
  pullenwandState,
  dataWatcherState,
}: NetworkStateProps) {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">MQTT</h2>
          <p className={`text-sm ${getConnectionColor(mqttState)}`}>
            {getConnectionStatus(mqttState)}
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">Game</h2>
          <p className={`text-sm ${getConnectionColor(mainGameState)}`}>
            {getConnectionStatus(mainGameState)}
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">Pullenwand</h2>
          <p className={`text-sm ${getConnectionColor(pullenwandState)}`}>
            {getConnectionStatus(pullenwandState)}
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">Data Watcher</h2>
          <p className={`text-sm ${getConnectionColor(dataWatcherState)}`}>
            {getConnectionStatus(dataWatcherState)}
          </p>
        </div>
      </div>
    </div>
  );
}

const getConnectionStatus = (status: Status) => {
  switch (status) {
    case "ONLINE":
      return getConnectionIcon(status) + " Connected";
    case "OFFLINE":
      return getConnectionIcon(status) + " Disconnected";
    default:
      return getConnectionIcon(status) + " Unknown";
  }
}
const getConnectionIcon = (status: Status) => {
  switch (status) {
    case "ONLINE":
      return "✅";
    case "OFFLINE":
      return "❌";
    default:
      return "❓";
  }
}

const getConnectionColor = (status: Status) => {
  switch (status) {
    case "ONLINE":
      return "text-green-500";
    case "OFFLINE":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}