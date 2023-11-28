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
      <div class="error-message" v-if="msg.title">
        {{ msg.title }}
      </div>
      <span>content</span>
      <textarea
        name="content"
        class="box"
        placeholder="content of your post"
        v-model="post.content"
      />
      <div class="error-message" v-if="msg.content">
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
      <div class="error-message" v-if="msg.file">
        {{ msg.file }}
      </div>
      <input type="submit" value="submit" formaction="#" class="btn" />
      <div class="error-message" v-if="msg.post">
        {{ msg.post }}
      </div>
    </form>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
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
    validateTitle() {
      console.log("validateTitle");
      if (/^[a-zA-Z\s]{3,}$/.test(this.post.title)) {
        this.msg.title = "";
        console.log("validateTitle+");
      } else {
        this.msg.title = "title must be at least 3 characters";
        console.log("validateTitle-");
      }
    },
    validateContent() {
      console.log("validateContent");
      if (this.post.content !== null) {
        this.msg.content = "";
        console.log("validateContent+");
      } else {
        console.log("validateContent-");
        this.msg.content =
          "content is required and must be at least 20 characters";
      }
    },
    validateFile() {
      console.log("validateFile");
      const file = this.$refs.fileInput.files[0]; // Отримуємо файл з інпута
      if (file != null) {
        if (file.size > 10 * 1024 * 1024) {
          console.log("validateFile-");
          this.msg.file = "File size should not exceed 10MB";
        } else {
          console.log("validateFile+");
          this.msg.file = "";
        }
      }
    },
    handleSubmission() {
      console.log("handleSubmission");
      this.showErrors = true;
      this.validateTitle();
      this.validateContent();
      this.validateFile();

      if (Object.values(this.msg).every((message) => message === "")) {
        console.log("handleSubmission2");
        this.handleFileUpload().then(() => {
          this.addBlog();
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
          this.isFormValid = true;
          this.showErrors = false;
        });
      }
    },
    async addBlog() {
      console.log("addBlog");
      const currentDate = new Date();
      const publishDate = currentDate.toISOString();
      const UserData = {
        title: this.post.title,
        content: this.post.content,
        user: this.$store.state.user.userId,
        book: this.post.book,
        imageUrl: this.post.imageUrl,
        isVisible: this.post.isVisible,
        publishDate: publishDate,
      };
      console.log(UserData);

      try {
        await this.$store.dispatch("createBlog", UserData);
        await router.push("/blog");
      } catch (error) {
        console.error(error);
        this.msg.login = "Something went wrong, try again";
      }
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
