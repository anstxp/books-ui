<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <UserHome />
  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
import UserHome from "@/components/user-home/user-home-component.vue";

export default {
  components: {
    UserHome,
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
  },
};
</script>

<style scoped lang="scss"></style>
