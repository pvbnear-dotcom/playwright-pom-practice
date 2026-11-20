import { test as base, expect } from "@playwright/test";
import { FilterBarComponent } from "../pages/components/filterBar.component";
import { HeaderComponent } from "../pages/components/header.component";
import { AlertComponent } from "../pages/components/alert.component";
import { LoginComponent } from "../pages/components/login.component";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { CartCheckoutPage } from "../pages/cartCheckout.page";
import { SignInCheckoutPage } from "../pages/signInCheckout.page";
import { AddressCheckoutPage } from "../pages/addressCheckout.page";
import { PaymentCheckoutPage } from "../pages/paymentCheckout.page";

type Pages = {
  homePage: HomePage;
  productPage: ProductPage;
  cartCheckoutPage: CartCheckoutPage;
  signInCheckoutPage: SignInCheckoutPage;
  addressCheckoutPage: AddressCheckoutPage;
  paymentCheckoutPage: PaymentCheckoutPage;
  headerComponent: HeaderComponent;
  filterBarComponent: FilterBarComponent;
  alertComponent: AlertComponent;
  loginComponent: LoginComponent;
};

type Setups = {
  cartWithSheetSander: void;
};

export const test = base.extend<Pages & Setups>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartCheckoutPage: async ({ page }, use) => {
    await use(new CartCheckoutPage(page));
  },
  signInCheckoutPage: async ({ page }, use) => {
    await use(new SignInCheckoutPage(page));
  },
  addressCheckoutPage: async ({ page }, use) => {
    await use(new AddressCheckoutPage(page));
  },
  paymentCheckoutPage: async ({ page }, use) => {
    await use(new PaymentCheckoutPage(page));
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  filterBarComponent: async ({ page }, use) => {
    await use(new FilterBarComponent(page));
  },
  alertComponent: async ({ page }, use) => {
    await use(new AlertComponent(page));
  },
  loginComponent: async ({ page }, use) => {
    await use(new LoginComponent(page));
  },
  cartWithSheetSander: async (
    {
      homePage,
      filterBarComponent,
      productPage,
      alertComponent,
      headerComponent,
    },
    use,
  ) => {
    await homePage.goto();
    await filterBarComponent.selectFilter("Sander");
    await homePage.openProduct("Sheet Sander");
    await productPage.addToCart();
    await expect(alertComponent.addedToCartAlertMessage).toBeVisible();
    await headerComponent.goToCart();
    await use();
  },
});

export { expect } from "@playwright/test";
