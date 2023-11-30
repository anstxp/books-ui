<script>
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import BookItemComponent from "@/components/book-components/bookLarge-item-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";

export default {
  name: "BooksView",
  components: {
    FooterComponent,
    BookItemComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
  },
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.books = this.$store.dispatch("fetchBooks");
  },
};
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <BookItemComponent :book="books" />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
