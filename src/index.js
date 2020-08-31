import dynamicImportSyntax from '@babel/plugin-syntax-dynamic-import';


const CALL = 'CallExpression';
const LAZY_IMPORT = 'lazyImport';
const IDENTIFIER = 'Identifier';


export default ({ template, types }) => ({
  name: 'babel-plugin-lazy-imports-spr',
  inherits: dynamicImportSyntax,
  visitor: {
    Program: {
      enter(root, { opts }) {
        root.traverse({
          [CALL]: path => {
            const callee = path.node.callee;

            if (callee.type === IDENTIFIER && callee.name === LAZY_IMPORT) {
              const importArgs = path.node.arguments;

              const replacementCalleeTemplate = opts.replacement ?
                template(`${opts.replacement}(SOURCE)`)({ SOURCE: importArgs })
                : template('require(SOURCE)')({ SOURCE: importArgs });

              if (types.isStringLiteral(importArgs[0])) {
                path.replaceWith(replacementCalleeTemplate);
              }
            }
          },
        });
      }
    }
  }
});
