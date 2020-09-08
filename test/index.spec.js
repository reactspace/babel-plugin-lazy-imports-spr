const pluginTester = require('babel-plugin-tester').default;

const plugin =  require('../lib').default;

const path = require('path');

pluginTester({
  plugin,
  pluginOptions: { replacement: 'require' },
  fixtures: path.join(__dirname, 'fixtures')
});
