import axios from "axios";

const authorsModule = {
  state: {
    authors: [],
    selectedSort: "",
  },
  mutations: {
    set_authors(state, authors) {
      state.authors = authors;
    },
    delete_author(state, id) {
      state.authors = state.authors.filter((author) => author.id !== id);
    },
    set_currentAuthor(state, id) {
      state.currentAuthor = id;
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
    async deleteAuthor({ commit }, { id, token }) {
      try {
        console.log(id + token);
        const response = await axios.delete(
          `http://localhost:5154/api/Authors/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Author was successfully deleted");
          commit("delete_author", id);
        }
      } catch (error) {
        console.log("Error deleting author");
      }
    },
  },
};

export default authorsModule;
