<template>
  <div>
    Current color scheme
    {{ $colorScheme.current.value }}!
    <color-scheme-watcher />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'world'
    };
  }
};
</script>

<style>
</style>
