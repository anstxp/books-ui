<template>
  <transition name="fade" mode="out-in">
    <div>
      <HeaderComponent />
      <NavbarComponent />
      <BottomNavbarComponent />
      <HeaderView :content="contentProp" />
      <CollectionListComponent />
      <FooterComponent />
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import CollectionListComponent from "@/components/collections/collection-list.vue";
import HeaderView from "@/components/UI/header-view/header-view.vue";

export default defineComponent({
  components: {
    HeaderView,
    CollectionListComponent,
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
  },
  data() {
    return {
      contentProp: [
        {
          title: "Short, fresh, expert accounts of England's rulers: ",
          body: "discover all the books in our Penguin Monarchs series",
          image:
            "https://scontent-iev1-1.xx.fbcdn.net/v/t1.6435-9/32821355_10160321998305371_8992893281318731776_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=OuNXSuA3KhgAX-CmUsP&_nc_ht=scontent-iev1-1.xx&oh=00_AfABy2qPYol27O340lsxJRpJaZxVWICzMnrnAf4nsJWAPw&oe=6590DFA3",
        },
        {
          title: "Around the World in 80 Books",
          body: "Restlessly curious, insightful, and quirky, David Damrosch is the perfect guide to a round-the-world adventure in reading",
          image:
            "https://scontent-iev1-1.xx.fbcdn.net/v/t39.30808-6/269601155_10165873146150371_4836974662474053508_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zsxWZ1xF5YYAX9duh6l&_nc_ht=scontent-iev1-1.xx&oh=00_AfA85DF-vAnmQ2m2RV4cc6jVZ3vCsK4z-FQOKY17X5_0gg&oe=656EB541",
        },
        {
          title: "Jane Austen: The Complete Works Boxed Set",
          body: "The seven books in this box set contain some of the most brilliant, dazzling prose.",
          image:
            "https://shop.penguin.co.uk/cdn/shop/products/Penguin_Shop_15.10.180402_2048x2048_cropped.jpg?v=1691680728",
        },
      ],
    };
  },
});
</script>
