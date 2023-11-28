import axios from "axios";
import router from "@/router";

const blogsModule = {
  state: {
    blogs: [],
  },
  mutations: {
    set_blogs(state, blogs) {
      state.blogs = blogs;
    },
  },
  actions: {
    async fetchBlogs({ commit }) {
      try {
        const response = await fetch(
          `http://localhost:5154/api/BlogPosts?isAscending=true&pageNumber=1&pageSize=1000`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const blogs = await response.json();
        commit("set_blogs", blogs);
        return blogs;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
    async createBlog({ commit }, userData, token) {
      try {
        const response = await axios.post(
          "http://localhost:5154/api/BlogPosts",
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // При необхідності вказуйте тип контенту
            },
          }
        );
        if (response.status === 200) {
          commit("set_personalBlog", { userData: response.data });
          await router.push("/blog");
          return "BlogPost added successfully!";
        } else {
          throw new Error("Something went wrong, try again");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error adding post :(");
      }
    },
  },
  getters: {},
};

export default blogsModule;
