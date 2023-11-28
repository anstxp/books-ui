<script setup>
import BlogPostList from "@/components/blog-post-list/blog-post-list.vue";
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <BlogPostList />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
