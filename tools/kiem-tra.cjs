/* Công cụ kiểm tra minh chứng; trang web không phụ thuộc JavaScript này. */
const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const baselineIndex = process.argv.indexOf('--baseline');
const baseline = baselineIndex >= 0 ? path.resolve(process.argv[baselineIndex + 1]) : null;
const evidence = path.join(root, 'minh-chung');
const result = { date: '04/11/2026', authorOfChecks: 'Codex', viewports: [], checks: [], experiments: {} };
const failedRequests = [];
const runtimeErrors = [];
const networkRequests = new Set();
function check(name, condition, detail) {
  result.checks.push({ name, pass: Boolean(condition), detail });
  assert.ok(condition, `${name}: ${JSON.stringify(detail)}`);
}
async function shot(page, name, selector) {
  const dest = path.join(evidence, name + '.png');
  await fs.mkdir(path.dirname(dest), { recursive: true });
  if (selector) await page.locator(selector).first().screenshot({ path: dest });
  else await page.screenshot({ path: dest, fullPage: true });
}
async function metrics(page) {
  return page.evaluate(() => {
    const grid = document.querySelector('.product-grid');
    const gs = getComputedStyle(grid);
    const cards = [...document.querySelectorAll('.product-card')];
    const info = document.querySelector('.product-info');
    const first = cards[0];
    const text = selector => getComputedStyle(document.querySelector(selector));
    return {
      viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
      columns: gs.gridTemplateColumns.split(' ').length, gap: gs.gap,
      cardWidths: cards.map(x => +x.getBoundingClientRect().width.toFixed(2)),
      cardHeights: cards.map(x => +x.getBoundingClientRect().height.toFixed(2)),
      infoPadding: getComputedStyle(info).padding,
      categoryFont: text('.product-category').fontSize,
      oldPriceFont: text('.old-price').fontSize,
      oldPriceColor: text('.old-price').color,
      priceColor: text('.product-price').color,
      cardBorder: getComputedStyle(first).borderTopWidth,
      cardRadius: getComputedStyle(first).borderTopLeftRadius,
      boxSizing: getComputedStyle(info).boxSizing,
      images: [...document.images].map(i => ({ src: i.getAttribute('src'), loaded: i.complete && i.naturalWidth > 0, alt: i.alt, width: i.clientWidth, height: i.clientHeight })),
      overflowCards: cards.filter(c => c.scrollWidth > c.clientWidth + 1).length,
      productCount: cards.length,
    };
  });
}
function contrast(a, b) {
  function luminance(hex) {
    const rgb = hex.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
    return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
  }
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return +((high + .05) / (low + .05)).toFixed(2);
}
async function main() {
  for (const dir of ['truoc', 'sau', 'thu-nghiem', 'tu-thuc-hanh']) await fs.mkdir(path.join(evidence, dir), { recursive: true });
  const server = http.createServer(async (req, res) => {
    try {
      const reqPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const base = reqPath.startsWith('/baseline/') ? baseline : root;
      const rel = reqPath.replace(/^\/(?:baseline\/)?/, '') || 'index.html';
      const file = path.resolve(base, rel);
      if (!file.startsWith(base + path.sep)) throw Error('Invalid path');
      const data = await fs.readFile(file);
      const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(404); res.end('Not found'); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/index.html`;
  const options = process.env.PTUD_BROWSER ? { executablePath: process.env.PTUD_BROWSER, headless: true } : { channel: 'chrome', headless: true };
  let browser;
  try {
    browser = await chromium.launch(options);
    result.browser = 'Chrome ' + browser.version();
    const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    page.on('requestfailed', r => failedRequests.push(r.url()));
    page.on('pageerror', e => runtimeErrors.push(e.message));
    page.on('request', r => networkRequests.add(r.url()));
    if (baseline) {
      result.baseline = [];
      for (const width of [1366, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(url.replace('/index.html', '/baseline/index.html'));
        await page.evaluate(() => document.fonts.ready);
        result.baseline.push(await metrics(page));
        await shot(page, `truoc/toan-trang-${width}`);
        await shot(page, `truoc/the-san-pham-${width}`, '.product-card');
      }
    }
    for (const width of [320, 360, 390, 599, 600, 768, 1023, 1024, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      const m = await metrics(page);
      result.viewports.push(m);
      check(`Bố cục ${width}px`, m.documentWidth === width && m.columns === (width < 600 ? 1 : width < 1024 ? 2 : 4) && m.overflowCards === 0, m);
      check(`Ảnh ${width}px`, m.images.length === 4 && m.images.every(i => i.loaded && i.alt && Math.abs(i.width - i.height) < 1), m.images);
      check(`HTTP ${width}px`, response.status() === 200, response.status());
      if ([1366, 768, 390, 320].includes(width)) {
        await shot(page, `sau/toan-trang-${width}`);
        await shot(page, `sau/the-san-pham-${width}`, '.product-card');
      }
    }
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto(url);
    const structure = await page.evaluate(() => ({
      main: document.querySelectorAll('main').length, h1: document.querySelectorAll('h1').length,
      nav: document.querySelectorAll('nav ul li').length, products: document.querySelectorAll('.product-grid > li > article').length,
      linkedHeadings: [...document.querySelectorAll('article')].every(a => a.querySelector('h2')?.id === a.getAttribute('aria-labelledby')),
      scripts: document.scripts.length, inlineStyles: document.querySelectorAll('[style], style').length,
      stylesheets: [...document.querySelectorAll('link[rel=stylesheet]')].map(x => x.getAttribute('href')),
      duplicateIds: [...document.querySelectorAll('[id]')].map(x => x.id).filter((id, i, ids) => ids.indexOf(id) !== i),
      links: [...document.links].map(a => ({ text: a.textContent.trim() || a.getAttribute('aria-label'), href: a.getAttribute('href') })),
    }));
    check('HTML có ngữ nghĩa và CSS ngoài', structure.main === 1 && structure.h1 === 1 && structure.products === 4 && structure.nav === 2 && structure.linkedHeadings && structure.scripts === 0 && structure.inlineStyles === 0 && structure.duplicateIds.length === 0 && structure.stylesheets[0] === 'css/style.css', structure);
    result.structure = structure;
    for (const link of structure.links) {
      if (link.href.startsWith('#')) check(`Đích ${link.href}`, link.href.length > 1 && await page.locator(link.href).count() === 1, link.text);
      else if (!link.href.startsWith('https://')) check(`Tệp ${link.href}`, Boolean(await fs.stat(path.join(root, link.href))), link.text);
    }
    await page.getByRole('link', { name: 'Về Sống Xanh', exact: true }).click();
    check('Bấm menu giới thiệu', page.url().endsWith('#gioi-thieu'), page.url().split('#')[1]);
    await page.getByRole('link', { name: 'Về đầu trang ↑' }).click();
    check('Liên kết về đầu trang', page.url().endsWith('#dau-trang'), page.url().split('#')[1]);
    await page.goto(url);
    const summary = page.locator('summary').first();
    await page.mouse.move(0, 0);
    const normal = await summary.evaluate(el => getComputedStyle(el).backgroundColor);
    await shot(page, 'sau/trang-thai-binh-thuong', '.product-card');
    await summary.hover(); await page.waitForTimeout(250);
    const hover = await summary.evaluate(el => ({ background: getComputedStyle(el).backgroundColor, transition: getComputedStyle(el).transitionDuration }));
    check('Hover và transition', hover.background !== normal && hover.transition.includes('0.2s'), { normal, ...hover });
    result.hover = { normal, ...hover };
    await shot(page, 'sau/trang-thai-hover', '.product-card');
    await page.goto(url);
    let focusSteps=0;
    while (focusSteps++ < 20) { await page.keyboard.press('Tab'); if (await summary.evaluate(el => document.activeElement === el)) break; }
    const focus = await summary.evaluate(el => ({ active: document.activeElement === el, visible: el.matches(':focus-visible'), outlineWidth: getComputedStyle(el).outlineWidth, outlineStyle: getComputedStyle(el).outlineStyle, outlineColor: getComputedStyle(el).outlineColor }));
    check('Tab và focus-visible', focus.active && focus.visible && focus.outlineWidth === '3px', focus);
    result.focus = focus;
    await page.mouse.move(0, 0); await page.waitForTimeout(250);
    await shot(page, 'sau/trang-thai-focus', '.product-card');
    await page.keyboard.press('Enter');
    check('Enter mở chi tiết', await page.locator('details').first().getAttribute('open') !== null, 'details[open]');
    await shot(page, 'sau/mo-thong-tin', '.product-card');
    await page.keyboard.press('Space');
    check('Space đóng chi tiết', await page.locator('details').first().getAttribute('open') === null, 'Không có thuộc tính open');
    const imageHref = await page.locator('.product-image').first().getAttribute('href');
    await page.locator('.product-image').first().click();
    check('Bấm ảnh mở SVG', page.url().endsWith(imageHref) && (await page.locator('svg').count()) === 1, imageHref);
    await page.goto(url);
    const prices = page.locator('.product-prices').first();
    const measureFlex = () => prices.evaluate(el => {
      const boxes = [...el.children].map(x => x.getBoundingClientRect());
      const s=getComputedStyle(el);
      return { justify: s.justifyContent, align: s.alignItems, gap: s.columnGap, distance: +(boxes[1].x - boxes[0].right).toFixed(2), topDifference: +(boxes[1].y - boxes[0].y).toFixed(2) };
    });
    result.experiments.flexStart = await measureFlex();
    await shot(page, 'thu-nghiem/flex-start', '.product-card');
    await prices.evaluate(el => el.style.justifyContent = 'space-between');
    result.experiments.flexSpaceBetween = await measureFlex();
    await shot(page, 'thu-nghiem/flex-space-between', '.product-card');
    await prices.evaluate(el => { el.style.justifyContent='flex-start'; el.style.alignItems='flex-start'; });
    result.experiments.flexAlignStart = await measureFlex();
    await page.goto(url);
    for (const columns of [2, 3]) {
      await page.locator('.product-grid').evaluate((el, n) => el.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`, columns);
      result.experiments['grid' + columns] = await metrics(page);
      await shot(page, `thu-nghiem/grid-${columns}-cot`, '.product-grid');
    }
    await page.locator('.product-grid').evaluate(el => el.style.display = 'block');
    result.experiments.noGrid = await page.locator('.product-card').first().evaluate(el => ({ width: el.getBoundingClientRect().width, gridDisplay: getComputedStyle(document.querySelector('.product-grid')).display }));
    await page.goto(url);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const reduced = await summary.evaluate(el => getComputedStyle(el).transitionDuration);
    check('Giảm chuyển động', reduced === '0s', reduced);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(url);
    await page.locator('summary').first().click();
    const openedMobile = await metrics(page);
    check('Mở thông tin trên điện thoại', openedMobile.documentWidth === 390 && openedMobile.overflowCards === 0, openedMobile);
    await shot(page, 'sau/chi-tiet-dien-thoai', '.product-card');
    await page.goto(url);
    // Ảnh đối chiếu cùng một bản HTML, chỉ ghi đè padding tạm trong trình duyệt.
    await page.locator('.product-info').evaluateAll(nodes => nodes.forEach(el => el.style.padding = '14px'));
    await shot(page, 'thu-nghiem/padding-14px', '.product-card');
    await page.locator('.product-info').evaluateAll(nodes => nodes.forEach(el => el.style.padding = '16px'));
    await shot(page, 'thu-nghiem/padding-16px', '.product-card');
    await page.goto(pathToFileURL(path.join(root, 'index.html')).href);
    const fileMetrics = await metrics(page);
    check('Mở trực tiếp file HTML', fileMetrics.images.every(i => i.loaded) && fileMetrics.columns === 1 && fileMetrics.infoPadding !== '0px', fileMetrics);
    result.contrast = {
      oldPriceBefore: contrast('#858585', '#ffffff'),
      oldPriceAfter: contrast('#58655b', '#ffffff'),
      priceAfter: contrast('#a83e32', '#ffffff'),
      summaryText: contrast('#ffffff', '#315c43'),
    };
    check('Tương phản chữ đã chỉnh', Object.entries(result.contrast).filter(([k]) => k !== 'oldPriceBefore').every(([, value]) => value >= 4.5), result.contrast);
    check('Không lỗi thực thi hoặc tải tài nguyên', failedRequests.length === 0 && runtimeErrors.length === 0, { failedRequests, runtimeErrors });
    const externalRequests = [...networkRequests].filter(u => !u.startsWith('http://127.0.0.1:') && !u.startsWith('file:'));
    check('Không cần tài nguyên mạng ngoài', externalRequests.length === 0, externalRequests);
    await context.close();
    if (process.env.PTUD_EDGE) {
      const edge = await chromium.launch({ executablePath: process.env.PTUD_EDGE, headless: true });
      result.edge = { version: edge.version(), viewports: [] };
      const ep = await edge.newPage();
      for (const width of [1366, 390]) {
        await ep.setViewportSize({ width, height: 900 }); await ep.goto(url);
        const m=await metrics(ep); result.edge.viewports.push(m);
        check(`Edge ${width}px`, m.documentWidth === width && m.images.every(i => i.loaded) && m.columns === (width === 390 ? 1 : 4), m);
        await ep.locator('summary').first().click();
        check(`Edge mở thông tin ${width}px`, await ep.locator('details').first().getAttribute('open') !== null, true);
      }
      await edge.close();
    }
    result.summary = { passed: result.checks.filter(x => x.pass).length, failed: result.checks.filter(x => !x.pass).length };
    await fs.writeFile(path.join(evidence, 'ket-qua-kiem-thu.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify({ browser: result.browser, summary: result.summary, viewports: result.viewports.map(m => ({ width: m.viewport, columns: m.columns, padding: m.infoPadding })), contrast: result.contrast, flex: result.experiments.flexStart, spaceBetween: result.experiments.flexSpaceBetween }, null, 2));
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
}
main().catch(async error => {
  result.error = error.stack;
  await fs.writeFile(path.join(evidence, 'kiem-thu-loi.json'), JSON.stringify(result, null, 2));
  console.error(error); process.exitCode=1;
});
