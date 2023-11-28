<template>
  <div class="author-info">
    <div class="author-block">
      <img
        :src="author.authorImageUrl"
        :alt="author.fullName"
        class="author-image"
      />
      <h2>{{ author.fullName }}</h2>
      <p>{{ author.description }}</p>
    </div>
  </div>
  <swiper
    :slides-per-view="5"
    :space-between="5"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="book in author.books" :key="book.id">
      <BookItemComponent :book="book"></BookItemComponent>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import BookItemComponent from "@/components/book-item-small/book-item-component.vue";

export default {
  components: { Swiper, SwiperSlide, BookItemComponent },
  props: {
    author: {
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
.author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.author-block {
  text-align: center;
  margin-bottom: 20px;
}

.author-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

h2 {
  font-size: 1.7em;
  margin-bottom: 5px;
}

p {
  color: var(--light-color);
  font-size: 1.4rem;
}
</style>
