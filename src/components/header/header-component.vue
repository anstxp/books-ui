<template>
  <div class="header">
    <a href="/" class="logo"> <i class="fas fa-book"></i> Books </a>

    <form action="" class="search-form">
      <input
        type="search"
        name=""
        placeholder="Search here.."
        id="search-box"
        v-model="searchInput"
      />
      <label
        for="search-box"
        class="fas fa-search"
        @click="this.$router.push(`/search/${this.searchInput}`)"
      ></label>
    </form>

    <div class="icons">
      <div id="search-btn" class="fas fa-search"></div>
      <a href="/contacts" class="fa-solid fa-address-book"></a>
      <a href="#" class="fas fa-shopping-cart"></a>
      <a href="/user-home" class="fas fa-user"></a>
      <a href="/faq" class="fa-solid fa-circle-question"></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
  watch: {
    searchInput(commit, newVal) {
      this.$store.commit("searchInput", newVal);
    },
    mounted() {
      this.searchInput = this.$store.state.search || "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "header-style.scss";
</style>
