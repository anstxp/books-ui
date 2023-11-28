<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <CategoryListComponent />
  <FooterComponent />
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
import CategoryListComponent from "@/components/category-list/category-list-component.vue";

export default defineComponent({
  components: {
    CategoryListComponent,
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
  },

  data() {
    return {};
  },
});
</script>
