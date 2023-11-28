<template>
  <router-link :to="'/book/' + book.urlHadle" class="box">
    <div class="image">
      <img :src="book.imageUrl" alt="Book cover" />
    </div>
    <div class="content">
      <h3>{{ book.title }}</h3>
      <div>
        <span v-for="(author, index) in book.authors" :key="index">
          {{ author.fullName }}
          <span v-if="index !== book.authors.length - 1">, </span>
        </span>
      </div>
      <div v-if="!isAdmin" class="price">{{ book.price }}₴</div>
    </div>
    <div v-if="isAdmin" class="admin-buttons">
      <button
        class="light-button"
        @click="deleteBook(this.book.id, this.token)"
      >
        delete
      </button>
      <button class="light-button" @click="editBook(this.book.id)">edit</button>
    </div>
  </router-link>
</template>

<script>
import router from "@/router";
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    data() {
      return {
        currentBook: {
          id: this.book.id,
        },
        token: this.$store.state.user.jwtToken,
      };
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
    deleteBook(id, token) {
      console.log(id);
      console.log(token);
      this.$store.dispatch("deleteBook", { id, token });
      router.push("/books");
    },
    editBook(id) {
      this.$store.commit("set_currentBook", id);
      router.push("/edit-book");
    },
  },
};
</script>

<style scoped lang="scss">
@import "book-item-style";

.light-button {
  background-color: #fffefe;
  margin: 0 7px;
  padding: 7px 20px; /* Збільшив розмір кнопки для кращого співвідношення */
  border-radius: 5px; /* Більш закруглені кути */
  font-size: 1.3rem; /* Збільшив розмір шрифту для більшого видимості тексту */
  border: 1px solid #ccc;
  color: #333;
}
</style>
