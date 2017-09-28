import 'mocha';

import { expect } from 'chai';

import { oldText, TransformHead, UniqueFields } from './replace-head';

describe('Test head transformation', () => {
    const transformHead: TransformHead = new TransformHead();
    const body: string = `<head>
    <!-- gemaakt door www.autoweetjes.com-->
    <meta name="description" content="uitleg hoe zelf aandrijfashoes opel corsa vervangen lekkage aandrijfashoes stofhoes vervangen gescheurde aandrijfashoes na verlies vet geen smering meer">
    <meta name="keywords" content="Informatie, technische, info, hoes, utleg, stofhoes, repareren, homokineet, reparatie ">
    <meta name="robots" content="index, follow">
    <meta name="revisit-after" content="1 days">
    <title>Aandrijfashoes-gescheurde-stofhoes-opel-corsa-vervangen</title>
    <!-- aandrijfashoes, opel, vervangen -->
    </head>`;

    const headBody = 'test' + body;

    it('should get head', () => {
        const result = transformHead.getHead(headBody);
        expect(result).to.equal(body);
    });

    it('should get title', () => {
        const result = transformHead.getTitle(body);
        expect(result).to.equal('<title>Aandrijfashoes-gescheurde-stofhoes-opel-corsa-vervangen</title>');
    });

    it('should get description', () => {
        const result = transformHead.getDescription(body);
        expect(result).to.equal('<meta name="description" content="uitleg hoe zelf aandrijfashoes opel corsa vervangen lekkage aandrijfashoes stofhoes vervangen gescheurde aandrijfashoes na verlies vet geen smering meer">');
    });

    it('should get keywords', () => {
        const result = transformHead.getKeywords(body);
        expect(result).to.equal('<meta name="keywords" content="Informatie, technische, info, hoes, utleg, stofhoes, repareren, homokineet, reparatie ">');
    });

    it('should get unique fields', () => {
        const result = transformHead.getUniqueFields(body);
        expect(result.keywords).to.equal('<meta name="keywords" content="Informatie, technische, info, hoes, utleg, stofhoes, repareren, homokineet, reparatie ">');
        expect(result.description).to.equal('<meta name="description" content="uitleg hoe zelf aandrijfashoes opel corsa vervangen lekkage aandrijfashoes stofhoes vervangen gescheurde aandrijfashoes na verlies vet geen smering meer">');
        expect(result.title).to.equal('<title>Aandrijfashoes-gescheurde-stofhoes-opel-corsa-vervangen</title>');
    });

    it('should replace head', () => {
        const result = transformHead.replaceHead(body);
        const uniqueFields: UniqueFields = {
            title: '<title>Aandrijfashoes-gescheurde-stofhoes-opel-corsa-vervangen</title>',
            description: '<meta name="description" content="uitleg hoe zelf aandrijfashoes opel corsa vervangen lekkage aandrijfashoes stofhoes vervangen gescheurde aandrijfashoes na verlies vet geen smering meer">',
            keywords: '<meta name="keywords" content="Informatie, technische, info, hoes, utleg, stofhoes, repareren, homokineet, reparatie ">'
        }
        expect(result).to.equal(`<head>
        ${oldText}
        ${uniqueFields.title}
        ${uniqueFields.description}
        ${uniqueFields.keywords}
        </head>`);
    });

});