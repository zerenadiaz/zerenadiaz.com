// http://docpad.org/docs/config

require('longjohn');

var config = require('./config');

module.exports = {
  templateData: {
    site: {
      styles: ["styles/index.css"],
      scripts: ["scripts/bundle.js"],
      title: config.title,
      description: config.description,
      sizes: config.sizes,
    },
    getImages: function () {

      var images = JSON.parse(this.feedr.feeds.flickr).photoset.photo;

      return images;
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
    browserifybundles: {
      bundles: [{
        arguments: ['-g', 'uglifyify'],
        entry: 'scripts/index.js',
        out: 'scripts/bundle.js',
      }],
      environments: {
        development: {
          bundles: [{
            arguments: ['-d'],
            entry: 'scripts/index.js',
            out: 'scripts/bundle.js',
          }],
        },
      },
    },
    raw: {
      semantic: {
        command: ['rsync', '-r', 'node_modules/semantic/src/fonts/', 'out/fonts'],
      },
    },
    ghpages: {
      deployRemote: 'origin',
      deployBranch: 'gh-pages',
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
          url: "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id="+config.photosetId+"&extras=description,url_z,url_o&api_key="+config.apiKey+"&format=json&nojsoncallback=1",
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
