<script>
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import CartList from "@/components/cart-components/items-list.vue";

export default {
  name: "ShoppingCartView",
  components: {
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
    CartList,
  },
};
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <CartList />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
