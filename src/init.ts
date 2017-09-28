import { ReplaceHead } from './replace-head';


export class Init {
    constructor() {
        const replaceHead: ReplaceHead = new ReplaceHead();
        replaceHead.init();
    }
}

new Init();