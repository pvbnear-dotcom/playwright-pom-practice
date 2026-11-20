import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByTestId("product-name");
    this.addToCartBtn = page.getByTestId("add-to-cart");
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }
}
