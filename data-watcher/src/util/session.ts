import { TEAM_COLORS, TeamColor } from "../../../specifications/common";
import { ProductType } from "../../../specifications/products";
import { Generation } from "./generation";

export class Session {
  private generations: { [generation: string]: Generation } = {};

  processPDF(text: string): void {
    const lines = text.split("\n");
    const tableStartIndex = lines.findIndex((line) =>
      line.includes("Sales product name")
    );

    if (tableStartIndex === -1) {
      console.error("No sales product name found");
      return;
    }

    const table = lines.slice(tableStartIndex + 1, lines.length - 1);
    table.forEach((line) => {
      const [product, amount] = line.split(" ");

      // Check if product is one of the known products // otherwise skip
      if (!product.includes("Beer") && !product.includes("Soda")) return;

      const type = product.includes("Beer") ? "beer" : ("soda" as ProductType);

      let gen: TeamColor | undefined;
      if (type === "beer") {
        gen = product.split("_")[0].toLowerCase() as TeamColor;
      } else if (type === "soda") {
        gen = product.split("_")[1].toLowerCase() as TeamColor;
      }

      if (!gen) return;

      console.log(gen, type, amount);

      this.generations[gen].setProduct(type, parseInt(amount));
    });
  }

  showData(): void {
    for (const gen of Object.keys(this.generations)) {
      console.log(
        gen,
        this.generations[gen].getProduct("beer"),
        this.generations[gen].getProduct("soda"),
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
        beer: this.generations[gen].getProduct("beer"),
        soda: this.generations[gen].getProduct("soda"),
        score: this.generations[gen].getScore(),
      });
    }

    return data;
  }

  constructor() {
    // for (const gen of allGenerations) {
    //   this.generations[gen] = new Generation();
    // }
    for (const color of TEAM_COLORS) {
      this.generations[color] = new Generation();
    }
  }
}
