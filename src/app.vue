<template>
  <div class="monorepo-vue-component">{{ msg }}</div>
</template>

<script>
export default {
  setup() {
    return {
      msg: "hello world!",
    };
  },
};
</script>

<style>
.monorepo-vue-component {
  color: red;
}
</style>
