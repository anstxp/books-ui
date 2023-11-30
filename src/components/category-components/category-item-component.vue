<template>
  <section class="category-card">
    <h2>{{ category.name }}</h2>
    <p>{{ category.description }}</p>
  </section>
  <swiper
    :slides-per-view="1"
    :space-between="1"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="book in category.books" :key="book.id">
      <BookItemComponent :book="book"></BookItemComponent>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import BookItemComponent from "@/components/book-components/bookSmall-item-component.vue";
export default {
  components: {
    BookItemComponent,
    Swiper,
    SwiperSlide,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
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
};
</script>

<style scoped>
.category-card {
  padding: 20px;
  border-radius: 10px;
  color: var(--black);
}

.category-card h2 {
  font-size: 1.7rem;
}

.category-card p {
  text-transform: none;
  font-size: 1.4rem;
  color: var(--light-color);
}

.books-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.scroll-bar {
  width: 100%;
  -webkit-appearance: none;
  height: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.scroll-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #4caf50;
  cursor: pointer;
}

.scroll-bar::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #4caf50;
  cursor: pointer;
}
</style>
