module.exports = function (babel) {
  var t = babel.types;

  var getIdNode = function (id) {
    return t.objectProperty(t.identifier('id'), t.stringLiteral(id));
  }

  var isTranslationsNode = function (node) {
    if (!node.properties || !node.properties.length) {
      throw new Error('babel-plugin-rintlmg: node can\'t be empty!')
    }

    return t.isStringLiteral(node.properties[0].value) || t.isTemplateLiteral(node.properties[0].value)
  }

  var transformProps = function ({ props, opts, rootPath }) {
    props.forEach(function(prop, index) {
      var key   = prop.key.value || prop.key.name;
      var node  = prop.value;

      if (isTranslationsNode(node)) {
        if (opts.messages) {
          node.properties.push(getIdNode(rootPath))
        }
        else {
          props[index].value = t.objectExpression([
            getIdNode(rootPath),
          ])
        }
      }
      else {
        var nestedProps  = node.properties;
        var idPath       = `${rootPath}.${key}`;

        transformProps({
          props: nestedProps,
          opts,
          rootPath: idPath,
        });
      }
    });
  };

  return {
    visitor: {
      ExportDefaultDeclaration: function(path, state) {
        // find `defineMessages({`
        if (path.node.declaration.callee && path.node.declaration.callee.name === 'defineMessages') {
          // get file pathname to generate message `id`
          var pathname          = state.file.opts.filename;
          var rootPath          = pathname.replace(process.cwd() + '/', '').replace(/\/[^/]+.js$/, '').replace(/\//g, '.');
          var objectProperties  = path.node.declaration.arguments[0].properties;

          transformProps({
            props: objectProperties,
            opts: state.opts,
            rootPath,
          });
        }
      }
    }
  };
};
