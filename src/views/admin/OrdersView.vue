<script>
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import OrdersList from "@/components/orders/orders-list.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
export default {
  name: "OrdersView",
  components: {
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
    OrdersList,
  },
};
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <OrdersList />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
