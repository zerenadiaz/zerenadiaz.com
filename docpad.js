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
    feedr: {
      feeds: {
        flickr: {
          url: "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157643341085813&extras=description&api_key=16b3f66907471f8533cb6091e1b8817b&format=json&nojsoncallback=1",
          clean: true
        },
      },
    },
  },
  environments: {
    development: {
      port: 5000,
    },
  },
};
