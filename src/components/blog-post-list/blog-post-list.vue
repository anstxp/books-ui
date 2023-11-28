<template>
  <div class="blog-posts" v-for="post in filteredPosts" :key="post.id">
    <BlogPostComponent :post="post" />
  </div>
  <AuthPromtComponent v-if="!this.$store.state.isAuth" />
</template>

<script>
import BlogPostComponent from "@/components/blog-post-item/blog-post-component.vue";
import AuthPromtComponent from "@/components/UI/auth-prompt/auth-promt-component.vue";
export default {
  components: {
    AuthPromtComponent,
    BlogPostComponent,
  },
  computed: {
    blogPosts() {
      console.log(this.$store.state.blogsModule.blogs);
      return this.$store.state.blogsModule.blogs;
    },
    filteredPosts() {
      if (!this.$store.state.isAuth) {
        return this.blogPosts.slice(0, 3);
      }
      return this.blogPosts;
    },
  },
  created() {
    this.fetchBlogs();
  },
  methods: {
    fetchBlogs() {
      this.$store.dispatch("fetchBlogs");
    },
  },
};
</script>
