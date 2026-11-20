import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export type BankTransferDetails = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

export class PaymentCheckoutPage extends BasePage {
  readonly finishBtn: Locator;
  readonly paymentMethod: Locator;
  readonly bankName: Locator;
  readonly accountName: Locator;
  readonly accountNumber: Locator;
  readonly successMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.paymentMethod = page.getByTestId("payment-method");
    this.bankName = page.getByTestId("bank_name");
    this.accountName = page.getByTestId("account_name");
    this.accountNumber = page.getByTestId("account_number");
    this.finishBtn = page.getByTestId("finish");
    this.successMsg = page.getByTestId("payment-success-message");
  }

  async clickFinish() {
    await this.finishBtn.click();
  }

  async payUsingBankTransfer({
    bankName,
    accountName,
    accountNumber,
  }: BankTransferDetails) {
    await this.paymentMethod.selectOption("bank-transfer");
    await this.bankName.fill(bankName);
    await this.accountName.fill(accountName);
    await this.accountNumber.fill(accountNumber);
  }
}
