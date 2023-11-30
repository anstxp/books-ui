<script setup>
import BookDetailsComponent from "@/components/book-components/book-details-component.vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import DiscountComponent from "@/components/UI/discount/discount-component.vue";
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <DiscountComponent />
  <BottomNavbarComponent />
  <BookDetailsComponent />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
