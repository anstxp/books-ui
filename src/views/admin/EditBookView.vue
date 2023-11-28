<script>
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import EditBook from "@/components/edit-book.vue";
import Footer from "@/components/footer/footer-component.vue";

export default {
  name: "EditBookView",
  components: {
    EditBook,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
    Footer,
  },
};
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <EditBook />
  <Footer />
</template>

<style scoped lang="scss"></style>
