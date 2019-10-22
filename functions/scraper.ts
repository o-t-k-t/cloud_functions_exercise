import * as puppeteer from 'puppeteer';

export const scraper = async (req, res) => {
  console.log("aaAAAAAAA");

  const USERNAME = process.env['USERNAME'];
  const PASSWORD = process.env['PASSWORD'];
  const LOGIN_URL = 'https://example.com';

  // Chromiumを起動し、ページをつくる
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 1024 });

  // ログインページに移動し、ログインする
  await page.goto(`${LOGIN_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.type('input#email', USERNAME);
  await page.type('input#password', PASSWORD);
  await page.click('#login-btn-sumit');
  await page.waitForNavigation();
  await page.goto('`${LOGIN_URL}/users`', { waitUntil: 'domcontentloaded', timeout: 20000 });

  res.status(200).send("OK");
}
