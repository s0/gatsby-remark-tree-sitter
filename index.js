const treeSitter = require('remark-tree-sitter');

module.exports = ({ markdownAST }, options) => {
  console.log('run');
  const transformer = treeSitter(options)

  return transformer(markdownAST);
}

module.exports.setParserPlugins = options => {
  // Hook into setParserPlugins (which is only called once) to validate the options
  try {
    treeSitter.validateOptions(options);
  } catch (e) {
    throw new Error('Invalid options passed to plugin gatsby-remark-tree-sitter: ' + e.toString());
  }
  return [];
};
