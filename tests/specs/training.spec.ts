import { test, expect } from "../fixtures/base.fixtures";

test("searching for 'thor hammer' should only bring 1 result", async ({
  homePage,
}) => {
  await homePage.goto();

  const searchText = "thor hammer";
  await homePage.search(searchText);

  await expect(homePage.productNames).toHaveText(["Thor Hammer"]);
});

test("searching for 'thor hammer' and clicking it to show the description", async ({
  homePage,
  productPage,
}) => {
  await homePage.goto();
  const searchText = "thor hammer";
  await homePage.search(searchText);
  await homePage.openProduct("Thor Hammer");
  await expect(productPage.productName).toHaveText("Thor Hammer");
});

test("search and add 'Sheet Sander' to cart", async ({
  cartCheckoutPage,
  homePage,
  productPage,
  alertComponent,
  headerComponent,
  filterBarComponent,
}) => {
  await homePage.goto();
  await filterBarComponent.selectFilter("Sander");
  await homePage.openProduct("Sheet Sander");
  await productPage.addToCart();
  await expect(alertComponent.addedToCartAlertMessage).toBeVisible();
  await headerComponent.goToCart();
  await expect(cartCheckoutPage.linePrice).toHaveText("$58.48");
});

test("checkout and pay for a 'Sheet Sander'", async ({
  cartWithSheetSander,
  cartCheckoutPage,
  signInCheckoutPage,
  addressCheckoutPage,
  paymentCheckoutPage,
  loginComponent,
}) => {
  await expect(cartCheckoutPage.linePrice).toHaveText("$58.48");
  await cartCheckoutPage.proceedToLogin();
  await expect(loginComponent.loginConfirmationMsg).toContainText(
    "Hello Jane Doe, you are already logged in. You can proceed to checkout.",
  );
  await signInCheckoutPage.proceedToAddress();
  await addressCheckoutPage.fillAddressFields({
    country: "BR",
    postalCode: "02518010",
    houseNumber: "95",
  });
  await expect(addressCheckoutPage.street).toHaveValue("Largo Raysa Leal");
  await expect(addressCheckoutPage.city).toHaveValue("Cervantes do Sul");
  await expect(addressCheckoutPage.state).toHaveValue("Santa Catarina");
  await addressCheckoutPage.proceedToPayment();
  await paymentCheckoutPage.payUsingBankTransfer({
    bankName: "Itau",
    accountName: "Itau",
    accountNumber: "1234",
  });
  await paymentCheckoutPage.clickFinish();
  await expect(paymentCheckoutPage.successMsg).toHaveText(
    "Payment was successful",
  );
});
