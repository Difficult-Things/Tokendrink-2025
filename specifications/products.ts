export const BEER_BLUE = "Beer_Blue";
export const BEER_RED = "Beer_Red";
export const BEER_GREEN = "Beer_Green";
export const BEER_ORANGE = "Beer_Orange";
export const BEER_PURPLE = "Beer_Purple";

export const SODA_BLUE = "Soda_Blue";
export const SODA_RED = "Soda_Red";
export const SODA_GREEN = "Soda_Green";
export const SODA_ORANGE = "Soda_Orange";
export const SODA_PURPLE = "Soda_Purple";

export const START_OF_TABLE = "Sales product name";
// export const BEER_NAME = "beer";
// export const SODA_NAME = "soda";

export const BEER_NAME = "cassis";
export const SODA_NAME = "coca-cola";

export const BEER_SCORE = 1;
export const SODA_SCORE = 1;

// ProductType is a union of all product names
export type ProductType = typeof BEER_NAME | typeof SODA_NAME;
