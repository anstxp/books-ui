<template>
  <div class="box">
    <div class="image">
      <router-link :to="'/book/' + book.urlHadle" class="box">
        <img :src="book.imageUrl" alt="Book cover" />
      </router-link>
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
  </div>
</template>

<script>
import router from "@/router";
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentBook: {
        id: this.book.id,
      },
    };
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
.box {
  width: 20rem;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.box .image {
  padding: 0.2rem;
}

.box .image img {
  height: 20rem;
  max-width: 100%;
}

.box .content {
  padding: 1.2rem;
  position: relative;
}

.box .content h3 {
  font-size: 1.4rem;
  color: var(--black);
}

.box .content span {
  font-size: 1.5rem;
  color: var(--black);
}

.box .content .price {
  font-size: 1.5rem;
  color: var(--black);
  padding-top: 1rem;
}

.box .content .price span {
  font-size: 1.5rem;
  color: var(--light-color);
  text-decoration: line-through;
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

@media (max-width: 1200px) {
  .box {
    width: 70%;
    margin: 0.5rem 0;
  }
  .box .content {
    padding: 1rem;
    position: relative;
  }
  .box .image img {
    height: 18rem;
    max-width: 100%;
  }
  .box .content h3 {
    font-size: 1.4rem;
    color: var(--black);
  }
  .light-button {
    background-color: #fffefe;
    margin: 0 5px;
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 1.1rem;
    border: 1px solid #ccc;
    color: #333;
  }
}

@media (max-width: 768px) {
  .box {
    width: 70%;
    margin: 0.5rem 0;
  }
  .box .content {
    padding: 1rem;
    position: relative;
  }
  .box .image img {
    height: 18rem;
    max-width: 100%;
  }
  .box .content h3 {
    font-size: 1.4rem;
    color: var(--black);
  }
}
</style>
