// LoginPage.js
exports.LoginPage =
class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = '#user-name';
      this.passwordInput = '#password';
      this.loginButton = '#login-button';
      this.errorMessage = '[data-test="error"]';
    }

    async goToLoginPage(){
        await this.page.goto('https://www.saucedemo.com/')
    }
  
    async login(username, password) {
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();


    }
    async getErrorMessage() {
      return this.page.textContent(this.errorMessage);
    }

  }
  

  