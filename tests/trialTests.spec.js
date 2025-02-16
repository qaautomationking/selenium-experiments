//jestjs.io

const { Builder, Browser, By } = require("selenium-webdriver");
const chrome= require('selenium-webdriver/chrome')
const faker = require('faker');

describe('Selenium', () => {
    let driver;

    // beforeEach(async () => {
    //     driver = await new Builder().forBrowser(Browser.CHROME).build();
    // });

    // afterEach(async () => {
    //     await driver.quit();
    // })

    beforeAll(async () => {
        driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--headless'))
        .build();
    });

    afterAll(async () => {
        await driver.quit();
    })

    describe('when the user visits the selenium webpage', () => {
        // beforeEach(async () => {
        //     await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
        // });

        beforeAll(async () => {
            await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
        });

        it('shows input box', async () => {
            let inputBox = await driver.findElement(By.id('my-text-id'));
            expect(inputBox).toBeTruthy();
        });

        it('shows password input box', async () => {
            let inputBox = await driver.findElement(By.name('my-password'));
            expect(inputBox).toBeTruthy();
        });

        it('shows submit button', async () => {
            let submitButton = await driver.findElement(By.css('button[type="submit"]'));
            expect(submitButton).toBeTruthy();
        });

        describe('when user enters name in input box', ()=> {
            let name;

            beforeEach(async () => {
                name = faker.name.firstName();
                let inputBox = await driver.findElement(By.id('my-text-id'))
                await inputBox.sendKeys(name);
            });

            it('inputs the name in input box', async () => {
                const inputBox = await driver.findElement(By.id('my-text-id'));
                expect(await inputBox.getAttribute('value')).toEqual(name);
            });

            describe('when the user click submit', () => {
                // beforeEach
                beforeEach(async () => {
                    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
                    await submitButton.click();
                });

                it('displays message', async () => {
                    const message = await driver.findElement(By.id('message'));
                    expect(await message.getText()).toEqual('Received!');
                });
            });
        });
    });
});