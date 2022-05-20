@{%
  const lexer = require('./lex-pl.js');
  const { buildChar, buildOr, buildCAT, 
    buildClosureOp,
    buildParen,
    buildSpecial,
  } = require('./build-ast.js');
%}

@lexer lexer
program -> regexp %EOF {% id %}
regexp -> /* fill */
  %CHAR          {% buildChar %}
   