var puppeteer = require('puppeteer');
async function run(){
    console.log('hello world');
    var options = {headless : false};
    var browser = await puppeteer.launch(options);
    var page = await browser.newPage();
    await page.setViewport({height:1200, width:960});
    await page.goto('https://github.com');

    await page.close();
    await browser.close();
}

 run();


