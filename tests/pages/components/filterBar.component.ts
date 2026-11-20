import { Page, Locator, expect } from "@playwright/test";

export class FilterBarComponent {
  readonly filterBar: Locator;
  readonly filterCompleted: Locator;

  constructor(private readonly page: Page) {
    this.filterBar = page.getByTestId("filters");
    this.filterCompleted = page.getByTestId("filter_completed");
  }

  async selectFilter(filterName: string) {
    await this.filterBar.getByLabel(filterName).check();
    await expect(this.filterCompleted).toBeVisible();
  }
}
