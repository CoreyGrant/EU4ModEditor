import fs from 'fs';
import {Reader}  from './reader.js';
import {serialize} from './serializer.js';
import path from 'path';
import {getTokens, TokenType} from './lexer.js';
import {parseTokens} from './tokenParser.js';
import {encode, decode} from 'windows-1252';
import iconv from 'iconv-lite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loop(str){
    var [object, comments] = parseTokens(getTokens(str));
    return serialize(object, comments);
}


// // var logStream = fs.createWriteStream('./logFile.log', {flags: 'a'});
// // process.stdout.pipe(logStream);

var fileData = fs.readFileSync(path.join(__dirname, "test.txt"));
var fileData1252 = iconv.decode(fileData, 'win1252');
// var tokens = getTokens(fileData1252);
// fs.writeFileSync(
//     path.join(__dirname, "tokens.json"),
//     JSON.stringify(
//         tokens,
//         null,
//         2));
// var parsedTokens = parseTokens(tokens);
// var parsedTokensJson = JSON.stringify(parsedTokens, null, 2);
// fs.writeFileSync(path.join(__dirname, "parsed-tokens.json"), iconv.encode(parsedTokensJson, 'utf8'));

 fs.writeFileSync(path.join(__dirname, "doubleloop.txt"), iconv.encode(loop(loop(fileData1252)), 'utf8'));
