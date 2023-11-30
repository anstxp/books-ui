<script>
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import EditUserComponent from "@/components/auth-components/edit-user-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";

export default {
  name: "UpdateUserProfile",
  components: {
    FooterComponent,
    EditUserComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
  },
};
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <EditUserComponent />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
