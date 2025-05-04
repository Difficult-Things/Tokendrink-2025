export type GenerationScore = {
  gen: string;
  beer: number;
  soda: number;
  score: number;
};

export const GenerationColours = ["red", "green", "blue", "purple", "orange"];

export type GenerationColour = (typeof GenerationColours)[number];

export const MAX_ROUNDS = 5;
