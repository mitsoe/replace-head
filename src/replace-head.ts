import * as fs from 'fs';

export const oldText = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<link rel="shortcut icon" href="img/autoweetjes.ico">
<link rel="author" href="https://plus.google.com/104164334423971076796" />
<!-- ADD Fonts -->
<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
<script>
    (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)        
}, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-4312374-5', 'auto');
    ga('send', 'pageview');
</script>

<!-- Include CSS-->
<link rel="stylesheet" href="style/style.css">
<link rel="stylesheet" href="style/menu.css">
<link rel="stylesheet" href="style/lemonade.css">
<script src="js/cookies.js"></script>
<meta name="robots" content="index, follow">
<meta name="revisit-after" content="1 days">

<!-- gemaakt door www.autoweetjes.com-->`

export class ReplaceHead {

    public init() {
        const transformHead = new TransformHead();
        const filename: string = './Aandrijfashoes-Opel-Corsa-vervangen.html';
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            fs.writeFile(filename, transformHead.replaceHead(data))
        });
    }
}

export interface UniqueFields {
    title: string;
    description: string;
    keywords: string;
}

export class TransformHead {

    public replaceHead(aBody: string): string {
        const oldHead = this.getHead(aBody);
        const newHead = this.getNewHead(aBody);
        return aBody.replace(oldHead, newHead);
    }

    public getHead(aBody): string {
        const startIdentifier = `<head>`;
        const endIdentifier = `</head>`;
        return this.getLine(aBody, startIdentifier, endIdentifier);
    }

    private getNewHead(abody): string {
        const uniqueFields: UniqueFields = this.getUniqueFields(abody);
        return `<head>
        ${oldText}
        ${uniqueFields.title}
        ${uniqueFields.description}
        ${uniqueFields.keywords}
        </head>`
    }

    public getUniqueFields(aBody): UniqueFields {
        const head = this.getHead(aBody);
        return {
            title: this.getTitle(head),
            description: this.getDescription(head),
            keywords: this.getKeywords(head),
        }
    }


    public getTitle(aBody): string {
        const startIdentifier = `<title>`;
        const endIdentifier = `</title>`;
        return this.getLine(aBody, startIdentifier, endIdentifier);
    }

    public getDescription(aBody): string {
        const startIdentifier = `<meta name="description"`;
        const endIdentifier = `">`;
        return this.getLine(aBody, startIdentifier, endIdentifier);
    }

    public getKeywords(aBody): string {
        const startIdentifier = `<meta name="keywords"`;
        const endIdentifier = `">`;
        return this.getLine(aBody, startIdentifier, endIdentifier);
    }

    private getLine(aBody: any, startIdentifier: string, endIdentifier: string) {
        const startString = aBody.split(startIdentifier)[1];
        return startIdentifier + startString.split(endIdentifier)[0] + endIdentifier;
    }
}
