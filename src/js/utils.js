/**
 * Waits for a specified timeout period.
 * @param {number} time - Time in milliseconds to wait.
 * @returns {Promise<void>}
 */
const waitForTimeout = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

/**
 * Converts seconds to milliseconds.
 * @param {number} seconds - Time in seconds to convert.
 * @returns {number} Time in milliseconds.
 */
const convertSecondsToMilliseconds = (seconds) => seconds * 1000;

/**
 * Automatically likes a TikTok post based on the given index.
 * @param {Object} page - The Puppeteer page object.
 * @param {number} indexArticle - The index of the article to like.
 * @param {number} numOfLikes - The total number of likes to perform.
 * @returns {Promise<void>}
 */
const autoLike = async (page, indexArticle, numOfLikes) => {
  try {
    // stop liking statement
    if (indexArticle < numOfLikes) {
      await page.waitForSelector(`article[data-index="${indexArticle}"]`);
      const videoElement = await page.$(`article[data-index="${indexArticle}"]`);

      // Check and close floating modal on first video on login
      if(videoElement && indexArticle == 0){
        await videoElement.waitForSelector('.css-mp9aqo-DivIconCloseContainer.e1vz198y6')
        const elementCloseFloating = await videoElement.$('.css-mp9aqo-DivIconCloseContainer.e1vz198y6');
        await elementCloseFloating.click();
      } 
       
      // catch and click like button
      if (videoElement) {
        await videoElement.waitForSelector('.css-67yy18-ButtonActionItem.e1hk3hf90')
        const likeButton = await videoElement.$('.css-67yy18-ButtonActionItem.e1hk3hf90');
        await likeButton.click();
      } else {
        console.warn(`No video found at index ${indexArticle}`);
      }
    }
  } catch (error) {
    console.error(`Error liking post at index ${indexArticle}:`, error);
  }
};

/**
 * Automatically scrolls down the TikTok page.
 * @param {Object} page - The Puppeteer page object.
 * @param {number} seconds - The number of seconds to wait before scrolling down.
 * @returns {Promise<void>}
 */
const autoScroll = async (page, seconds = 10) => {
  const miliSecond  = convertSecondsToMilliseconds(seconds);
  await waitForTimeout(miliSecond);
  await page.keyboard.press("ArrowDown");
};

module.exports = { autoScroll, autoLike, waitForTimeout };
