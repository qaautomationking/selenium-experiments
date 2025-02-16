const { Builder, Browser, By } = require("selenium-webdriver");
const assert = require("assert");


const main = async () => {
    let driver = await new Builder().forBrowser(Browser.CHROME).build(); //creates a driver for the chrome browser
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html'); //retrieves the website that the tests will take place on
    let myTestInput = await driver.findElement(By.id("my-text-id")) //looks for an element with the id in the "" and assigns it to 'myTestInput'
    let myDropDownItems = await driver.findElement(By.name("my-select")) //looks for an element with the name in the "" and assigns it to 'myDropdownItems'
    //await myDropDownItems.click() //clicks on the drop down items list just like mouse click on an element in a browser
    let checkBox = await driver.findElement(By.name("my-check"))
    let checkBox2 = await driver.findElement(By.id("my-check-2"))
    let textArea = await driver.findElement(By.name("my-textarea"))
    let mySelect = await driver.findElement(By.name("my-select"))
    //let testSubElementSelect = await driver.findElement(By.name("form-label\ w-100")).findElement(By.name("my-select"))
    //await addTextToTextArea(textArea, "Hello Everyone")

    //await testSubElementSelect.click()

    await addTextToTextArea(textArea, "Hello")
    await clickCheckBox(checkBox)
    //await clickCheckBox(checkBox2)
    //await chooseOptionFromSelect(myDropDownItems, 3)


    //myTestInput.sendKeys("Abubakar")
    //await driver.sleep(5000)
    await driver.manage().setTimeouts({implicit: 5000})
    //await driver.quit()
}

async function chooseOptionFromSelect(dropDownList, element){
    await dropDownList.click()//clicks the dropdown in the browser
    let dropDownItem = await dropDownList.findElement(By.css('option[value="' + element + '"'))//selects element from the dropdownlist
    await dropDownItem.click()
}

//checks/unchecks the checkbox
async function clickCheckBox(checkBox){
    await checkBox.click()
}

//test function to check if items can be added, does not work atm
async function addItemToDropDown(dropDownList, itemToAdd) {
    //await dropDownList.click()
    await dropDownList
    return dropDownList
}

async function addTextToTextArea(textArea, text){
    //await textArea.click()
    //await textArea.clear()
    await textArea.sendKeys(text)
}

main()