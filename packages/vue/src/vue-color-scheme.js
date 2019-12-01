import { devMode, registerVuexStore } from './utils';

import { listenCurrent, PREFERS_COLOR_SCHEME_NAMES } from '@color-scheme/js';

// Import your additional components here
import VueColorSchemePluginComponent from './color-scheme-watcher.vue';

const normalizeColorScheme = v => (v === 'no-preference' ? 'noPreference' : v);

const NORM_PREFERS_COLOR_SCHEME_NAMES = PREFERS_COLOR_SCHEME_NAMES.map(normalizeColorScheme);

const getCurrent = Vue => {
  const cur = Vue.observable({
    value: undefined,
    light: undefined,
    dark: undefined,
    noPreference: undefined
  });

  listenCurrent(v => {
    v = normalizeColorScheme(v);
    cur.value = v;
    for (const cs of NORM_PREFERS_COLOR_SCHEME_NAMES) {
      cur[cs] = v === cs;
    }
  }, true);

  return cur;
};

let current;

export default class VueColorSchemePlugin {
  // HERE IS YOUR PLACE TO DEVELOP YOUR COMPONENT

  constructor(options = {}) {
    const defaults = {
      // This is your plugin's options. It will be accessible with this.options
      accessorName: '$colorScheme'
    };
    this.options = { ...defaults, ...options };
  }

  get current() {
    return current;
  }

  // Some instance methods that you can access from this.$colorScheme
  world() {
    return 'world';
  }

  static register = (Vue, options, store) => {
    console.log('Here is the options of the component', options);
    console.log('Here is the store of the app', store);
    // You can use `this.options` property to access options.

    if (current === undefined) {
      current = getCurrent(Vue);
    }

    // Delete this line if your plug-in doesn't provide any components
    Vue.component('ColorSchemeWatcher', VueColorSchemePluginComponent);

    // Vue.directive('your-custom-directive', customDirective);

    // registerVuexStore(store, 'counterStore', {
    //   namespaced: true,
    //   state: { counter: 0 },
    //   getters: {
    //     counter: state => state.counter
    //   },
    //   actions: {
    //     increment: ({ commit }) => commit('increment')
    //   },
    //   mutations: {
    //     increment: state => state.counter++
    //   }
    // });
  };

  // Some lifecycle hooks to add on mixin
  static mixin = () => ({
    mounted() {
      console.log('Hey! I am running on every mount, please remove me!');
      console.log(this.$store);
    }
  });

  ////////////////////////////////////
  // YOU MAY NOT NEED TO EDIT BELOW //
  ////////////////////////////////////

  initialized = false;

  init(Vue, store) {
    if (devMode() && !install.installed) {
      console.warn(
        `[vue-color-scheme] not installed. Make sure to call \`Vue.use(VueColorSchemePlugin)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    VueColorSchemePlugin.register(Vue, this.options, store);
    this.initialized = true;
  }
}

export function install(Vue) {
  const isDev = devMode();
  if (install.installed && Vue) {
    if (isDev) {
      console.warn(
        '[vue-color-scheme] already installed. Vue.use(VueColorSchemePlugin) should be called only once.'
      );
    }
    return;
  }

  Vue.mixin({
    /**
     * VueColorSchemePlugin init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      const { colorSchemeSettings, store, parent } = this.$options;

      let instance = null;
      if (colorSchemeSettings) {
        instance =
          typeof colorSchemeSettings === 'function'
            ? new colorSchemeSettings()
            : new VueColorSchemePlugin(colorSchemeSettings);
        // Inject store
        instance.init(Vue, store);
      } else if (parent && parent.__$VueColorSchemePluginInstance) {
        instance = parent.__$VueColorSchemePluginInstance;
        instance.init(Vue, parent.$store);
      }

      if (instance) {
        // Store helper for internal use
        this.__$VueColorSchemePluginInstance = instance;
        this[instance.options.accessorName] = instance;
      }
    },

    ...VueColorSchemePlugin.mixin()
  });

  install.installed = true;
  if (isDev) {
    console.info('[vue-color-scheme] is plugged in.');
  }
}

VueColorSchemePlugin.install = install;
