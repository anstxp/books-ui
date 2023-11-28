<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <HeaderView :content="contentProp" />
  <OptionsComponent />
  <BookListComponent />
  <FooterComponent />
</template>

<script>
import BookListComponent from "@/components/book-list/book-list-component.vue";
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
import HeaderView from "@/components/UI/header-view/header-view.vue";
import OptionsComponent from "@/components/options/options-component.vue";

export default {
  components: {
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
    BookListComponent,
    HeaderView,
    OptionsComponent,
  },
  data() {
    return {
      contentProp: [
        {
          title: "Christmas Gifting",
          body: "Find the perfect gift for the book lover in your life this Christmas",
          image: "/header.png",
        },
        {
          title: "New Book Arrivals",
          body: "New and notable. The latest books to arrive",
          image: "/new-arrivals.webp",
        },
        {
          title: "Pick and Mix Deals",
          body: "Pick and mix to create your own bundle from our collections.",
          image: "/pick-and-mix.webp",
        },
      ],
    };
  },
};
</script>
