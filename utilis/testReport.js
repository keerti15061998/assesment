test('Visual regression test for All Items page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.isProductsPageLoaded();
    expect(await page.screenshot()).toMatchSnapshot('all-items-page.png');
  });
  