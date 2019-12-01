import Vue, { PluginFunction } from 'vue';
// import { Store } from 'vuex';

export class VueColorSchemePlugin {
  constructor(options?: VueColorSchemePluginOptions);

  static install(): PluginFunction<any>;
  // static init(Vue: Vue, store: Store<any>): void;
  static init(Vue: Vue, store: any): void;

  // Your instance methods
  world(): string;
}

export interface VueColorSchemePluginOptions extends Object {
  accessorName?: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $colorScheme: VueColorSchemePlugin;
    __$VueColorSchemePluginInstance: VueColorSchemePlugin;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    colorSchemeSettings?: VueColorSchemePluginOptions | VueColorSchemePlugin
  }
}
