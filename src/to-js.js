let toJS = Object.create(null);

toJS.OR = ast => {
  /* ... */
};

toJS.PLUS = ast => {
  /* ... */
};

toJS.STAR = ast => {
  /* ... */ 
};

toJS.CAT = ast => {
  /* ... */
};

toJS.PAREN = ast => {
  /* ... */
};

toJS.CHAR = toJS.DOT = ast => {  /* ... */ };

function toJSRegexp(ast) {
  if (toJS[ast.type]) return toJS[ast.type](ast);
  return `toJS for ${ast.type} is not implemented`;
}

module.exports = toJSRegexp;