exports.CartPage = class CartPage {
    constructor(page) {
      this.page = page;
      this.checkoutButton = '[data-test="checkout"]';
      this.cartItems = '.cart_item';
    }
  
    async getItemCount() {
      return await this.page.$$eval(this.cartItems, items => items.length);
    }
  
    async proceedToCheckout() {
      await this.page.click(this.checkoutButton);
    }
  }
  