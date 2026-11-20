import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class SignInCheckoutPage extends BasePage {
  readonly proceedToAddressBtn: Locator;
  readonly street: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedToAddressBtn = page.getByTestId("proceed-2");
    this.street = page.getByTestId("street");
  }

  async proceedToAddress() {
    await this.proceedToAddressBtn.click();
    await expect(this.street).not.toHaveValue("");
  }
}
