import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartCheckoutPage extends BasePage {
  readonly linePrice: Locator;
  readonly proceedToLoginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.linePrice = page.getByTestId("line-price");
    this.proceedToLoginBtn = page.getByTestId("proceed-1");
  }

  async proceedToLogin() {
    await this.proceedToLoginBtn.click();
  }
}
