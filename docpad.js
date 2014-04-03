// http://docpad.org/docs/config

require('longjohn');

module.exports = {
  templateData: {
    site: {
      styles: ["/styles/index.css"],
      scripts: ["/scripts/bundle.js"],
      title: "zerena",
      description: "a really awesome artist!",
    },
  },
  detectEncoding: true,
  plugins: {
    handlebars: {
      helpers: {
        partial: function (content, options) {
          return this.partial(content, options);
        },
        block: function (blockName) {
          return this.getBlock(blockName).toHTML();
        },
      },
    },
    browserifybundler: {
      inFiles: "/scripts/index.js",
      outFile: "/scripts/bundle.js",
    },
    raw: {
      semantic: {
        command: ['rsync', '-r', 'node_modules/semantic/src/fonts/', 'out/fonts'],
      },
    },
    ghpages: {
      deployRemote: 'deploy',
      deployBranch: 'master',
    },
    menu: {
      menuOptions: {
        optimize: false,
        skipFiles: /^(scripts|styles)/,
      },
    },
  },
  environments: {
    development: {
      port: 5000,
    },
  },
};
