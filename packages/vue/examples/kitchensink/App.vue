<template>
  <div>
    Current color scheme is
    {{ $colorScheme.current.value }} !
    <color-scheme-watcher />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "world",
    };
  },
};
</script>

<style></style>
