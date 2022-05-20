const location = process.env.parse_location;

function buildChar([char]) {
  /* fill in */
}

function buildOr([regexp, _, concat]) {
  /* fill in */
}

function buildCAT([concat, closure]) {
  /* fill in */
}

function buildSpecial([special]) {
  /* fill in */
}

function buildClosureOp([closure, operator]) {
  /* fill in */
}

function buildParen([lp, paren, rp]) {
  /* fill in */
}

module.exports = { 
  buildChar, buildOr, buildCAT, buildClosureOp, buildParen,
  buildSpecial,
};
