<template>
  <div class="login-form-container">
    <form
      action="#"
      id="createBlog-form"
      novalidate
      @submit.prevent="handleSubmission"
    >
      <h3>Create Post</h3>
      <span>title</span>
      <input
        type="text"
        name="title"
        class="box"
        placeholder="enter post title"
        v-model="post.title"
      />
      <div class="error-message">
        {{ msg.title }}
      </div>
      <span>content</span>
      <textarea
        name="content"
        class="box"
        placeholder="content of your post"
        v-model="post.content"
      />
      <div class="error-message">
        {{ msg.content }}
      </div>
      <span>book</span>
      <input
        v-model="post.searchbook"
        @input="searchBooks"
        type="text"
        placeholder="enter book title"
        class="box"
      />
      <select v-model="post.book" @change="handleBookSelection">
        <option disabled value="">Оберіть книгу</option>
        <option
          v-for="(book, index) in bookResults"
          :key="index"
          :value="book.volumeInfo.title"
        >
          {{ book.volumeInfo.title }}
        </option>
      </select>
      <span>add picture for ur blog post</span>
      <input type="file" ref="fileInput" class="box" accept="image/*" />
      <div class="error-message">
        {{ msg.file }}
      </div>
      <input type="submit" value="submit" formaction="#" class="btn" />
      <div class="error-message">
        {{ msg.post }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import formHelper from "@/mixins/form-helper";
import blogPosts from "@/mixins/BlogPosts";
import router from "@/router";

export default {
  mixins: [formHelper, blogPosts],
  data() {
    return {
      post: {
        title: "",
        content: "",
        searchbook: "",
        book: "",
        imageUrl: "",
        publishDate: "",
        user: "",
        isVisible: true,
      },
      msg: {
        title: "",
        content: "",
        book: "",
        imageUrl: "",
        publishDate: "",
        user: "",
        post: "",
      },
      bookResults: [],
    };
  },
  watch: {
    "post.title": function () {
      this.msg.title = this.validateName(this.post.title);
    },
    "post.content": function () {
      this.msg.content = this.validateContent(this.post.content);
    },
    "post.file": function () {
      this.msg.file = this.validateFile(false, this.$refs.fileInput.files[0]);
    },
  },
  computed: {
    token() {
      return this.$store.state.user.jwtToken;
    },
  },
  methods: {
    async searchBooks() {
      try {
        const response = await fetch(
          "http://localhost:5154/GoogleBooks/" +
            encodeURIComponent(this.post.searchbook)
        );
        if (response.ok) {
          this.bookResults = await response.json();
        } else {
          console.error("Помилка при отриманні даних");
        }
      } catch (error) {
        console.error("Помилка з'єднання");
      }
    },
    handleSubmission() {
      if (Object.values(this.msg).every((message) => message === "")) {
        console.log("handleSubmission2");
        this.handleFileUpload().then(() => {
          this.addBlog(this.token);
          this.post = {
            title: "",
            content: "",
            book: "",
            searchbook: "",
            imageUrl: "",
            publishDate: "",
            user: "",
            isVisible: true,
          };
        });
      }
    },
    async addBlog(token) {
      console.log(token);
      const userData = {
        title: this.post.title,
        content: this.post.content,
        user: this.$store.state.user.userId,
        book: this.post.book,
        imageUrl: this.post.imageUrl,
        isVisible: this.post.isVisible,
        publishDate: this.getCurrentDate(),
      };
      await this.addBlogPost(userData, token);
      await router.push("/blog");
    },
    handleBookSelection() {
      this.post.searchbook = this.post.book;
    },
    handleFileUpload() {
      console.log("handleFileUpload");
      return new Promise((resolve, reject) => {
        const file = this.$refs.fileInput.files[0];
        if (file == null) {
          resolve();
          return;
        }
        const formData = new FormData();
        formData.append("file", file);

        axios
          .post("http://localhost:5154/api/Images/Upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.post.imageUrl = response.data.filePath;
            console.log(this.post.imageUrl);
            console.log("Файл успішно завантажено на сервер", response);
            resolve();
          })
          .catch((error) => {
            console.error("Помилка завантаження файлу", error);
            reject(error);
          });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/components/auth-components/auth-style";
</style>
