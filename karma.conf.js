// Karma configuration
// Generated on Fri Feb 19 2016 12:09:53 GMT+0530 (India Standard Time)

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'test-context.js'}
    ],
    exclude: [],
    preprocessors: {
      'test-context.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [{
          test: /\.js?/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'stage-2']
          }
        }, {
          test: /\.js/,
          exclude: /node_modules|test/,
          loader: 'istanbul-instrumenter-loader',
          query: {
            esModules: true
          }
        }]
      },
      watch: true
    },
    reporters: ['dots', 'coverage', 'junit'],
    coverageReporter: {
      type: 'html',
      dir: 'test_js',
      subdir: '.'
    },

    junitReporter: {
      outputDir: 'test_js',
      outputFile: 'output.xml',
      useBrowserName: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  })
};