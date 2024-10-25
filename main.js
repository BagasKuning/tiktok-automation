// 'app' manages the application life cycle, 'BrowserWindow' creates application windows
const { app, BrowserWindow, ipcMain } = require("electron");

// menage paths
const path = require("node:path");
const puppeteer = require("puppeteer-extra");

const { autoScroll, autoLike } = require("./src/js/utils");

//plugin to avoid bot detection
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 650,

    // preload file is running before renderer.
    // to ensure that the data required by the UI is available, before the page load
    webPreferences: {
      preload: path.join(__dirname, "src", "js", "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "src", "index.html"));
};

app.whenReady().then(() => {
  createWindow();

  /* open window if none are open (in macOS),
  because macOS apps generally continue running even without any windows open, not like Linux or Windows OS*/
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Receive data from renderer
ipcMain.on("start-automation", async (event, data) => {
  const { email, password, manyScroll, manyLike } = data;

  // headless is set to false, so that the browser runs with the GUI
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Navigate to the TikTok login page
    await page.goto("https://www.tiktok.com/login/phone-or-email/email");
    console.log("Attempting to log in...");

    // Type credentials with a delay for a more human-like interaction
    await page.type("input[name=username]", email, { delay: 30 });
    await page.type("input[placeholder=Password]", password, { delay: 30 });
    await page.locator("button[type=submit]").click();

    // Wait for navigation to complete and handle captcha/OTP
    console.log("Waiting for captcha or OTP verification...");
    await page.waitForNavigation({
      waitUntil: "networkidle2",
      timeout: 600000,
    });
    console.log("Login successful");

    let scrollDelay = 5; // suggestion min set 5s to next video
    let i = 0; //  This index is important to catch a element and for statement
    while (i < manyScroll) {
      await autoLike(page, i, manyLike);
      await autoScroll(page, scrollDelay);
      i++;
    }
  } catch (error) {
    console.error("An error occurred during automation:", error);
  } finally {
    await browser.close(); // Ensure the browser closes after the operation
  }
});
