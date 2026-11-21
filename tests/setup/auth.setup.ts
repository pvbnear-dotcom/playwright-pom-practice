import { test as setup, expect } from "@playwright/test";
import { LoginComponent } from "../pages/components/login.component";
import { authFile } from "./auth.constants";

setup("Login to account", async ({ page }) => {
  const email = process.env.USEREMAIL;
  if (!email) throw new Error("USEREMAIL is not set in .env");
  const password = process.env.PASSWORD;
  if (!password) throw new Error("PASSWORD is not set in .env");
  const loginComponent = new LoginComponent(page);

  await page.goto("/auth/login");
  await loginComponent.login(email, password);
  await expect(page).toHaveURL(/\/account/);
  await page.context().storageState({ path: authFile });
});
