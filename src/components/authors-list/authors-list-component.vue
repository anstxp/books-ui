<template>
  <section>
    <AuthorItemComponent
      v-for="author in authors"
      :key="author.id"
      :author="author"
    ></AuthorItemComponent>
  </section>
</template>

<script>
import AuthorItemComponent from "@/components/author-item/author-item-component.vue";
export default {
  components: {
    AuthorItemComponent,
  },
  computed: {
    authors() {
      console.log(this.$store.state.authorsModule.authors);
      return this.$store.state.authorsModule.authors;
    },
  },
  created() {
    this.fetchAuthors();
  },
  methods: {
    fetchAuthors() {
      this.$store.dispatch("fetchAuthors");
    },
  },
};
</script>
