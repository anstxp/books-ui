<template>
  <section class="featured" id="featured">
    <div class="featured-slider">
      <BookItemComponent
        v-for="book in books"
        :key="book.id"
        :book="book"
      ></BookItemComponent>
    </div>
  </section>
</template>

<script>
import BookItemComponent from "@/components/book-item/book-item-component.vue";

export default {
  components: {
    BookItemComponent,
  },
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Books?isAscending=true&pageNumber=1&pageSize=1000"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        // Розпаковуємо отримані дані у форматі JSON
        const data = await response.json();
        // Оновлюємо масив книг
        this.books = data;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.featured .featured-slider {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2rem;
}
@media (max-width: 768px) {
  .featured .featured-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
