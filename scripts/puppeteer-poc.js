import "@johnlindquist/kit";

// Name: Puppeteer POC

const puppeteer = await npm("puppeteer");

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
await page.goto("https://bouwe.io");
await page.screenshot({ path: "bouwe.io.png" });
//await browser.close();
