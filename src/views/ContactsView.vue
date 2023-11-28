<script setup>
import FeedbackFormComponent from "@/components/feedback-form/feedback-form-component.vue";
import ContactsComponent from "@/components/UI/contacts/contacts-component.vue";
import HeaderComponent from "@/components/header/header-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";
import FeaturesComponent from "@/components/UI/features/features-component.vue";
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <section class="contacts">
    <FeedbackFormComponent />
    <ContactsComponent />
  </section>
  <FeaturesComponent />
  <FooterComponent />
</template>

<style scoped lang="scss">
.contacts {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 0 60px;
  gap: 8rem;
  padding: 1rem 9%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 1px;
    padding: 0.5rem;
    justify-content: space-between;
  }
}
</style>
