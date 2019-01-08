var puppeteer = require('puppeteer');

async function search() {

    var width = 1600;
    var height = 1040;

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

    await page.goto('https://www.bing.com');
    await navigationPromise;
    await page.waitFor(2000);

    var textBoxId = 'sb_form_q';
    await page.type('#' + textBoxId, 'bizbook365', { delay: 100 });
    await page.keyboard.press('Enter');

    var selectorString = '#b_results > .b_algo:nth-child(1) > h2 > a';
    await page.waitForSelector(selectorString);
    var selector = await page.$('#b_results > .b_algo:nth-child(1) > h2 > a');
    console.log(selector);

    
    if (selector!=null) {
        var element = selector.asElement();
        await element.click();
        await navigationPromise;
    }


    
    

    await page.waitFor(5000);
    await page.close();
    await browser.close();
}
 

search();