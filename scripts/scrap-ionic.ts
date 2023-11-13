import { load, type AnyNode } from 'cheerio';
import cs from 'cloudscraper';
const cloudscraper = cs.defaults({ resolveWithFullResponse: true });

const mainDocsURL = 'https://ionicframework.com';
const downloadedContent: any[] = [];

const getLinksList = (responseBody: AnyNode[]) => {
  const $ = load(responseBody);
  const linksSet = new Set<string>();

  $('ul li a').each(function () {
    if (typeof $(this).attr('href') === 'string') {
        linksSet.add($(this).attr('href') as string);
    }
  });

  if (linksSet.size < 1) throw new Error('No links found');

  return Array.from(linksSet).filter(str => str.charAt(0) === '/');
};

const getCSSVars = (responseBody: AnyNode[]) => {
  const $ = load(responseBody);
  const cssVars: any[] = [];

  $('#css-custom-properties + .table-wrapper > table > tbody > tr').each(function () {
    cssVars.push({
      cssVar: $(this).children(':first-child').text().trim(),
      cssDesc: $(this).children(':nth-child(2)').text().trim(),
    });
  });

  return cssVars;
};

const getPageContent = (link: string) => cloudscraper.get(mainDocsURL + link)
  .then((response: any) => {
    const $ = load(response.body);
    downloadedContent.push({
      title: $('h1').text().trim(),
      url: mainDocsURL + link,
      cssVars: getCSSVars(response.body),
    });
  });

const scrapData = () => cloudscraper.get(`${mainDocsURL}/docs/api`)
  .then((response: any) => {
    const linksList = getLinksList(response.body);
    const promises = linksList.map(link => getPageContent(link));

    return Promise.all(promises);
  });


console.log('Scraping Ionic docs from ' + mainDocsURL);
await scrapData();
const entriesWithCssVars = downloadedContent.filter(data => data.cssVars.length > 0);
const orderedEntries = entriesWithCssVars.sort((a, b) => a.title.localeCompare(b.title));
const data = JSON.stringify(orderedEntries, null, 2);
await Bun.write("src/data/data.json", data);
const buildDate = new Date().toISOString();
await Bun.write("src/data/buildDate.json", JSON.stringify({ buildDate }, null, 2));
console.log('Data saved to src/data/data.json and src/data/buildDate.json');
console.log('Scraping finished successfully!');
