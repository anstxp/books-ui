<template>
  <div class="blog-post">
    <button
      v-if="isAdmin"
      class="light-button"
      @click="deleteBlog(this.post.id, this.token)"
    >
      Delete
    </button>
    <div class="post-header">
      <h2>{{ post.title }}</h2>
      <p class="publish-date">{{ formattedDate }}</p>
      <img v-if="post.imageUrl !== ''" :src="post.imageUrl" alt="Blog Image" />
    </div>
    <div class="post-content">
      <p>{{ post.book }}</p>
      <p>{{ post.content }}</p>
    </div>
    <div class="author-info">
      <div class="author">
        <img :src="post.user.userInfo.profilePhotoUrl" alt="Author's Photo" />
        <div class="author-details">
          <h3>
            {{ post.user.userInfo.firstName }}
            {{ post.user.userInfo.lastName }}
          </h3>
          <p>Email: {{ post.user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPost: {
        id: this.post.id,
      },
      token: this.$store.state.user.jwtToken,
    };
  },
  computed: {
    formattedDate() {
      const date = new Date(this.post.publishDate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    },
    isAdmin() {
      return this.$store.state.user.roles.includes("admin");
    },
  },
  methods: {
    deleteBlog(id, token) {
      console.log(id);
      console.log(token);
      this.$store.dispatch("deleteBlog", { id, token });
      router.push("/blog");
    },
  },
};
</script>

<style scoped>
.blog-post {
  position: relative;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 15px auto;
  padding: 30px;
}

.post-header {
  margin-bottom: 20px;
}

.post-header h2 {
  font-size: 2.4rem;
  margin-bottom: 10px;
  color: var(--black);
}

.post-header img {
  height: 350px;
  width: 100%;
  object-fit: cover;
  margin: 20px auto;
  display: block;
}

.publish-date {
  color: #888;
}

.post-content {
  margin: 20px 10px;
}

.post-content img {
  max-height: 100px;
  width: auto;
  margin: 20px auto;
  display: block;
}

.post-content p {
  line-height: 1.5;
  font-size: 1.3rem;
  color: var(--black);
  text-align: justify;
  text-transform: none;
}

.author {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.author img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.author-details {
  margin-left: 10px;
}

.author-details h3 {
  margin-bottom: 5px;
  font-size: 1.6rem;
  color: var(--black);
}

.author-details p {
  color: #888;
  font-size: 1.2rem;
}

.light-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;
}
</style>
