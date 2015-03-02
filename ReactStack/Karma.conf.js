module.exports = function(config){
    config.set({
        files: [],
        exclude: [],
        preprocessors: {},
        plugins: [
            "karma-chai",
            "karma-mocha",
            "karma-mocha-reporter",
            "karma-phantomjs-launcher"
        ],
        frameworks: [
            "chai",
            "mocha"
        ],
        reporters: [
            "mocha"
        ],
        browsers: ["PhantomJS"],
        port: 9876,
        runnerPort: 9100,
        reportSlowerThan: 500,
        captureTimeout: 30000,
        colors: true,
        autoWatch: false,
        singleRun: false
    })
}