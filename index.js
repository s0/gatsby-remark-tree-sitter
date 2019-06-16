const treeSitter = require('remark-tree-sitter');

module.exports.setParserPlugins = options => [[treeSitter, options]];