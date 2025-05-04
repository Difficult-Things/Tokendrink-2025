export const TEAM_COLORS = [
  "orange",
  "green",
  "purple",
  "blue",
  "red",
] as const;
export type TeamColor = (typeof TEAM_COLORS)[number];
