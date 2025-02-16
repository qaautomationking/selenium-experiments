

// Go to phoenix.edu
// check if login button is there
// Click the login button
// enter username and password on next page
// click the login button
// ensure the user is logged in

const { Builder, Browser, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome")

describe('when user opens Phoenix.edu website', () =>{
    let driver;
    let userName = ""; //add actual user name
    let password = ""; //add actual password

    beforeEach(async () => {
        driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(new chrome.Options().addArguments("--headless"))
        .build();

        await driver.get("https://phoenix.edu/")
        await driver.manage().setTimeouts({implicit: 10000})
    });

    afterEach(async () => {
       await driver.quit();
    });
    
    it('shows login button', async () => {
        let loginButton = await driver.findElement(By.className('pre-login cmp-header_button-upper'))
        expect(loginButton).toBeTruthy();
    });

    describe("when user clicks login link", () => {
        beforeEach(async () => {
            let loginButton = await driver.findElement(By.className('pre-login cmp-header_button-upper'))
            await loginButton.click()
        });

        it('shows user name input box', async () => {
            let userNameInput = await driver.findElement(By.id('floatingLabelInput38'))
            expect(userNameInput).toBeTruthy();
        });

        it('shows password input box', async () => {
            let passwordInputBox = await driver.findElement(By.id('floatingLabelInput43'))
            expect(passwordInputBox).toBeTruthy();
        });

        it('shows the login button', async () => {
            let loginButton = await driver.findElement(By.className('btn btn-primary'))
            expect(loginButton).toBeTruthy();
        });

        describe('when user inputs user name', () => {
            beforeEach(async () => {
                let userNameInput = await driver.findElement(By.id('floatingLabelInput38'))
                await userNameInput.sendKeys(userName)
            });
            
            describe('when user enters correct password', () => {
                beforeEach(async () => {
                    let passwordInputBox = await driver.findElement(By.id('floatingLabelInput43'))
                    await passwordInputBox.sendKeys(password)
                });

                describe('when user clicks login button', () =>{
                    beforeEach(async () =>{
                        let loginButton = await driver.findElement(By.className('btn btn-primary'))
                        await loginButton.click();
                    });
                    
                    it('asks user for one time passcode', async () => {
                        let oneTimePw = await driver.findElement(By.id('floatingLabelInput84'))
                        expect(oneTimePw).toBeTruthy();
                    });
                });
            });
            
            describe('when user enters wrong password', () =>{
                beforeEach(async () => {
                    let passwordInputBox = await driver.findElement(By.id('floatingLabelInput43'))
                    await passwordInputBox.sendKeys("wrongPassword")
                });

                describe('when user clicks login button', () =>{
                    beforeEach(async () =>{
                        let loginButton = await driver.findElement(By.className('btn btn-primary'))
                        await loginButton.click();
                    });
                   
                    it('displays error message', async () => {
                        let errorMessage = await driver.findElement(By.css('div[testid="FrAlert"]'))
                        expect(await errorMessage.getText()).toMatch(/Your username or password is incorrect/);
                    });
                });
            });
        });
    });
});