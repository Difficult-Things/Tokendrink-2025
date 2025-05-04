import { TEAM_COLORS, TeamColor } from "../../../specifications/common";
import {
  BEER_NAME,
  ProductType,
  SODA_NAME,
  START_OF_TABLE,
} from "../../../specifications/products";
import { Generation } from "./generation";
import { getProductAndQuantity } from "./products";

export class Session {
  private generations: { [generation: string]: Generation } = {};

  async processPDFData(filePath: string): Promise<void> {
    // const lines = await getLinesFromPDF(filePath);

    const lines = [
      "",
      "",
      "Session report",
      "GMM session",
      "Report print date: 4/28/2025 7:36:09 PM",
      "ReferenceTypeStart dateStarted byEnd dateEnded byVisitors",
      "#01356GMM4/28/2025 4:45:00 PMNeomi van KuijkSession not ended9",
      "Total revenue",
      "GrossDiscountNet",
      "€ 42.05€ 0.00€ 42.05",
      "Revenue per VAT rate",
      "VAT rateRevenue amount (excl. VAT)VAT amountRevenue amount (incl. VAT)",
      "21.00%€ 30.69€ 6.46€ 37.15",
      "9.00%€ 4.49€ 0.41€ 4.90",
      "€ 35.18€ 6.87€ 42.05",
      "Revenue per sales product",
      "Sales product nameQuantityGrossDiscountNet",
      "Cassis_Blue1€ 0.74€ 0.00€ 0.74",
      "Coca-Cola_Red4€ 2.80€ 0.00€ 2.80",
      "Corona5€ 10.90€ 0.00€ 10.90",
      "Custom Pul0€ 0.00€ 0.00€ 0.00",
      "Delirium Tremens1€ 2.77€ 0.00€ 2.77",
      "Glas Hertog Jan2€ 2.00€ 0.00€ 2.00",
      "€ 42.05€ 0.00€ 42.05",
      "28-04-2025, 19:36Session report - Pubcard",
      "https://app.pubcard.nl/Admin/Sessions/Report/10363?returnPage=11/2",
      "",
      "Ijsbad1€ 4.12€ 0.00€ 4.12",
      "Kasteel Rouge7€ 17.36€ 0.00€ 17.36",
      "Liefmans0€ 0.00€ 0.00€ 0.00",
      "Liefmans 0.01€ 1.36€ 0.00€ 1.36",
      "€ 42.05€ 0.00€ 42.05",
      "Revenue per payment method",
      "Payment methodNumber of transactionsAmount",
      "Token20€ 42.05",
      "20€ 42.05",
      "Account charges",
      "Per payment method",
      "Payment methodNumber of chargesTotal amount",
      "PIN (Charge)1€ 5.00",
      "1€ 5.00",
      "28-04-2025, 19:36Session report - Pubcard",
      "https://app.pubcard.nl/Admin/Sessions/Report/10363?returnPage=12/2",
    ];

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
