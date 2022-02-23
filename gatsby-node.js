/* eslint-disable import/no-extraneous-dependencies */
const cheerio = require('cheerio');
const cloudscraper = require('cloudscraper').defaults({ resolveWithFullResponse: true });

const mainDocsURL = 'https://ionicframework.com';
const downloadedContent = [];

const getLinksList = (responseBody) => {
  const $ = cheerio.load(responseBody);
  const linksSet = new Set();

  $('ul li a').each(function () {
    linksSet.add($(this).attr('href'));
  });

  if (linksSet.size < 1) throw new Error('No links found');

  return Array.from(linksSet).filter(str => str.charAt(0) === '/');
};

const getCSSVars = (responseBody) => {
  const $ = cheerio.load(responseBody);
  const cssVars = [];

  $('#css-custom-properties + .table-wrapper > table > tbody > tr').each(function () {
    cssVars.push({
      cssVar: $(this).children(':first-child').text().trim(),
      cssDesc: $(this).children(':nth-child(2)').text().trim(),
    });
  });

  return cssVars;
};

const getMethods = (responseBody) => {
  const $ = cheerio.load(responseBody);
  const methods = [];

  $('#methods ~ h3').each(function () {
    methods.push({
      name: $(this).text().trim(),
      description: $(this).next(".table-wrapper").children('table').children('tbody').children(':first-child').children(':nth-child(2)').text().trim(),
      signature: $(this).next(".table-wrapper").children('table').children('tbody').children(':nth-child(2)').children(':nth-child(2)').text().trim()
    })
  });

  console.log(methods);

  return methods;
}

const getPageContent = link => cloudscraper.get(mainDocsURL + link)
  .then((response) => {
    const $ = cheerio.load(response.body);
    downloadedContent.push({
      title: $('h1').text().trim(),
      url: mainDocsURL + link,
      cssVars: getCSSVars(response.body),
      methods: getMethods(response.body)
    });
  });

exports.onPreBootstrap = () => cloudscraper.get(`${mainDocsURL}/docs/api`)
  .then((response) => {
    const linksList = getLinksList(response.body);
    const promises = linksList.map(link => getPageContent(link));

    return Promise.all(promises);
  });

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);

  const isEmpty = downloadedContent.filter(data => data.cssVars.length > 0 || data.methods.length > 0);
  if (isEmpty.length < 1) throw new Error('No data to be displayed');

  const dateNow = new Date();
  createPage({
    ...page,
    context: {
      ...page.context,
      downloadedContent: downloadedContent.sort((a, b) => a.title.localeCompare(b.title)),
      buildDate: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`,
    },
  });
};
