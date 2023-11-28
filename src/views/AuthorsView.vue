<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <SmallHeaderView :content="contentProp" />
  <AuthorsListComponent />
  <FooterComponent />
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
import AuthorsListComponent from "@/components/authors-list/authors-list-component.vue";
import SmallHeaderView from "@/components/UI/small-header-view.vue";

export default defineComponent({
  components: {
    SmallHeaderView,
    AuthorsListComponent,
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
});
</script>
