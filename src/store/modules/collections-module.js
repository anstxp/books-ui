const collectionsModule = {
  state: {
    collections: [],
  },
  mutations: {
    set_collections(state, collections) {
      state.collections = collections;
    },
  },
  actions: {
    async fetchCollections({ commit }) {
      try {
        const response = await fetch(`http://localhost:5154/api/Collections`);
        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }
        const collections = await response.json();
        commit("set_collections", collections);
        return collections;
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    },
  },
};

export default collectionsModule;
