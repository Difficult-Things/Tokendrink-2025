import { ProductType } from "../../../specifications/products";

export class Generation {
  private products: { [product: string]: number } = {};

  setProduct(product: ProductType, amount: number): void {
    this.products[product] = amount;
  }

  addProduct(product: ProductType, amount: number): void {
    if (this.products[product]) {
      this.products[product] += amount;
    } else {
      this.products[product] = amount;
    }
  }

  getProduct(product: ProductType): number {
    return this.products[product] || 0;
  }

  getScore(): number {
    return Object.values(this.products).reduce((acc, cur) => acc + cur, 0);
  }
}
