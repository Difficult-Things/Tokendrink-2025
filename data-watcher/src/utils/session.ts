import { TEAM_COLORS, TeamColor } from "../../../specifications/common";
import {
  BEER_NAME,
  ProductType,
  SODA_NAME,
  START_OF_TABLE,
} from "../../../specifications/products";
import { Generation } from "./generation";
import { getLinesFromPDF } from "./pdf";
import { getProductAndQuantity } from "./products";

export class Session {
  private generations: { [generation: string]: Generation } = {};

  async processPDFData(filePath: string): Promise<void> {
    const lines = await getLinesFromPDF(filePath);

    const tableStartIndex = lines.findIndex((line) =>
      line.includes(START_OF_TABLE)
    );

    if (tableStartIndex === -1) {
      console.error("No sales product name found");
      return;
    }

    console.log("Searching for sales product name in lines: ", lines);

    lines.slice(tableStartIndex + 1, lines.length - 1).forEach((line) => {
      const { product, quantity } = getProductAndQuantity(line);

      // Check if product is one of the known products // otherwise skip
      if (!product.includes(BEER_NAME) && !product.includes(SODA_NAME)) {
        console.warn("No known product found at:", product);
        return;
      }

      console.log("Found product: ", product, " with quantity: ", quantity);

      let gen: TeamColor;
      try {
        gen = product.split("_")[1].toLowerCase() as TeamColor;
      } catch (error) {
        console.error(
          "Error parsing generation from product: ",
          product,
          error
        );
        return;
      }

      console.log("Found generation: ", gen);

      const productName = product.split("_")[0].toLowerCase() as ProductType;
      this.generations[gen].setProduct(productName, quantity || 0);
    });
  }

  logData(): void {
    console.log("Gen, Beer, Soda, Score");
    console.log("===================================");

    for (const gen of Object.keys(this.generations)) {
      console.log("===================================");
      console.log("Generation: ", gen);
      console.log(this.generations[gen].getProducts());
      console.log(
        gen,
        ",",
        this.generations[gen].getProduct(BEER_NAME),
        ",",
        this.generations[gen].getProduct(SODA_NAME),
        ",",
        this.generations[gen].getScore()
      );
    }
  }

  getData(): {} {
    const data = [] as {
      gen: TeamColor;
      beer: number;
      soda: number;
      score: number;
    }[];
    for (const gen of Object.keys(this.generations)) {
      data.push({
        gen: gen as TeamColor,
        beer: this.generations[gen].getProduct(BEER_NAME),
        soda: this.generations[gen].getProduct(SODA_NAME),
        score: this.generations[gen].getScore(),
      });
    }

    return data;
  }

  constructor() {
    for (const color of TEAM_COLORS) {
      this.generations[color] = new Generation();
    }
  }
}
