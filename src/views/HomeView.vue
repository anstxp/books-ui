<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <BestBooksComponent />
  <FeaturesComponent />
  <NewsletterComponent />
  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import BestBooksComponent from "@/components/best-books/best-books-component.vue";
import FeaturesComponent from "@/components/features/features-component.vue";
import NewsletterComponent from "@/components/newsletter/newsletter-component.vue";

export default {
  name: "HomeView",
  components: {
    NewsletterComponent,
    FeaturesComponent,
    BestBooksComponent,
    BottomNavbarComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
  },
};
</script>

<style lang="css"></style>
