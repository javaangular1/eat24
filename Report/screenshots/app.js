var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should check logo|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://assets.eat24.com/manifest.json - Manifest: property 'start_url' ignored, should be same origin as document.",
                "timestamp": 1541654713039,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.eat24.com/manifest.json - Manifest: property 'scope' ignored, should be same origin as document.",
                "timestamp": 1541654713039,
                "type": ""
            }
        ],
        "screenShotFile": "images\\001d000c-0012-0064-008f-006100d70017.png",
        "timestamp": 1541654714505,
        "duration": 1046
    },
    {
        "description": "should check Sign in button isEnabled|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00b7006b-000c-00f3-00e9-0000002400cb.png",
        "timestamp": 1541654717595,
        "duration": 70
    },
    {
        "description": "should check bag button isEnabled|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001300d5-009f-00cd-00fa-000b00970010.png",
        "timestamp": 1541654719783,
        "duration": 75
    },
    {
        "description": "should check the text on home page|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005c005e-0087-0086-004d-00820048003b.png",
        "timestamp": 1541654722193,
        "duration": 108
    },
    {
        "description": "should check Start your order now text|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e900ea-0098-007b-00ad-00e300b1001b.png",
        "timestamp": 1541654724370,
        "duration": 63
    },
    {
        "description": "should check visibility of check box & Find food button |Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a600db-0024-0066-0023-00b5004a0002.png",
        "timestamp": 1541654726421,
        "duration": 93
    },
    {
        "description": "should write smth in search box and hit enter|Eat 24 Group Project",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\00e300cc-00d5-00ca-0074-00d300ae0055.png",
        "timestamp": 1541654728431,
        "duration": 0
    },
    {
        "description": "should check the text on banner section|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008a002a-000a-0075-001d-001500b70078.png",
        "timestamp": 1541654728449,
        "duration": 44
    },
    {
        "description": "should check the text with FAQs link|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d800fa-002b-0065-00d8-002400980045.png",
        "timestamp": 1541654730310,
        "duration": 72
    },
    {
        "description": "should check the EAT24 & GRUBHUB Logo bags in the banner|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f00024-00af-0043-0076-00f900b700fe.png",
        "timestamp": 1541654732311,
        "duration": 72
    },
    {
        "description": "should check the css value of background-image|Eat 24 Group Project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008300c5-0096-00da-0005-004a0095007a.png",
        "timestamp": 1541654734312,
        "duration": 50
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
