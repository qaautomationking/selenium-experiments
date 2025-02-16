const {Builder, Browser, By, Key} = require ("selenium-webdriver")
const assert = require("assert")

async function example(){

    //launch browser
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    //navigate to our application
    await driver.get("https://lambdatest.github.io/sample-todo-app/")


    //
    await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);


    let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function(value){
        return value
    });

    assert.strictEqual(todoText, "Learn Selenium")
    //close the browser

    //await driver.sleep(5000)
    //await driver.quit();
}

example()