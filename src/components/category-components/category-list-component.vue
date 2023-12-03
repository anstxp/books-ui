<template>
  <SmallHeaderView :content="contentProp" :show="true" />
  <section>
    <CategoryItemComponent
      v-for="category in categories"
      :key="category.id"
      :category="category"
    ></CategoryItemComponent>
  </section>
</template>

<script>
import CategoryItemComponent from "@/components/category-components/category-item-component.vue";
import SmallHeaderView from "@/components/UI/header-view/small-header-view.vue";
export default {
  data() {
    return {
      contentProp: [
        {
          title: "Explore a World of Boundless Adventures at Our Bookstore",
          body: "Dive into a Variety of Genres Awaiting You!",
          image:
            "https://scontent-iev1-1.xx.fbcdn.net/v/t31.18172-8/16835984_10158244254115371_4175319837325240402_o.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c2f564&_nc_ohc=lxzGB-5YeIIAX_sZGg1&_nc_ht=scontent-iev1-1.xx&oh=00_AfCfpIzxe0XQNyxv30U_eEnRJI0jEexrNb6qWsbf2rSAFQ&oe=659065FC",
        },
        {
          title: "Explore a World of Boundless Adventures at Our Bookstore",
          body: "Dive into a Variety of Genres Awaiting You!",
          image:
            "https://scontent-iev1-1.xx.fbcdn.net/v/t31.18172-8/22550146_10159420885305371_5490633802890895761_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=GiBr7HHFoFAAX-JPA_c&_nc_ht=scontent-iev1-1.xx&oh=00_AfB_efkZPwDIMZl_beF6Vy6Gqp_7ID7AdUHVV-3FUV3mcQ&oe=65908D6F",
        },
      ],
    };
  },
  components: {
    SmallHeaderView,
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
