<template>
  <section>
    <CategoryItemComponent
      v-for="category in categories"
      :key="category.id"
      :category="category"
    ></CategoryItemComponent>
  </section>
</template>

<script>
import CategoryItemComponent from "@/components/category-item/category-item-component.vue";
export default {
  components: {
    CategoryItemComponent,
  },
  computed: {
    categories() {
      console.log(this.$store.state.categoriesModule.categories);
      return this.$store.state.categoriesModule.categories;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch("fetchCategories");
    },
  },
};
</script>
