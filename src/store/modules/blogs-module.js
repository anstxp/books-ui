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
    delete_blog(state, id) {
      state.blogs = state.blogs.filter((blog) => blog.id !== id);
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
    async deleteBlog({ commit }, { id, token }) {
      try {
        const response = await axios.delete(
          `http://localhost:5154/api/BlogPosts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Book was successfully deleted");
          commit("delete_blog", id);
          await router.push("/blog");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
      }
    },
  },
  getters: {},
};

export default blogsModule;
