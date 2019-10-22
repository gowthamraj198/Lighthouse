const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const { assert } = require('chai')
const data = require('../data/data.js')
const helpers = require('./helpers/helpers.js')


const opts = {
  startingUrl: '',
  output: 'html',
  // logLevel: 'info',
  chromeFlags: [
    // '--headless'
    '--window-size=1440,1696',
    '--disable-mobile-emulation',
    '--disable-network-throttling',
    '--disable-cpu-throttling',
    // 'disableDeviceEmulation: true'
  ]
}

function launchChromeAndRunLighthouse(opts, url, conf = null, mode) {
  return chromeLauncher.launch(opts).then(chrome => {
    opts.port = chrome.port
    return lighthouse("https://www.thoughtworks.com/" + url, opts, conf).then(res => {
      {
        results = res.report;
        report_file = helpers.file_name(url, mode)
        helpers.find_write_report(report_file, results)
        return chrome.kill().then(() => res.lhr)
      }
    });
  });
}

data.urls_mode.forEach(({ url, mode }) => {
  let config
  config = helpers.decide_config(mode)
  describe('Lighthouse Testing', function () {
    this.timeout(50000)
    let results
    before('run test', done => {
      launchChromeAndRunLighthouse(opts, url, config, mode).then(res => {
        results = Object.keys(res.categories).reduce((merged, category) => {
          merged[category] = res.categories[category].score
          return merged
        }, {})
        done()
      })
    })
    after(function() {
      helpers.write_results_to_table(results)
    })

    it('should have performance score greater than 90', done => {
      assert.equal(results.performance > 0.9, true)
      done()
    })
  })
})
