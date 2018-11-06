let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {

    directConnect: true,

    capabilities: {
        browserName: 'chrome'
    },

<<<<<<< HEAD
    specs: ['../Tests/drivers.spec.js'],
=======
    specs: ['../Tests/Eat24.spec.js'],
>>>>>>> 779857f93e7b4d2e44b627bb051a8e44fb1c854c
    onPrepare: function () {
        browser.driver.manage().window().maximize();
        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailuredSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true,
            showstack: false
        }));
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: '../report/screenshots',
            preserveDirectory: false,
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            docName: 'Eat24-Report.html'
        }).getJasmine2Reporter());

    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {}

    }
};