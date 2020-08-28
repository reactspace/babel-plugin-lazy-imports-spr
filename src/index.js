import dynamicImportSyntax from '@babel/plugin-syntax-dynamic-import';


const IMPORT = 'Import';
const CALL = 'CallExpression';


export default ({ template, types }) => ({
  name: 'babel-plugin-lazy-imports-spr',
  inherits: dynamicImportSyntax,
  visitor: {
    Program: {
      enter(root) {
        root.traverse({
          [CALL]: path => {
            if (path.node.callee.type === IMPORT) {
              const importArgs = path.node.arguments;
              if (types.isStringLiteral(importArgs[0])) {
                path.replaceWith(template('require(SOURCE)')({ SOURCE: importArgs }));
              }
            }
          },
        });
      }
    }
  }
});
