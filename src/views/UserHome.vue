<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <UserHome />
  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import UserHome from "@/components/auth-components/user-home-component.vue";

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
