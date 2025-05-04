export const OFFLINE = "offline";
export const ONLINE = "online";
export const ERROR = "error";
export const UNKNOWN = "unknown";

export type Status =
  | typeof OFFLINE
  | typeof ONLINE
  | typeof ERROR
  | typeof UNKNOWN;

export const MQTT_USERNAME = "tokendrink2025";
export const MQTT_PASSWORD = "ginosucksbigtime";

export type StatusMessage = {
  status: string;
};
