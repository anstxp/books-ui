<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <CategoryListComponent />
  <FooterComponent />
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import CategoryListComponent from "@/components/category-components/category-list-component.vue";

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
