# VueColorSchemePlugin

## Installation

### 1. Install

```
yarn add @color-scheme/vue
# or
npm i @color-scheme/vue --save
```

### 2. Plug-in

```js
import VueColorSchemePlugin from "vue-color-scheme";

Vue.use(VueColorSchemePlugin);

new Vue({
  // your vue config
  colorScheme: {
    // ...
  },
});
```

### 3. Use in your components

```vue
<template>
  <!-- your template -->
</template>

<script>
export default {
  async created() {
    console.log(this.$colorScheme);
  },
};
</script>
```

## License

MIT
