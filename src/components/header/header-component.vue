<script setup></script>

<template>
  <div class="header">
    <a href="/" class="logo"> <i class="fas fa-book"></i> Books </a>

    <form action="" class="search-form">
      <input
        type="search"
        name=""
        placeholder="search here.."
        id="search-box"
      />
      <label for="search-box" class="fas fa-search"></label>
    </form>

    <div class="icons">
      <div id="search-btn" class="fas fa-search"></div>
      <a href="/contacts" class="fa-solid fa-address-book"></a>
      <a href="#" class="fas fa-shopping-cart"></a>
      <a href="/login" class="fas fa-user"></a>
      <a href="/faq" class="fa-solid fa-circle-question"></a>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "header-style.scss";
</style>
