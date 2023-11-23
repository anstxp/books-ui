<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <BookListComponent />
  <FooterComponent />
</template>

<script>
import { defineComponent } from "vue";
import BookListComponent from "@/components/book-list/book-list-component.vue";
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";

export default defineComponent({
  components: {
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
    BookListComponent,
  },
});
</script>
