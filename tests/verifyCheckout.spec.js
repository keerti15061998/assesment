const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const { ProductsPage } = require('../Pages/ProductsPage');
const { CartPage } = require('../Pages/CartPage');
const { CheckoutPage } = require('../Pages/CheckoutPage');

test.describe('Checkout Journey Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add multiple items to the cart and checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add two items to the cart
    await productsPage.addItemToCart(0);  // First item
    await productsPage.addItemToCart(1);  // Second item
    await productsPage.goToCart();

    // Validate items in cart
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);

    // Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutDetails('Keerti', 'Dubey', '226014');
    await checkoutPage.finishCheckout();

    // Verify success message
    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage).toContain('Thank you for your order!');
  });
});
