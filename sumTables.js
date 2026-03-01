const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 73; seed <= 82; seed++) {
    const url = `https://https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`; 
    await page.goto(url, { waitUntil: "networkidle" });

    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseFloat(td.innerText))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log("FINAL TOTAL:", totalSum);

  await browser.close();
})();
