#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serve_1 = __importDefault(require("./commands/serve"));
const commander_1 = require("commander");
commander_1.program.addCommand(serve_1.default);
commander_1.program.parse(process.argv);
