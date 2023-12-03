import axios from "axios";
import store from "@/store";

const orderModule = {
  state: {
    items: [],
    deletedItems: [],
    currentItem: "",
    orders: [],
  },
  mutations: {
    set_orders(state, orders) {
      state.orders = orders;
    },
    set_userOrders(state, userOrders) {
      state.userOrders = userOrders;
    },
    set_userNewOrders(state, userOrders) {
      state.userOrders = userOrders;
    },
  },
  actions: {
    async fetchAllOrders({ commit }) {
      const token = store.state.user.jwtToken;
      try {
        const response = await axios.get(
          "http://localhost:5154/api/Order/AllOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        commit("set_orders", response.data);
      } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
      }
    },
    async fetchUserOrders({ commit }) {
      const token = store.state.user.jwtToken;
      const user = store.state.user.userId;
      try {
        const response = await axios.get(
          `http://localhost:5154/api/Order/OrdersById/${user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        commit("set_userOrders", response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
      }
    },
    async createOrder({ commit }) {
      const token = store.state.user.jwtToken;
      const user = store.state.user.userId;
      try {
        const response = await axios.post(
          `http://localhost:5154/api/Order/CreateOrderFromCart/${user}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        commit("set_userNewOrders", response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating order from cart:", error);
        throw error;
      }
    },
  },
  getters: {
    display(state) {
      return state.display;
    },
  },
};

export default orderModule;
