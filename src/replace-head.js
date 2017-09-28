"use strict";
exports.__esModule = true;
var fs = require("fs");
exports.oldText = "<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width\">\n<link rel=\"shortcut icon\" href=\"img/autoweetjes.ico\">\n<link rel=\"author\" href=\"https://plus.google.com/104164334423971076796\" />\n<!-- ADD Fonts -->\n<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>\n<script>\n    (function (i, s, o, g, r, a, m) {\n    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {\n        (i[r].q = i[r].q || []).push(arguments)        \n}, i[r].l = 1 * new Date(); a = s.createElement(o),\n        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)\n    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');\n\n    ga('create', 'UA-4312374-5', 'auto');\n    ga('send', 'pageview');\n</script>\n\n<!-- Include CSS-->\n<link rel=\"stylesheet\" href=\"style/style.css\">\n<link rel=\"stylesheet\" href=\"style/menu.css\">\n<link rel=\"stylesheet\" href=\"style/lemonade.css\">\n<script src=\"js/cookies.js\"></script>\n<meta name=\"robots\" content=\"index, follow\">\n<meta name=\"revisit-after\" content=\"1 days\">\n\n<!-- gemaakt door www.autoweetjes.com-->";
var ReplaceHead = /** @class */ (function () {
    function ReplaceHead() {
    }
    ReplaceHead.prototype.init = function () {
        var transformHead = new TransformHead();
        var filename = './Aandrijfashoes-Opel-Corsa-vervangen.html';
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            fs.writeFile(filename, transformHead.replaceHead(data));
        });
    };
    return ReplaceHead;
}());
exports.ReplaceHead = ReplaceHead;
var TransformHead = /** @class */ (function () {
    function TransformHead() {
    }
    TransformHead.prototype.replaceHead = function (aBody) {
        var oldHead = this.getHead(aBody);
        var newHead = this.getNewHead(aBody);
        return aBody.replace(oldHead, newHead);
    };
    TransformHead.prototype.getHead = function (aBody) {
        var startIdentifier = "<head>";
        var endIdentifier = "</head>";
        return this.getLine(aBody, startIdentifier, endIdentifier);
    };
    TransformHead.prototype.getNewHead = function (abody) {
        var uniqueFields = this.getUniqueFields(abody);
        return "<head>\n        " + exports.oldText + "\n        " + uniqueFields.title + "\n        " + uniqueFields.description + "\n        " + uniqueFields.keywords + "\n        </head>";
    };
    TransformHead.prototype.getUniqueFields = function (aBody) {
        var head = this.getHead(aBody);
        return {
            title: this.getTitle(head),
            description: this.getDescription(head),
            keywords: this.getKeywords(head)
        };
    };
    TransformHead.prototype.getTitle = function (aBody) {
        var startIdentifier = "<title>";
        var endIdentifier = "</title>";
        return this.getLine(aBody, startIdentifier, endIdentifier);
    };
    TransformHead.prototype.getDescription = function (aBody) {
        var startIdentifier = "<meta name=\"description\"";
        var endIdentifier = "\">";
        return this.getLine(aBody, startIdentifier, endIdentifier);
    };
    TransformHead.prototype.getKeywords = function (aBody) {
        var startIdentifier = "<meta name=\"keywords\"";
        var endIdentifier = "\">";
        return this.getLine(aBody, startIdentifier, endIdentifier);
    };
    TransformHead.prototype.getLine = function (aBody, startIdentifier, endIdentifier) {
        var startString = aBody.split(startIdentifier)[1];
        return startIdentifier + startString.split(endIdentifier)[0] + endIdentifier;
    };
    return TransformHead;
}());
exports.TransformHead = TransformHead;
