<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <FaqComponent :faqList="faqListProp" />
  <FooterComponent />
</template>

<script>
import FaqComponent from "@/components/faq/faq-component.vue";
import HeaderComponent from "@/components/header/header-component.vue";
import NavbarComponent from "@/components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/footer/footer-component.vue";

export default {
  components: {
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
          question: "Q. How can I find a book that is no longer in print?",
          answer:
            "A. If you are looking for a title which is now out-of-print, " +
            "try an out-of-print finding service such as Abe Books, Book Finder or Zardoz.",
        },
        {
          question: "Q. How can I contact an author?",
          answer:
            "A. We cannot give out personal mail or email addresses for our authors. " +
            "However, all author mail is forwarded directly to our authors via our publicity departments.",
        },
        {
          question:
            "Q. There is an error in my book or ebook; who can I contact?",
          answer:
            "A. For physical books it is best if you return the book to the original bookshop " +
            "from which it was purchased; they should be happy to exchange it for a perfect copy. " +
            "If you have any difficulty with this then please return the cover and title page " +
            "of the book to us. NB: If the value of the book is over £20, you will need to return " +
            "the whole book.",
        },
      ],
    };
  },
};
</script>
