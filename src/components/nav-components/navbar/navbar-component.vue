<script>
export default {
  computed: {
    isAdmin() {
      return this.$store.state.user.roles.includes("admin");
    },
  },
};
</script>

<template>
  <div class="navbar" v-if="!isAdmin">
    <a href="/">home</a>
    <a href="/authors">authors</a>
    <a href="/books">books</a>
    <a href="/categories">genres</a>
    <a href="/collections">collections</a>
    <a href="/blog">blog</a>
  </div>
  <div class="navbar" v-else>
    <a href="/">home</a>
    <a href="/authors-table">authors</a>
    <a href="/books">books</a>
    <a href="/categories">genres</a>
    <a href="/collections">collections</a>
    <a href="/blog">blog</a>
  </div>
</template>

<style scoped lang="scss">
@import "navbar";
</style>
