<template>
  <section class="featured" id="featured">
    <div class="featured-slider" v-if="display === 'grid'">
      <BookItemComponent
        v-for="book in books"
        :key="book.id"
        :book="book"
      ></BookItemComponent>
    </div>
    <div v-else>
      <div>
        <BookLarge
          v-for="book in books"
          :key="book.id"
          :book="book"
        ></BookLarge>
      </div>
    </div>
  </section>
</template>

<script>
import BookItemComponent from "@/components/book-components/bookSmall-item-component.vue";
import BookLarge from "@/components/book-components/bookLarge-item-component.vue";

export default {
  components: {
    BookItemComponent,
    BookLarge,
  },
  computed: {
    display() {
      return this.$store.state.booksModule.displayMode;
    },
    isAdmin() {
      return this.$store.state.user.roles.includes("admin");
    },
    books() {
      return this.$store.state.booksModule.books;
    },
  },
  created() {
    if (this.isAdmin) {
      this.$store.commit("set_display", "list");
    }
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      this.$store.dispatch("fetchBooks");
    },
  },
};
</script>

<style scoped lang="scss"></style>
