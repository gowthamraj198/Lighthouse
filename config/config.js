module.exports = {
  extends: 'lighthouse:full',
  settings: {
    onlyCategories: ['performance','accessibility','best-practices','seo','pwa'],
    onlyAudits: [
      // 'first-meaningful-paint',
      // 'speed-index',
      // 'first-cpu-idle',
      // 'interactive',
      // 'works-offline'
      // 'metrics'
    ],
      passes: [
        {
          passName: 'defaultPass',
          gatherers: ['css-usage',
          'viewport-dimensions',
          'runtime-exceptions',
          'console-messages',
          'anchor-elements',
          'image-elements',
          'link-elements',
          'meta-elements',
          'script-elements',
          'iframe-elements',
          'dobetterweb/appcache',
          'dobetterweb/doctype',
          'dobetterweb/domstats',
          'dobetterweb/optimized-images',
          'dobetterweb/password-inputs-with-prevented-paste',
          'dobetterweb/response-compression',
          'dobetterweb/tags-blocking-first-paint',
          'seo/font-size',
          'seo/embedded-content',
          'seo/robots-txt',
          'seo/tap-targets',
          'accessibility',],
        },
        // {
              disableDeviceEmulation= true
        //   passName: 'slowPass',
        //   recordTrace: true,
        //   useThrottling: true,
        //   networkQuietThresholdMs: 5000,
        //   gatherers: ['slow-gatherer'],
        // }
      ]
  },
};