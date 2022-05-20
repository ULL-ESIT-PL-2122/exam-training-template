const SPACE = /(?<SPACE>...)/; SPACE.skip = true;
const CHAR =  /(?<CHAR>[^*+?|^$.\\]|\\.)/; // not complete!
const tokens = [ ];

module.exports = {tokens};