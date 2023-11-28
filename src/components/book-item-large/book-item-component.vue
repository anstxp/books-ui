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

<template>
  <section class="book-item">
    <router-link :to="'/book/' + book.urlHadle" style="margin-top: -10px">
      <img :src="book.imageUrl" :alt="book.title" class="book-cover" />
    </router-link>
    <div class="book-info">
      <h2>{{ book.title }}</h2>
      <p v-if="book.authors.length > 0">
        <span v-for="(author, index) in book.authors" :key="index">
          {{ author.fullName
          }}{{ index !== book.authors.length - 1 ? ", " : "" }}
        </span>
      </p>
      <p class="book-description">{{ book.description }}</p>
      <p v-if="book.categories.length > 0">
        <strong>Categories: </strong>
        <span v-for="(category, index) in book.categories" :key="index">
          {{ category.name
          }}{{ index !== book.categories.length - 1 ? ", " : "" }}
        </span>
      </p>
      <p><strong>Price:</strong> ${{ book.price }}</p>
      <div v-if="isAdmin" class="admin-buttons">
        <button
          class="light-button"
          @click="deleteBook(this.book.id, this.token)"
        >
          Delete
        </button>
        <button class="light-button" @click="editBook(this.book.id)">
          Edit
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.book-item {
  display: flex;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.book-cover {
  height: 250px;
  margin-right: 30px;
}

.book-info {
  flex: 1;
  font-size: 1.4rem;
}

.book-info h2 {
  color: var(--black);
  font-size: 1.8rem;
}

.book-info p {
  color: var(--black);
  font-size: 1.3rem;
  margin-bottom: 5px;
}

.book-description {
  margin-top: 10px;
}

.admin-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.light-button {
  background-color: #fffefe;
  padding: 10px 15px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
}
</style>
