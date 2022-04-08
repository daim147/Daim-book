"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const local_api_1 = require("local-api");
const path_1 = __importDefault(require("path"));
exports.default = new commander_1.Command()
    .command('serve [filename]')
    .description('Getting Reading to Serve File')
    .option('-p, --port <number>', 'port to run server', '4005')
    .action((filename = 'notebook.js', options) => {
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    filename = path_1.default.basename(filename);
    console.log(options);
    (0, local_api_1.serve)(parseInt(options.port), filename, dir);
});
