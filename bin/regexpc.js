#!/usr/bin/env node
 'use strict';

 const {program} = require('commander');
 const {compile} = require("../src/parse.js");
 const {version} = require('../package.json');

 program
     .version(version)
     .arguments('<origin>')
     .option(
         '-o, --out <destination>', 'Path for output file. If it isn\'t ' +
         'specified the path of the origin file will be used,' +
         'changing the extension to .json',
     )
     .option('-v, --verbose', 'Prints the AST and the generated regexp')
     .description(
         'Compile a regexp file',
         {
           origin: 'The path of the file to compile',
         },
     )
     .action((origin, options) => {
       try {
         compile(origin, options);
       } catch (err) {
         console.log('There was an error: ' + err.message);
       }
     });
 program.parse(process.argv);
 