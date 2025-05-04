export const OFFLINE = "offline";
export const ONLINE = "online";

export type Status = typeof OFFLINE | typeof ONLINE | "unknown";

export const MQTT_USERNAME = "tokendrink2025";
export const MQTT_PASSWORD = "ginosucksbigtime";

export type StatusMessage = {
  status: string;
};
