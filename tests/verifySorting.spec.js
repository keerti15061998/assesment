const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const { ProductsPage } = require('../Pages/ProductsPage');

test.describe('Product Sorting Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Verify Z-A sorting order on All Items page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.isProductsPageLoaded();
    
    await productsPage.sortBy('za');
    const productNames = await productsPage.getProductNames();
    const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
    
    expect(productNames).toEqual(sortedProductNames);
  });

  test('Verify High-Low price sorting order on All Items page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.isProductsPageLoaded();
    
    await productsPage.sortBy('hilo');
    const productPrices = await productsPage.getProductPrices();
    const sortedProductPrices = [...productPrices].sort((a, b) => b - a);
    
    expect(productPrices).toEqual(sortedProductPrices);
  });
});
