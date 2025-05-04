import { ProductType } from "../../../specifications/products";

export class Generation {
  private products: { [product: string]: number } = {};

  setProduct(product: ProductType, quantity: number): void {
    this.products[product] = quantity;
  }

  // Not used for current implementation as PDF data contains absolute values
  addProduct(product: ProductType, quantity: number): void {
    if (this.products[product]) {
      this.products[product] += quantity;
    } else {
      this.products[product] = quantity;
    }
  }

  getProduct(product: ProductType): number {
    return this.products[product] || 0;
  }

  getProducts(): { [product: string]: number } {
    return this.products;
  }

  getScore(): number {
    return Object.values(this.products).reduce((acc, cur) => acc + cur, 0);
  }
}
