import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export type AddressDetails = {
  country: string;
  postalCode: string;
  houseNumber: string;
};

export class AddressCheckoutPage extends BasePage {
  readonly proceedToPaymentBtn: Locator;
  readonly country: Locator;
  readonly postalCode: Locator;
  readonly houseNumber: Locator;
  readonly postcodeLookupLoading: Locator;
  readonly city: Locator;
  readonly street: Locator;
  readonly state: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedToPaymentBtn = page.getByTestId("proceed-3");
    this.country = page.getByTestId("country");
    this.postalCode = page.getByTestId("postal_code");
    this.houseNumber = page.getByTestId("house_number");
    this.postcodeLookupLoading = page.getByTestId("postcode-lookup-loading");
    this.city = page.getByTestId("city");
    this.street = page.getByTestId("street");
    this.state = page.getByTestId("state");
  }

  async proceedToPayment() {
    await this.proceedToPaymentBtn.click();
  }

  async fillAddressFields({
    country,
    postalCode,
    houseNumber,
  }: AddressDetails) {
    await this.country.selectOption(country);
    await this.postalCode.fill(postalCode);
    await this.houseNumber.fill(houseNumber);
    await this.houseNumber.press("Tab");
    await expect(this.postcodeLookupLoading).toBeVisible();
    await expect(this.postcodeLookupLoading).toBeHidden();
  }
}
