<template>
  <div class="monorepo-vue-component">{{ msg }}</div>
</template>

<script>
export default {
  setup() {
    return {
      msg: "hello world from monorepo-vue-component",
    };
  },
};
</script>

<style>
.monorepo-vue-component {
  width: 100%;
  color: red;
}
</style>
