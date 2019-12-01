import Vue from 'vue';
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';

import VueColorSchemePlugin from '../src/vue-color-scheme';

Vue.use(Vuex);
Vue.use(VueColorSchemePlugin);

const withSettings = component => ({
  colorSchemeSettings: new VueColorSchemePlugin(),
  ...component
});

const stories = storiesOf('VueColorSchemePlugin', module);

stories
  // Add some stories here to make your plugin more descriptive
  .add(
    'My Customs  Component',
    () =>
      withSettings({
        template: `
        <div>
          <vue-color-scheme />
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-color-scheme\`

        \`\`\`html
        <template>
          <vue-color-scheme />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'My Custom Component with another markup',
    () =>
      withSettings({
        template: `
        <div>
          <b>Hello</b>
          <vue-color-scheme />
          <i>world</i>
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-color-scheme\` with other components

        \`\`\`html
        <template>
          <div>
            <b>Hello</b>
            <vue-color-scheme />
            <i>world</i>
          </div>
        </template>
        \`\`\`
      `
    }
  );
