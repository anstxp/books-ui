<template>
  <section class="author-grid">
    <div class="author-info" v-for="author in authors" :key="author.id">
      <div class="author-block">
        <img
          :src="author.authorImageUrl"
          :alt="author.fullName"
          class="author-image"
        />
        <h2><strong>Full Name: </strong>{{ author.fullName }}</h2>
        <p><strong>Description: </strong>{{ author.description }}</p>
        <p><strong>Url Handle: </strong>{{ author.urlHandle }}</p>
      </div>
      <div class="buttons">
        <button
          class="light-button"
          @click="deleteAuthor(author.id, this.token)"
        >
          Delete
        </button>
        <button class="light-button" @click="editAuthor(author.id)">
          Edit
        </button>
      </div>
      <swiper
        :slides-per-view="3"
        :space-between="2"
        navigation
        :pagination="{ clickable: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="book in author.books" :key="book.id">
          <BookItemComponent :book="book"></BookItemComponent>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<style scoped>
.author-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.author-info {
  width: calc(50% - 20px); /* Ширина блоку: по три блоки в ряду з відступами */
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px; /* Округленість кутиків блоку */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Тінь блоку */
  position: relative;
}

.author-block {
  text-align: left;
  margin-bottom: 15px;
}

.author-block h2 {
  text-align: left;
  font-size: 1.6rem;
  color: var(--black);
}

.author-block p {
  text-align: left;
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: var(--black);
  text-transform: none;
}

.author-image {
  width: 100px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
}

.light-button {
  background-color: #fffefe;
  margin: 0 5px;
  padding: 7px 15px;
  border-radius: 5px;
  font-size: 1.3rem;
  border: 1px solid #ccc;
  color: #333;
}
</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import BookItemComponent from "@/components/book-components/bookSmall-item-component.vue";
import router from "@/router";
export default {
  components: { Swiper, SwiperSlide, BookItemComponent },
  props: {
    authors: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.roles.includes("admin");
    },
    token() {
      return this.$store.state.user.jwtToken;
    },
  },
  methods: {
    deleteAuthor(id, token) {
      console.log(id);
      console.log(token);
      this.$store.dispatch("deleteAuthor", { id, token });
      router.push("/authors-table");
    },
    editAuthor(id) {
      this.$store.commit("set_currentAuthor", id);
      router.push("/edit-author");
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
