const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  console.log("aaAAAAAAA");

  // res.status(200).send("OK");

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

  // スクレイピングの一例
  // user_info_fieldsクラスのtrタグをパースします
  const elements = await page.$$('tr.user_info_fields');
  const users = [];
  for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const userid= await element.$eval('th', e => e.innerText);
      const username = await element.$eval('td.username span', e => e.innerText);
      const email = await element.$eval('td.email', e => e.innerText);
      users.push({
          userid: userid,
          username: username,
          email: email
      });
  }
  res.send(users);
}
