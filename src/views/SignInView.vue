<script setup>
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import SignInComponent from "@/components/auth-components/sign-in-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <SignInComponent />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
