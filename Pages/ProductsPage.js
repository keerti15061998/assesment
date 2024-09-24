exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = '.product_sort_container';
    this.productNames = '.inventory_item_name';
    this.productPrices = '.inventory_item_price';
    this.cartIcon = '.shopping_cart_link';
    this.title = '.title'
  }

  async isProductsPageLoaded() {
    await this.page.waitForSelector(this.title,{timeout:3000});
  }

  async sortBy(option) {
    await this.page.waitForSelector(this.sortDropdown,{timeout:3000})
    await this.page.selectOption(this.sortDropdown, option);
  }

  async getProductNames() {
    return await this.page.$$eval(this.productNames, items => items.map(item => item.textContent.trim()));
  }

  async getProductPrices() {
    return await this.page.$$eval(this.productPrices, prices => prices.map(price => parseFloat(price.textContent.replace('$', ''))));
  }

  async addItemToCart(itemIndex) {
    const addButton = `.inventory_item:nth-child(${itemIndex + 1}) button`;
    await this.page.click(addButton);
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }
}
