import * as cheerio from 'cheerio';
import slugify from 'slugify';
/**
 * 
 * @param {string} websiteLink link of website open textbook library
 * @returns {Promise<String>} imgUrl of open textbook library
 */
export async function fetchToGetImgUrlOpenTextBook(websiteLink){
  if(!websiteLink)
      throw new Error('Need a string for websiteLink')
    // Fetch the HTML content of the web page to be scraped
  const response = await fetch(websiteLink);
  const html = await response.text();

  // Load the HTML content into Cheerio
  const $ = cheerio.load(html);

  const imgUrl = $("img.cover").attr('src');
  return imgUrl;
}
/**
 * 
 * @param {string} slug 
 * @returns {string} encoded slug
 */
export function encodeSlug(slug){
  if(!slug)
    throw new Error('Need a string for slug');
  return encodeURIComponent(slugify(slug)) 
}
/**
 * 
 * @param {string} urlArg 
 * @returns {Boolean}
 */
export function isValidUrl(urlArg){
  try {
    const url = new URL(urlArg);
  } catch(error){
    return false;
  }
  return true;
}