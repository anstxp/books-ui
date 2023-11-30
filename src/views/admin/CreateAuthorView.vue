<script>
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import CreateAuthor from "@/components/author-components/create-author.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";

export default {
  name: "CreateAuthorView",
  components: {
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
    CreateAuthor,
  },
};
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <CreateAuthor />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
