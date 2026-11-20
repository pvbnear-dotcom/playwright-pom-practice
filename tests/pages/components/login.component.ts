import { Page, Locator } from "@playwright/test";

export class LoginComponent {
  readonly mailField: Locator;
  readonly pswField: Locator;
  readonly loginSubmit: Locator;
  readonly root: Locator;
  readonly loginConfirmationMsg: Locator;

  constructor(private readonly page: Page) {
    this.mailField = page.getByTestId("email");
    this.pswField = page.getByTestId("password");
    this.loginSubmit = page.getByTestId("login-submit");
    this.root = page.locator("app-login");
    this.loginConfirmationMsg = this.root.getByText(
      /you are already logged in/,
    );
  }

  async login(userMail: string, password: string) {
    await this.mailField.fill(userMail);
    await this.pswField.fill(password);
    await this.loginSubmit.click();
  }
}
