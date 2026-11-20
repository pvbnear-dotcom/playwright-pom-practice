import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;
  readonly searchCompleted: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByTestId("search-query");
    this.searchButton = page.getByTestId("search-submit");
    this.productNames = page.getByTestId("product-name");
    this.searchCompleted = page.getByTestId("search_completed");
  }

  async goto() {
    await this.navigate("/");
    await expect(this.productNames.first()).toBeVisible();
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchButton.click();
    await expect(this.searchCompleted).toBeVisible();
  }

  async openProduct(name: string) {
    await this.productNames.filter({ hasText: name }).click();
  }
}
