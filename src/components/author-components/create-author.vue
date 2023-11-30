<template>
  <div class="login-form-container">
    <form
      action="#"
      id="editBook-form"
      novalidate
      @submit.prevent="handleSubmission"
      class="form-grid"
    >
      <h3>Edit Author</h3>
      <span>full name</span>
      <input
        type="text"
        name="full name"
        class="box"
        placeholder="enter full name"
        v-model="author.fullName"
      />
      <div class="error-message">
        {{ msg.fullName }}
      </div>
      <span>description</span>
      <textarea
        name="description"
        class="box"
        placeholder="enter book description"
        v-model="author.description"
        rows="8"
      />
      <div class="error-message">
        {{ msg.description }}
      </div>
      <div class="main-container">
        <span>url handle</span>
        <input
          type="text"
          name="url handle"
          class="box"
          placeholder="enter url handle"
          v-model="author.urlHandle"
        />
        <div class="error-message">
          {{ msg.urlHandle }}
        </div>
        <div class="main-container">
          <span>categories</span>
          <div v-for="book in books" :key="book.id">
            <label>
              <input type="checkbox" :value="book.id" v-model="author.books" />
              {{ book.title }}
            </label>
          </div>
          <div class="error-message">
            {{ msg.book }}
          </div>
        </div>
        <div class="image-container">
          <div v-if="author.authorImageUrl">
            <img :src="author.authorImageUrl" alt="Book Image" />
          </div>
        </div>
      </div>
      <span>add new picture here</span>
      <input type="file" ref="fileInput" class="box" accept="image/*" />
      <div class="error-message" v-if="msg.file">
        {{ msg.file }}
      </div>
      <input type="submit" value="submit" formaction="#" class="btn" />
      <div class="error-message" v-if="msg.submit">
        {{ msg.submit }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import helper from "@/mixins/form-helper";

export default {
  name: "create-book",
  mixins: [helper],
  data() {
    return {
      author: {
        fullName: "",
        description: "",
        urlHandle: "",
        authorImageUrl: "",
        books: [],
      },
      msg: {
        fullName: "",
        description: "",
        urlHandle: "",
        authorImageUrl: "",
        books: "",
      },
      books: [],
    };
  },
  watch: {
    "author.fullName": function () {
      this.msg.fullName = this.validateName(this.author.fullName);
    },
    "author.description": function () {
      this.msg.description = this.validateName(this.author.description);
    },
    "author.urlHandle": function () {
      this.msg.urlHandle = this.validateUrlHandle(this.author.urlHandle);
    },
    "author.books": function () {
      this.msg.books = this.validateArray(this.author.books);
    },
    "author.file": function () {
      this.msg.file = this.validateFile(false, this.author.file);
    },
  },
  methods: {
    handleFileUpload() {
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
            this.author.authorImageUrl = response.data.filePath;
            router.push("/authors");
            resolve();
          })
          .catch((error) => {
            console.error("Помилка завантаження файлу", error);
            reject(error);
          });
      });
    },
    handleSubmission() {
      console.log("Handle");
      if (Object.values(this.msg).every((message) => message === "")) {
        this.handleFileUpload().then(async () => {
          try {
            console.log(this.author);
            const response = await axios.post(
              "http://localhost:5154/api/Authors",
              this.author,
              {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                  "Content-Type": "application/json", // При необхідності вказуйте тип контенту
                },
              }
            );
            if (response.status === 201) {
              console.log("Author added successfully");
            }
          } catch (error) {
            console.error("Error adding author:", error);
            throw error;
          }
        });
      }
    },
    async getBooks() {
      this.books = await this.$store.dispatch("fetchBooks");
    },
  },
  computed: {
    token() {
      return this.$store.state.user.jwtToken;
    },
    userId() {
      return this.$store.state.user.userId;
    },
  },
  mounted() {
    this.getBooks();
  },
};
</script>

<style scoped lang="scss">
@import "@/components/auth-components/auth-style";
</style>
