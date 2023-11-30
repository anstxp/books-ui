<template>
  <div class="blog-posts" v-for="post in blogs" :key="post.id">
    <BlogPostComponent :post="post" />
  </div>
  <AuthPromptComponent v-if="!this.$store.state.isAuth" />
</template>

<script>
import BlogPostComponent from "@/components/blogPost-components/blog-post-component.vue";
import AuthPromptComponent from "@/components/UI/auth-prompt/auth-promt-component.vue";
export default {
  components: {
    AuthPromptComponent,
    BlogPostComponent,
  },
  computed: {
    blogs() {
      if (this.$store.state.isAuth) {
        return this.$store.state.blogsModule.blogs;
      } else {
        return this.$store.state.blogsModule.blogs.slice(3);
      }
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
