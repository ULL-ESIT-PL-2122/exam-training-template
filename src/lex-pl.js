const { tokens } = require('./tokens.js');
const { nearleyLexer } = require("@ull-esit-pl-2122/lexer-generator-solution");

let lexer = nearleyLexer(tokens, {});
module.exports = lexer;
