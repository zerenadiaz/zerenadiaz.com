var modernizr = require("modernizr");
var fs = require('fs');

modernizr.build({
  'feature-detects': [
    'test/css/flexbox',
    'test/css/flexboxtweener',
    'test/css/flexboxlegacy',
  ],
}, function (result) {
  var path = __dirname + '/src/documents/scripts/vendor/modernizr.js';
  fs.writeFileSync(path, result.code);
});