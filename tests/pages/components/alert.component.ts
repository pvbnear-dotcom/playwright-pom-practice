import { Page, Locator } from "@playwright/test";

export class AlertComponent {
  readonly addedToCartAlertMessage: Locator;

  constructor(private readonly page: Page) {
    this.addedToCartAlertMessage = page.getByRole("alert", {
      name: "Product added to shopping",
    });
  }
}
