var babel   = require('babel-core');
var plugin  = require('../src');


var out = babel.transformFileSync('/Users/grammka/GitHubProjects/babel-plugin-rintlmg/test/example.js', {
  plugins: [ plugin ]
});

console.log(out.code);
