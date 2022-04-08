"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
exports.default = new commander_1.Command()
    .name('serve')
    .description('Getting Reading to Serve File')
    .action(() => {
    console.log('HEllo world');
});
