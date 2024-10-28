import * as cheerio from 'cheerio';
/**
 * 
 * @param {string} websiteLink link of website open textbook library
 * @returns {Promise<String>} imgUrl of open textbook library
 */
export async function fetchToGetImgUrlOpenTextBook(websiteLink){
    // Fetch the HTML content of the web page to be scraped
  const response = await fetch(websiteLink);
  const html = await response.text();

  // Load the HTML content into Cheerio
  const $ = cheerio.load(html);

  const imgUrl = $("img.cover").attr('src');
  return imgUrl;
}
export function decodeSlug(encodeSlug){
  const replaceWhiteSpace = encodeSlug.replace(/-+/g, ' ');
  return replaceWhiteSpace;
}
