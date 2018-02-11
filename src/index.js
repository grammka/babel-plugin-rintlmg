module.exports = function(babel) {
  const t = babel.types;

  return {
    visitor: {
      ExportDefaultDeclaration: function(path, state) {
        if (path.node.declaration.callee && path.node.declaration.callee.name === 'defineMessages') {
          const pathname          = state.file.opts.filename;
          const rootId            = pathname.replace(process.cwd() + '/', '').replace(/\/[^/]+.js$/, '').replace(/\//g, '.');
          const objectProperties  = path.node.declaration.arguments[0].properties;

          objectProperties.forEach(function(property, index) {
            const key       = property.key.value || property.key.name;

            const idPath    = `${rootId}.${key}`;

            if (t.isObjectExpression(property.value)) {
              const properties = objectProperties[index].value.properties;

              properties.forEach(function(property, index) {
                const key     = property.key.value || property.key.name;
                const value   = property.value;

                properties[index].value = t.objectExpression([
                  t.objectProperty(t.identifier('id'), t.stringLiteral(`${idPath}.${key}`)),
                  t.objectProperty(t.identifier('defaultMessage'), value)
                ]);
              });
            }
            else if (t.isStringLiteral(property.value) || t.isTemplateLiteral(property.value)) {
              objectProperties[index].value = t.objectExpression([
                t.objectProperty(t.identifier('id'), t.stringLiteral(idPath)),
                t.objectProperty(t.identifier('defaultMessage'), property.value)
              ])
            }
            else {
              throw new Error('Smth wrong')
            }
          })
        }
      }
    }
  };
};
