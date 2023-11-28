<script setup>
import BookDetailsComponent from "@/components/book-details/book-details-component.vue";
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
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
