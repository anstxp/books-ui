<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <SmallHeaderView :content="contentProp" />
  <section>
    <AuthorItemComponent
      v-for="author in authors"
      :key="author.id"
      :author="author"
    ></AuthorItemComponent>
  </section>
  <FooterComponent />
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import SmallHeaderView from "@/components/UI/header-view/small-header-view.vue";
import AuthorItemComponent from "@/components/author-components/author-books-component.vue";
export default defineComponent({
  components: {
    AuthorItemComponent,
    SmallHeaderView,
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
  },
  data() {
    return {
      contentProp: [
        {
          title: "Inkwell Chronicles: Literary Voices from our Bookstore",
          image:
            "https://shop.penguin.co.uk/cdn/shop/files/starless-sea-erin-morgenstern-signature_2cb25da0-8cff-486b-ba6b-6eb80d48e7c2_2048x2048_cropped.jpg?v=1692957336",
        },
      ],
    };
  },
  computed: {
    authors() {
      console.log(this.$store.state.authorsModule.authors);
      return this.$store.state.authorsModule.authors;
    },
  },
  created() {
    this.fetchAuthors();
  },
  methods: {
    fetchAuthors() {
      this.$store.dispatch("fetchAuthors");
    },
  },
});
</script>
