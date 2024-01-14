const pup = require('puppeteer-core');

async function searchEcosia(query) {
    // Launch a new browser session
    const browser = await pup.launch({
        headless: false, 
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    const page = await browser.newPage();
    await page.goto("https://ecosia.org");
    await page.setViewport({ width: 1280, height: 720 });
    const inputElement = await page.$('input[type="search"]');
    await inputElement.type(query);
    const submitButton = await page.$('button[type="submit"]');
    await submitButton.click();
    // Wait for the navigation after the form submission
    await page.waitForNavigation();

    // Close the browser
    await browser.close();
}

module.exports = {
    searchEcosia
}