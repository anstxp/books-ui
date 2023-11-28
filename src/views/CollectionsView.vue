<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <CollectionListComponent />
  <FooterComponent />
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
import CollectionListComponent from "@/components/collections/collection-list.vue";

export default defineComponent({
  components: {
    CollectionListComponent,
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
