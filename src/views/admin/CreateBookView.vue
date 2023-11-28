<script>
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import CreateBook from "@/components/create-book.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
import HeaderComponent from "@/components/header/header-component.vue";

export default {
  name: "CreateBookView",
  components: {
    FooterComponent,
    CreateBook,
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
  <CreateBook />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
