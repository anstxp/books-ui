import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";
import booksModule from "@/store/modules/books-module";
import authorsModule from "@/store/modules/authors-module";
import categoriesModule from "@/store/modules/categories-module";
import collectionsModule from "@/store/modules/collections-module";
import blogsModule from "@/store/modules/blogs-module";
import cartModule from "@/store/modules/cart-module";
import orderModule from "@/store/modules/order-module";
export default createStore({
  state: {
    isAuth: false,
    user: {
      jwtToken: "",
      userId: "",
      roles: [],
    },
    cookies: null,
    search: "",
    booksSearch: [],
  },
  mutations: {
    setCookies(state, cookies) {
      state.cookies = cookies;
    },
    addUser(state, payload) {
      state.user.jwtToken = payload.userData.jwtToken;
      state.user.userId = payload.userData.userId;
      state.user.roles = payload.userData.roles;
      state.isAuth = payload.isAuth;

      localStorage.setItem("userData", JSON.stringify(payload.userData));
      localStorage.setItem("isAuth", payload.isAuth);
    },
    logoutUser(state) {
      state.user = {
        jwtToken: "",
        userId: "",
        roles: [],
      };
      state.isAuth = false;

      localStorage.removeItem("userData");
      localStorage.removeItem("isAuth");
    },
    searchInput(state, input) {
      console.log(input);
      state.search = input;
      localStorage.setItem("isAuth", input);
    },
    updateBooks(state, books) {
      state.booksSearch = books;
    },
  },
  actions: {
    async loginUser({ commit }, userData) {
      try {
        const response = await axios.post(
          "http://localhost:5154/api/Auth/Login",
          userData
        );
        if (response.status === 200) {
          commit("addUser", { userData: response.data, isAuth: true });
          await router.push("/");
          return "Login successful";
        } else {
          throw new Error(
            "Something went wrong, check your credentials and try again"
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error logging in");
      }
    },
    logout({ commit }) {
      commit("logoutUser");
      router.push("/sign-in");
    },
  },
  modules: {
    booksModule,
    authorsModule,
    categoriesModule,
    collectionsModule,
    blogsModule,
    cartModule,
    orderModule,
  },
  plugins: [
    (store) => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const isAuth = localStorage.getItem("isAuth");

      if (userData && isAuth) {
        store.commit("addUser", { userData, isAuth });
      }
    },
  ],
});
