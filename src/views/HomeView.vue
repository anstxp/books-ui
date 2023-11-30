<template>
  <BottomNavbarComponent />
  <HeaderComponent />
  <NavbarComponent />
  <BestBooksComponent />
  <CollegeComponent />
  <FeaturesComponent />
  <NewsletterComponent />
  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import BestBooksComponent from "@/components/book-components/best-books/best-books-component.vue";
import FeaturesComponent from "@/components/UI/features/features-component.vue";
import NewsletterComponent from "@/components/UI/newsletter/newsletter-component.vue";
import CollegeComponent from "@/components/UI/college/college-component.vue";

export default {
  name: "HomeView",
  components: {
    CollegeComponent,
    NewsletterComponent,
    FeaturesComponent,
    BestBooksComponent,
    BottomNavbarComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
  },
  data() {
    return {
      comments: [],
    };
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const response = await fetch("http://localhost:5154/api/Comments");
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        this.comments = data;
        console.log(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
  },
};
</script>

<style lang="css"></style>
