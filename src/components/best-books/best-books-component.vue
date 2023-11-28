<template>
  <section class="home" id="home">
    <div class="row">
      <div class="content">
        <h3>best books of the month</h3>
        <p>
          Each month , we handpick a selection of captivating reads that promise
          to whisk you away on literary adventures. From gripping thrillers to
          heartwarming tales, our curated collection showcases the finest works
          from both established authors and emerging voices. Dive into our
          selection to find your next favorite book and indulge in the magic of
          storytelling.
        </p>
        <a href="#" class="btn">shop now</a>
      </div>
      <div class="books-slider">
        <div v-for="(book, index) in books.slice(0, 6)" :key="index">
          <router-link :to="'/book/' + book.urlHadle"
            ><img :src="book.imageUrl" :alt="book.title"
          /></router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      books: [],
    };
  },

  async mounted() {
    try {
      const response = await axios.get(
        "http://localhost:5154/api/Books?isAscending=true&pageNumber=1&pageSize=1000"
      );
      this.books = response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
};
</script>

<style scoped lang="sass">
@import 'best-book-style.scss'
</style>
