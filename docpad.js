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
    getImages: function () {

      var _ = require('lodash');
      var binarySearch = require('binarysearch');

      var images = JSON.parse(this.feedr.feeds.flickr).photoset.photo;

      var heights = [];

      var totalHeight = _.reduce(images, function (heightSoFar, image) {
        heights.push(heightSoFar);

        return heightSoFar + parseInt(image.height_z);
      }, 0);

      var mid = binarySearch.closest(heights, totalHeight / 2);
      images[mid].isNewColumn = true;

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
          url: "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157643341085813&extras=description,url_z&api_key=16b3f66907471f8533cb6091e1b8817b&format=json&nojsoncallback=1",
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
