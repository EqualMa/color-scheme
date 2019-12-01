/*
Nuxt.js module for vue-color-scheme
Usage:
    - Install vue-color-scheme package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'vue-color-scheme/nuxt'
            // Optionally passing options in module configuration
            ['vue-color-scheme/nuxt', { ...options }]
        ],
        // Optionally passing options in module top level configuration
        VueColorSchemePlugin: { ...options }
    }
*/

const { resolve } = require('path');

module.exports = function nuxtVueWaitModule(moduleOptions) {
  const options = Object.assign({}, this.options.VueColorSchemePlugin, moduleOptions);

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'vue-color-scheme-plugin.template.js.tpl'),
    fileName: 'vue-color-scheme-plugin.js',
    options: options
  });
};

// required by nuxt
module.exports.meta = require('../package.json');
