<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <FaqComponent :faqList="faqListProp" />
  <NewsletterComponent />
  <FooterComponent />
</template>

<script>
import FaqComponent from "@/components/faq/faq-component.vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import NewsletterComponent from "@/components/UI/newsletter/newsletter-component.vue";

export default {
  components: {
    NewsletterComponent,
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
    FaqComponent,
  },
  data() {
    return {
      faqListProp: [
        {
          question: "Are there any products I cannot cancel or return?",
          answer:
            "You cannot cancel or return the following items:\n" +
            "\n" +
            "audio, video or computer software products that have been removed from the sealed packaging in which they were delivered\n" +
            "any bespoke or personalised items which have been created specifically for you\n" +
            "Penguin Prints\n" +
            "Isokon Penguin Donkeys\n" +
            "Wooden Bookends",
        },
        {
          question: "Do I need to bring anything with me to the workshop??",
          answer:
            "Writing materials will be provided. If you have a favourite notepad, " +
            "or prefer to write on a laptop, please do bring this with you. " +
            "Alan also asks that you bring with you a favourite toy from your " +
            "childhood, or a toy that belongs to your child or a relative, " +
            "along with one of your favourite picture books.",
        },
        {
          question: "How do I cancel my order?",
          answer:
            "You may cancel your order at any time from placing your order until 14 days " +
            "after the date of delivery. Please see the 'Cancelling Your Order' " +
            "section of our  Terms and Conditions for full details.",
        },
        {
          question: "What is your returns policy?",
          answer:
            "You must return any unwanted products in original packaging within 14 days " +
            "of delivery. Returns after this time will not be accepted. " +
            "Please see our Delivery and Returns page for details. Returns will be " +
            "at your own cost. ",
        },
      ],
    };
  },
};
</script>
