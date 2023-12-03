<script>
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import BookItemComponent from "@/components/book-components/bookSmall-item-component.vue";
import HeaderComponent from "@/components/nav-components/header/header-component.vue";
import NavbarComponent from "@/components/nav-components/navbar/navbar-component.vue";
import BottomNavbarComponent from "@/components/nav-components/bottom-navbar/bottom-navbar-component.vue";
import FooterComponent from "@/components/nav-components/footer/footer-component.vue";
import axios from "axios";
import { mapState } from "vuex";
import SmallHeaderView from "@/components/UI/header-view/small-header-view.vue";
import CollegeComponent from "@/components/UI/college/college-component.vue";

export default defineComponent({
  components: {
    CollegeComponent,
    SmallHeaderView,
    FooterComponent,
    BottomNavbarComponent,
    NavbarComponent,
    HeaderComponent,
    BookItemComponent,
    SwiperSlide,
    Swiper,
  },
  data() {
    return {
      contentProp: [
        {
          title: "Unfortunately nothing was found, try again!",
          image: "/slide7.webp",
        },
      ],
    };
  },
  mounted() {
    this.searchBooks();
  },
  methods: {
    async searchBooks() {
      const query = this.$store.state.search;
      console.log(query);
      try {
        const response = await axios.get(
          `http://localhost:5154/search/${query}`
        );
        this.$store.commit("updateBooks", response.data);
      } catch (error) {
        console.error("Помилка запиту:", error);
      }
    },
  },
  computed: {
    ...mapState({
      booksSearch: (state) => state.booksSearch,
    }),
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
});
</script>

<template>
  <HeaderComponent />
  <NavbarComponent />
  <BottomNavbarComponent />
  <section>
    <swiper
      :slides-per-view="'auto'"
      :space-between="1"
      navigation
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="book in booksSearch" :key="book.id">
        <BookItemComponent :book="book" class="book-item"></BookItemComponent>
      </swiper-slide>
    </swiper>
  </section>
  <div>
    <SmallHeaderView :content="contentProp" v-if="booksSearch.length < 1" />
    <CollegeComponent />
    <FooterComponent />
  </div>
</template>

<style scoped lang="scss"></style>
