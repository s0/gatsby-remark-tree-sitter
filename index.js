const treeSitter = require('remark-tree-sitter');

let transformer = null;

module.exports = ({ markdownAST }, options) => {
  if (!transformer || transformer.options !== options) {
    try {
      transformer = {
        transformer: treeSitter(options),
        options
      };
    } catch(e) {
      throw new Error('Invalid options passed to plugin gatsby-remark-tree-sitter: ' + e.toString());
    }
  }

  return transformer.transformer(markdownAST);
}
