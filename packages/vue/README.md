# VueColorSchemePlugin

Your plugin description...

## Installation

### 1. Install
```
yarn add vue-color-scheme
# or
npm i vue-color-scheme --save
```

### 2. Plug-in
```js
import VueColorSchemePlugin from 'vue-color-scheme'

Vue.use(VueColorSchemePlugin)

new Vue({
  // your vue config
  colorSchemeSettings: new VueColorSchemePlugin(),
})
```

### 3. Use in your components

```vue
<template>
  <vue-color-scheme />
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