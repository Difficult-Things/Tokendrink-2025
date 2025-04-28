export type GenerationScore = {
  colour: string;
  beers: number;
  sodas: number;
  score: number;
};

export const GenerationColours = [
  "red",
  "green",
  "blue",
  "purple",
  "orange",
  "gray",
];

export type GenerationColour = (typeof GenerationColours)[number];

export const MAX_ROUNDS = 5;
