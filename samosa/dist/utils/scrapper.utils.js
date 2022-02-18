"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackathonScrapper = exports.LeetcodeScrapper = exports.HackerrankScrapper = void 0;
const puppeteer = require("puppeteer");
const HackerrankScrapper = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox',
        ],
    });
    const tab = await browser.newPage();
    try {
        await tab.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
            'upgrade-insecure-requests': '1',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,en;q=0.8',
        });
        await tab.goto(url);
        await tab.waitForSelector('#content');
        const badges = await tab.evaluate(() => {
            const items = document.querySelectorAll('div.hacker-badge');
            const results = [];
            items.forEach((item) => {
                results.push({
                    badge_name: item.querySelector('div > div > div > svg > text')
                        .textContent,
                    stars_count: item.querySelector(' div > div > div > svg > g.star-section > svg').children.length,
                });
            });
            return results;
        });
        const certificates = await tab.evaluate(() => {
            const items = document.querySelectorAll('a.hacker-certificate');
            const results = [];
            items.forEach((item) => {
                results.push({
                    certificate_name: item.querySelector('div > div.certificate-container > h2').textContent,
                    certificate_link: 'https://hackerrank.com' + item.getAttribute('href'),
                });
            });
            return results;
        });
        browser.close();
        return {
            badges: badges,
            certificates: certificates,
        };
    }
    catch (err) {
        browser.close();
        return {
            badges: [],
            certificates: [],
        };
    }
};
exports.HackerrankScrapper = HackerrankScrapper;
const LeetcodeScrapper = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox',
        ],
    });
    const tab = await browser.newPage();
    try {
        await tab.goto(url);
        await tab.waitForSelector('#profile-root > div.content-wrapper__2N7X');
        const points = await tab.evaluate(() => {
            return document.querySelector('.css-vsyzx3-SimpleBadge').textContent;
        });
        const problemsSolved = await tab.evaluate(() => {
            return document.querySelector('.total-solved-count__2El1').textContent;
        });
        const badges = await tab.evaluate(() => {
            const badge = document.querySelector('#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div.css-1926rjh > div > div.css-57pydk');
            if (badge != null) {
                return document.querySelector('#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div.css-1926rjh > div > div.css-57pydk').textContent;
            }
            else {
                return 0;
            }
        });
        browser.close();
        return {
            total_badges: badges,
            total_pints: points,
            total_problems_solved: problemsSolved,
        };
    }
    catch (err) {
        browser.close();
        return {
            total_badges: 0,
            total_pints: 0,
            total_problems_solved: 0,
        };
    }
};
exports.LeetcodeScrapper = LeetcodeScrapper;
const hackathonScrapper = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox',
        ],
    });
    let data;
    const page = await browser.newPage();
    try {
        await page.goto('https://devfolio.co/hackathons');
        await page.waitForSelector('.kCxSkW > div');
        data = await page.evaluate(() => Array.from(document.querySelectorAll('.kCxSkW > div')).map((e) => {
            return {
                title: e.querySelector('a>span').textContent,
                link: e.querySelector('a').href,
                date: e.querySelector('div:nth-child(2) > div:nth-child(1) > span.sc-fzqBZW.dgEiEh').textContent,
                held_at: e.querySelector('div:nth-child(2).gwHgou> div:nth-child(2)>span:nth-child(2)').textContent,
                application_closed: e.querySelector('div:nth-child(2).gwHgou> div:nth-child(3)>span:nth-child(2)') == null
                    ? ''
                    : e.querySelector('div:nth-child(2).gwHgou> div:nth-child(3)>span:nth-child(2)').textContent,
            };
        }));
    }
    catch (error) {
        console.log(error);
    }
    return data;
};
exports.hackathonScrapper = hackathonScrapper;
//# sourceMappingURL=scrapper.utils.js.map