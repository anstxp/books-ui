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
        <div v-for="book in books" :key="book.id">
          <a href="#"><img :src="book.imageUrl" :alt="book.title" /></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const books = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      "http://localhost:5154/api/Books?isAscending=true&pageNumber=1&pageSize=1000"
    );
    books.value = response.data; // Assuming your API returns an array of books
  } catch (error) {
    console.error("Error fetching books:", error);
  }
});
</script>

<style scoped lang="sass">
@import 'best-book-style.scss'
</style>
