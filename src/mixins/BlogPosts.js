import axios from "axios";

export default {
  methods: {
    async addBlogPost(UserData, token) {
      console.log(UserData + token);
      try {
        const response = await axios.post(
          "http://localhost:5154/api/BlogPosts",
          UserData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          return "BlogPost added successfully!";
        } else {
          throw new Error("Something went wrong, try again");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error adding post :(");
      }
    },

    async updateBlogPost(UserData, token) {
      console.log(UserData + token);
      try {
        const response = await axios.put(
          "http://localhost:5154/api/BlogPosts",
          UserData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          return "BlogPost updated successfully!";
        } else {
          throw new Error("Something went wrong, try again");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error updating post :(");
      }
    },
  },
};
