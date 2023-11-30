import axios from "axios";

const booksModule = {
  state: {
    selectedSort: "",
    pageNumber: 1,
    pageSize: 10,
    books: [],
    displayMode: "grid",
    deletedBooks: [],
    currentBook: "",
  },
  mutations: {
    set_books(state, books) {
      state.books = books;
    },
    set_selectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    set_display(state, displayMode) {
      state.displayMode = displayMode;
    },
    delete_book(state, id) {
      state.books = state.books.filter((book) => book.id !== id);
    },
    add_book(state, book) {
      state.books.add(book);
    },
    set_currentBook(state, id) {
      state.currentBook = id;
      console.log(state.currentBook);
    },
  },
  actions: {
    async fetchBooks({ state, commit }) {
      try {
        const response = await fetch(
          `http://localhost:5154/api/Books?sortBy=${state.selectedSort}&isAscending=true&pageNumber=1&pageSize=1000`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const books = await response.json();
        commit("set_books", books);
        console.log("actions did");
        return books;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },

    async addBook({ commit }, bookData, token) {
      try {
        const response = await axios.post(
          "http://localhost:5154/api/Books",
          bookData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // При необхідності вказуйте тип контенту
            },
          }
        );
        if (response.status === 201) {
          console.log("Book added successfully");
          commit("add_book", response.data); // Припустимо, що відповідна мутація для додавання книги
        }
      } catch (error) {
        console.error("Error adding book:", error);
        throw error;
      }
    },

    async deleteBook({ commit }, { id, token }) {
      try {
        console.log(id + token);
        const response = await axios.delete(
          `http://localhost:5154/api/Books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Book was successfully deleted");
          commit("delete_book", id);
        }
      } catch (error) {
        console.log("Error deleting book");
        console.error("Error deleting book:", error);
        throw error;
      }
    },

    async editBook(id, data, token) {
      try {
        const response = await axios.put(
          `http://localhost:5154/api/Books/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Book was successfully updated");
        }
      } catch (error) {
        console.log("Error updating book");
        console.error("Error updating book:", error);
        throw error;
      }
    },

    async updateSort({ commit, dispatch }, selectedSort) {
      commit("set_selectedSort", selectedSort);
      console.log(selectedSort); // Оновити значення сортування
      await dispatch("fetchBooks");
      console.log("fetchBooks"); // Потім викликати fetchBooks з новим значенням сортування
    },
    async updateDisplay({ commit }, displayMode) {
      commit("set_display", displayMode);
    },
  },
  getters: {
    display(state) {
      return state.display;
    },
  },
};

export default booksModule;
