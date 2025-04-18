# TikTok Automation Bot - Electron.js & Puppeteer
This Electron.js application automates logging into TikTok, scrolling through posts, and liking them using Puppeteer with stealth plugins to avoid detection.

## Features
- Automatic Login: Logs into TikTok with the provided credentials.
- Scrolling and Liking: Automatically scrolls through videos and likes them.
- Customizable: Adjust the number of scrolls, delays, and post limits.
 
## Prerequisites
> [!WARNING]  
> Node.js version >= 18 installed on your machine.

## Installation and Running the Bot
1. Clone the repository from GitHub:
```bash
git clone https://github.com/BagasKuning/tiktok-automation.git
```
2. Navigate to the project folder:
```bash
cd tiktok-automation
```

3. Install the dependencies:
```bash
npm install
```

4. Start the app:
```bash
npm start
```

## Build App

- windows ps
``` bash
$env:GITHUB_TOKEN="your_token_here"; npx electron-builder --publish always
```

- mac/bash
``` bash
GITHUB_TOKEN="your_token_here" npx electron-builder --publish always
```

## How It Works
1. **Login**: The app opens a window with a login form for TikTok credentials.
2. **Automation**: Once credentials are submitted, Puppeteer opens a browser, logs into TikTok, scrolls through posts, and automatically likes them.
3. **Customization**: You can adjust the number of posts to like and scroll behavior by modifying `main.js`.
 

## Customization
To modify behavior (e.g., change the number of posts to like or scroll limits), edit the main.js file:

```javascript
let scrollDelay = 5;  // recommended minimum 5 seconds
```

## Dependencies
- **Electron.js**: Manages the desktop app lifecycle.
- **Puppeteer.js**: Controls the browser for TikTok automation.
- **puppeteer-extra-plugin-stealth**: Helps bypass bot detection.