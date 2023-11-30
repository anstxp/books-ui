<script>
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import EditAuthor from "@/components/author-components/edit-author-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
export default {
  name: "EditAuthorView",
  components: {
    FooterComponent,
    EditAuthor,
    BottomNavbarComponent,
    HeaderComponent,
    NavbarComponent,
  },
};
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <EditAuthor />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
