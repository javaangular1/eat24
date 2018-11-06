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
        "description": "should get the Title of the navigated page|Drivers GrubHub link functionalities",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21808,
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
                "timestamp": 1541484344034,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.eat24.com/manifest.json - Manifest: property 'scope' ignored, should be same origin as document.",
                "timestamp": 1541484344034,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541484347237,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484347737,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484347737,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00b40057-0080-00b0-0000-00030003003c.png",
        "timestamp": 1541484336837,
        "duration": 11985
    },
    {
        "description": "should check visibility of the logos at the Top Left & Right|Drivers GrubHub link functionalities",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21808,
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
                "timestamp": 1541484352578,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.eat24.com/manifest.json - Manifest: property 'scope' ignored, should be same origin as document.",
                "timestamp": 1541484352578,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541484355941,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484356450,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484356451,
                "type": ""
            }
        ],
        "screenShotFile": "images\\000200a0-00ba-0051-001d-0079005000ba.png",
        "timestamp": 1541484349706,
        "duration": 7394
    },
    {
        "description": "should check the Earn your way,taste success.png|Drivers GrubHub link functionalities",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21808,
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
                "timestamp": 1541484361253,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.eat24.com/manifest.json - Manifest: property 'scope' ignored, should be same origin as document.",
                "timestamp": 1541484361253,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541484364521,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484364975,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484364975,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00f000b1-0091-00f9-00e5-0033007700a8.png",
        "timestamp": 1541484357912,
        "duration": 8830
    },
    {
        "description": "should check Become a Grubhub driver... text|Drivers GrubHub link functionalities",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21808,
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
                "timestamp": 1541484368668,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.eat24.com/manifest.json - Manifest: property 'scope' ignored, should be same origin as document.",
                "timestamp": 1541484368669,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541484372049,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484372484,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484372484,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00370001-00c8-0013-001e-00410021005f.png",
        "timestamp": 1541484367597,
        "duration": 5475
    },
    {
        "description": "should check visibility and CSS values of the Image|Drivers GrubHub link functionalities",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21808,
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
                "timestamp": 1541484375120,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.eat24.com/manifest.json - Manifest: property 'scope' ignored, should be same origin as document.",
                "timestamp": 1541484375120,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541484378502,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484379272,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://driver.grubhub.com/?utm_source=eat24.com&utm_medium=owned_channel&utm_campaign=footerlink 734 A parser-blocking, cross site (i.e. different eTLD+1) script, https://munchkin.marketo.net/munchkin.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1541484379274,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00f7009b-00d5-00d2-007a-00b8002700f4.png",
        "timestamp": 1541484373864,
        "duration": 6066
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
