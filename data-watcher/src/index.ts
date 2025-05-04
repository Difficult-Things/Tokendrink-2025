import chokidar from "chokidar";

import fs from "fs";
import path from "path";

import { Session } from "./utils/session";
import { MqttClient } from "./utils/mqtt";

var argv = require("minimist")(process.argv.slice(2));

const session = new Session();
const mqtt = new MqttClient();

// Path to watch
const DEFAULT_PATH = path.join(process.cwd(), "tokendrink-pubcard-data");
const pathToWatch = argv.path || DEFAULT_PATH;

// Check if path is specified
if (!argv.path) {
  console.log("No path specified, using default path: ", DEFAULT_PATH);
}

// Clean data folder
if (fs.existsSync(pathToWatch)) {
  console.log("Data folder cleaned.");
  if (argv.clean) fs.rmSync(pathToWatch, { recursive: true });
}
fs.mkdirSync(pathToWatch, { recursive: true });

// Start watcher
console.log("Watching path: ", pathToWatch);
const watcher = chokidar.watch(pathToWatch, {
  persistent: true,
  ignoreInitial: true,
});

// On Watcher ready
watcher.on("ready", () => {
  console.log("Ready to watch for changes!");
  console.log("Monitoring path: ", pathToWatch);
});

// On file added
watcher.on("add", async (filePath) => {
  const time = new Date().toLocaleTimeString();
  console.log(`${time}: File ${filePath} has been added.`);

  // Check if filetype is pdf
  if (!filePath.endsWith(".pdf")) return;

  try {
    session.processPDFData(filePath);
    session.logData();

    mqtt.sendUpdatedSession(session);
  } catch (err) {
    console.error(err);
  }
});

process.on("exit", () => {
  mqtt.sendOfflineStatus();
});

process.on("SIGINT", () => {
  mqtt.sendOfflineStatus();
  process.exit(0);
});

process.on("SIGTERM", () => {
  mqtt.sendOfflineStatus();
  process.exit(0);
});
