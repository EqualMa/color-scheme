<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      this.$colorScheme.*
    </div>
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(v, k) in $colorScheme.current" :key="k">
          <td>{{ k }}</td>
          <td>{{ v }}</td>
        </tr>
      </tbody>
    </table>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
  },
};
</script>
