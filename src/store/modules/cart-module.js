import axios from "axios";
import store from "@/store";

const CartModule = {
  state: {
    items: [],
    deletedItems: [],
    currentItem: "",
  },
  mutations: {
    set_items(state, items) {
      state.items = items;
    },
    delete_item(state, id) {
      state.items = state.items.filter((item) => item.id !== id);
    },
    add_item(state, item) {
      state.items.push(item);
    },
  },
  actions: {
    async fetchUserCart({ commit }) {
      try {
        const user = store.state.user.userId;
        const token = store.state.user.jwtToken;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:5154/api/ShoppingCart/GetUserCart/${user}`,
          config
        );
        const Items = response.data;

        commit("set_items", Items);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    },

    async addToCart({ commit }, { bookId }) {
      try {
        const token = store.state.user.jwtToken;
        const user = store.state.user.userId;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const request = {
          bookId: bookId,
          quantity: 1,
        };

        const response = await axios.post(
          `http://localhost:5154/api/ShoppingCart/AddToCart/${user}`,
          request,
          config
        );
        const cart = response.data;
        commit("add_item", cart);

        return cart;
      } catch (error) {
        console.error("Error adding book to cart:", error);
        throw error;
      }
    },

    async deleteItem({ commit }, item) {
      try {
        const token = store.state.user.jwtToken;
        const user = store.state.user.userId;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete(
          `http://localhost:5154/api/ShoppingCart/Delete/${user}/CartItem/${item}`,
          config
        );

        if (response.status === 200) {
          commit("delete_item", item);
          console.log("Deleted successfully");
        }
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  getters: {
    display(state) {
      return state.display;
    },
  },
};

export default CartModule;
