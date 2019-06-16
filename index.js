const treeSitter = require('remark-tree-sitter');

module.exports.setParserPlugins = options => {
  try {
    treeSitter.validateOptions(options);
  } catch (e) {
    throw new Error('Invalid options passed to plugin gatsby-remark-tree-sitter: ' + e.toString());
  }
  return [[treeSitter, options]];
};