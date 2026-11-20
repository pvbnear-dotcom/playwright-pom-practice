import { Page, Locator } from "@playwright/test";

export class HeaderComponent {
  readonly goToCartBtn: Locator;
  constructor(private readonly page: Page) {
    this.goToCartBtn = page.getByTestId("nav-cart");
  }

  async goToCart() {
    await this.goToCartBtn.click();
  }
}
