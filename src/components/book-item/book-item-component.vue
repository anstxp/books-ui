<template>
  <div class="box">
    <div class="icons">
      <a href="#" class="fas fa-search"></a>
      <a href="#" class="fas fa-heart"></a>
      <a href="#" class="fas fa-eye"></a>
    </div>
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
      <div class="price">{{ book.price }}</div>
      <a href="#" class="btn">add to cart</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "book-item-style";
</style>
