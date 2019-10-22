const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const Table = require('cli-table')
const { assert } = require('chai')
const fs = require('fs');

testUrl = 'https://www.thoughtworks.com/what-we-do'
const table = new Table()
const config = require('../config/config.js')


  // https://github.com/GoogleChrome/chrome-launcher#launch-options
const opts = {
    logLevel: 'info',
    // logLevel: 'silent',
    output: 'html',
    disableDeviceEmulation: true,
    defaultViewport: {
      width: 200,
      height: 900,
    },
    chromeFlags: [
      // '--headless',
      '--disable-mobile-emulation',
      '--no-sandbox',
      // '--show-paint-rects',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-sync',
      '--disable-default-apps',
      '--mute-audio',
      '--no-first-run',
      '--enable-automation',
      '--disable-gpu',
    ],
  };

  async function openChrome(opts) {
    chromeBrowser = chromeLauncher.launch(opts).then(chrome => {
       sleep(5000).then(() => {
         chrome.kill()
       })
     });
   }
  


const path = '../config/config-mobile.js'

function z() {
try {
  if (fs.existsSync(path)) {
    console.log("exists")
  }
} catch(err) {
  console.error(err)
}
}

z()