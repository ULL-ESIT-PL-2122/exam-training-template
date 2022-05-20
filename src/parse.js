'use strict';
const fs = require('fs');
const nearley = require("nearley");
const grammar = require("./grammar.js");
const lex = require('./lex-pl.js');
const toJSRegexp = require('./to-js.js');

function parse(p) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(p); 
  const ast = parser.results[0];
  return ast;
}

function parseFromFile(origin) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    const source = fs.readFileSync(origin, 'utf8');
    parser.feed(source);
    let results = parser.results;
    
    if (results.length > 1) throw new Error(`Language Design Error: Ambiguous Grammar! Generated ${results.length}) ASTs`);
    if (results.length ==  0) {
      console.error("Unexpected end of Input error. Incomplete Egg program. Expected more input");
      process.exit(1);
    }
    const ast = results[0];
    return {ast, source};
  }
  catch(e) {
    let token = e.token;
    let message = e.message;
    let expected = message.match(/(?<=A ).*(?= based on:)/g).map(s => s.replace(/\s+token/i,''));
    let newMessage = `Unexpected ${token.type} token "${token.value}" `+
    `at line ${token.line} col ${token.col}.`;
    if (expected && expected.length) newMessage += ` Tokens expected: ${[...new Set(expected)]}`;  

    throw new Error(newMessage)
  }
}

const compile = (origin, options = undefined) => {
  let destination = options.out;
  if (destination == undefined) {
    destination = origin.match(/^[^\.]*/)[0] + '.json';
  }

  try {
    const output = parseFromFile(origin); // returns {ast, source}
    output.file = origin; // add the file name 
    const ast = output.ast;
    if (!ast) throw new Error("Syntactic Error!");
    //console.log(ast);
    output.output = toJSRegexp(ast); // Resulting JS regexp
    const astString = JSON.stringify(output, null, 2);
    fs.writeFileSync(destination, astString);
    if (options.verbose) console.log(astString);
  }
  catch(e) {
    console.error(e.message);
    process.exit(1)
  }

};

module.exports = {
  lex,
  parse,
  parseFromFile,
  toJSRegexp,
  compile,
};
