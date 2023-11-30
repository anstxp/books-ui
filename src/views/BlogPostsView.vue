<script setup>
import BlogPostList from "@/components/blogPost-components/blog-post-list.vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <BlogPostList />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
