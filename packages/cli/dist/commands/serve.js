"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const local_api_1 = require("@daim-book/local-api");
const path_1 = __importDefault(require("path"));
const isProduction = process.env.NODE_ENV === 'production';
exports.default = new commander_1.Command()
    .command('serve [filename]')
    .description('Getting Reading to Serve File')
    .option('-p, --port <number>', 'port to run server', '4005')
    .action((filename = 'notebook.js', options) => __awaiter(void 0, void 0, void 0, function* () {
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    filename = path_1.default.basename(filename);
    try {
        yield (0, local_api_1.serve)(parseInt(options.port), filename, dir, !isProduction);
        console.log(`  Server is running navigate to http://localhost:${options.port}
			`);
    }
    catch (error) {
        if (error.code === 'EADDRINUSE') {
            console.error(`Try to run on different port except ${options.port} --port {port number} `);
        }
        console.error('Here is the problem', error.message);
    }
}));
