# Playwright + TypeScript E2E Test Suite

![Playwright Tests](https://github.com/pvbnear-dotcom/playwright-pom-practice/actions/workflows/playwright.yml/badge.svg)

End-to-end UI tests for the demo e-commerce site
[Practice Software Testing](https://practicesoftwaretesting.com/), written with
**Playwright** and **TypeScript** and organized with the **Page Object Model (POM)**
and **custom fixtures**.

This is a portfolio/study project that shows the basics of building a test
suite that is easy to read and maintain.

## What this project demonstrates

- **Page Object Model.** Each page (`HomePage`, `ProductPage`, the checkout
  steps) and each reusable UI part (`HeaderComponent`, `FilterBarComponent`,
  `AlertComponent`, `LoginComponent`) is its own class. Locators and actions
  live there, not in the tests.
- **Custom fixtures.** Page objects are injected into tests through
  `test.extend()`, so tests don't have to create them with `new`.
- **Setup fixtures.** `cartWithSheetSander` puts the app in a known state
  (a product in the cart) before a test starts, so the checkout test can
  focus on checkout.
- **Stable locators.** The tests use `getByTestId()`, with `testIdAttribute`
  set to the app's `data-test` attribute.
- **Web-first assertions.** `toHaveText`, `toHaveValue` and `toBeVisible`
  wait for the expected state, so the tests don't need hard-coded waits.
- **Cross-browser runs.** Tests run on Chromium, Firefox and WebKit.
- **Secrets through environment variables.** Login details come from a local
  `.env` file, or from GitHub Secrets in CI.
- **CI with GitHub Actions.** Tests run on every push and pull request to
  `main`, and the HTML report is uploaded as a build artifact.
- **Shared login session (`storageState`).** A `setup` project
  ([auth.setup.ts](tests/setup/auth.setup.ts)) logs in once and saves the
  session (cookies and localStorage) to `playwright/.auth/user.json`. The
  browser projects depend on `setup` and load that file, so every test starts
  already logged in without filling in the login form again. A test can opt out
  with `test.use({ storageState: { cookies: [], origins: [] } })`. The file is
  git-ignored because it holds a real session token.

## Test scenarios

| Test                                      | What it covers                                                                          |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| Search for "thor hammer"                  | The search returns exactly one result                                                   |
| Search and open a product                 | Going to the product detail page                                                        |
| Filter and add "Sheet Sander" to the cart | Filtering, the add-to-cart alert, the cart line price                                   |
| Full checkout for "Sheet Sander"          | Checkout as a logged-in user, address auto-fill, bank transfer payment, success message |

## Project structure

```
tests/
├── fixtures/
│   └── base.fixtures.ts       # Custom test with page-object and setup fixtures
├── pages/
│   ├── base.page.ts           # Abstract base class
│   ├── home.page.ts
│   ├── product.page.ts
│   ├── cartCheckout.page.ts
│   ├── signInCheckout.page.ts
│   ├── addressCheckout.page.ts
│   ├── paymentCheckout.page.ts
│   └── components/            # Reusable UI components
│       ├── alert.component.ts
│       ├── filterBar.component.ts
│       ├── header.component.ts
│       └── login.component.ts
├── setup/
│   └── auth.setup.ts          # Logs in once and saves the session (storageState)
└── specs/
    └── training.spec.ts       # Test scenarios
playwright.config.ts           # Base URL, setup + browser projects, retries, reporter
.github/workflows/playwright.yml
```

## Example

A test only describes the user flow. The page objects handle the details:

```ts
test("search and open a product", async ({ homePage, productPage }) => {
  await homePage.goto();
  await homePage.search("thor hammer");
  await homePage.openProduct("Thor Hammer");
  await expect(productPage.productName).toHaveText("Thor Hammer");
});
```

## Getting started

### Prerequisites

- Node.js (LTS)

### Install

```bash
npm ci
npx playwright install --with-deps
```

### Configure credentials

Copy `.env.example` to `.env` and fill in a test account for the demo site:

```
USEREMAIL="customer@practicesoftwaretesting.com"
PASSWORD="welcome01"
```

> These are the site's **public demo account** credentials (customer "Jane Doe"),
> published by the site owner for testing. They are not secrets, but they still
> go through `.env` and GitHub Secrets to show how real credentials should be
> handled.

### Run the tests

```bash
npx playwright test                    # all browsers, headless
npx playwright test --project=chromium # a single browser
npx playwright test --ui               # interactive UI mode
npx playwright show-report             # open the last HTML report
```

## CI

The workflow in [.github/workflows/playwright.yml](.github/workflows/playwright.yml)
installs dependencies and browsers and runs the suite. It reads `USEREMAIL` and
`PASSWORD` from repository secrets. The `playwright-report` artifact is kept
for 30 days.
