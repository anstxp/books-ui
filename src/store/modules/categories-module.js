const categoriesModule = {
  state: {
    categories: [],
  },
  mutations: {
    set_categories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async fetchCategories({ state, commit }) {
      try {
        const response = await fetch(
          `http://localhost:5154/api/BookCategories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categories = await response.json();
        commit("set_categories", categories);
        console.log(categories);
        console.log(state.categories);
        return categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
  },
};

export default categoriesModule;
