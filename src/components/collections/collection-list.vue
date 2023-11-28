<template>
  <section>
    <CollectionItem
      v-for="collection in collections"
      :key="collection.id"
      :collection="collection"
    ></CollectionItem>
  </section>
</template>

<script>
import CollectionItem from "@/components/collections/collection-item.vue";
export default {
  components: {
    CollectionItem,
  },
  computed: {
    collections() {
      console.log(this.$store.state.collectionsModule.collections);
      return this.$store.state.collectionsModule.collections;
    },
  },
  created() {
    this.fetchCollections();
  },
  methods: {
    fetchCollections() {
      this.$store.dispatch("fetchCollections");
    },
  },
};
</script>
