var puppeteer = require('puppeteer');


async function clearField(selector, page) {
    let elementHandle = await page.$(selector);
    if (elementHandle) {        
        await clearFieldByElement(elementHandle, page);
    }
}

async function clearFieldByElement(element, page) {
    await element.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
}

async function search() {

    var width = 1200;
    var height = 900;

    var option = {
        headless: false,
        slowMo: true,
        args: [`--window-size=${width},${height}`]
    };

    var browser = await puppeteer.launch(option);
    var page = await browser.newPage();
    var vp = { width: width, height: height };
    await page.setViewport(vp);

    const navigationPromise = page.waitForNavigation()

    await page.goto('http://web.bizbook365.com');
    await navigationPromise;
    await page.waitFor(2000);

    var selectorString = '.container-fluid > .container-fluid > .ng-scope > h2 > a';
    await page.waitForSelector(selectorString);
    var selector = await page.$('.container-fluid > .container-fluid > .ng-scope > h2 > a');
    //console.log(selector);

    if (selector!=null) {
        var element = selector.asElement();
        await element.click();
        await navigationPromise;
    }

    await page.waitForSelector('#login-password');



    var textBoxId = 'login-password';
    //await page.evaluate( () => document.getElementById("login-password").value = "");
    await clearField('#login-password', page);
    await page.type('#' + textBoxId, '123456', { delay: 100 });
    await page.keyboard.press('Enter');


    await page.waitFor(20000);
    await page.close();
    await browser.close();

}


search();