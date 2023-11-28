const authorsModule = {
  state: {
    authors: [],
  },
  mutations: {
    set_authors(state, authors) {
      state.authors = authors;
    },
  },
  actions: {
    async fetchAuthors({ state, commit }) {
      try {
        const response = await fetch(`http://localhost:5154/api/Authors`);
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        const authors = await response.json();
        commit("set_authors", authors);
        console.log(authors);
        console.log(state.authors);
        return authors;
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    },
  },
};

export default authorsModule;
