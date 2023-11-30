<template>
  <div class="login-form-container">
    <form
      action="#"
      id="editBook-form"
      novalidate
      @submit.prevent="handleSubmission"
    >
      <h3>Edit Book</h3>
      <span>title</span>
      <input
        type="text"
        name="title"
        class="box"
        placeholder="enter book title"
        v-model="book.title"
      />
      <div class="error-message">
        {{ msg.title }}
      </div>
      <span>description</span>
      <textarea
        name="description"
        class="box"
        placeholder="enter book description"
        v-model="book.description"
        rows="8"
      />
      <div class="error-message">
        {{ msg.description }}
      </div>
      <span>isbn</span>
      <input
        type="text"
        name="isbn"
        class="box"
        placeholder="enter isbn"
        v-model="book.isbn"
      />
      <div class="error-message">
        {{ msg.isbn }}
      </div>
      <span>page count</span>
      <input
        type="number"
        name="pageCount"
        class="box"
        placeholder="enter page count"
        v-model="book.pageCount"
      />
      <div class="error-message">
        {{ msg.pageCount }}
      </div>
      <span>url-handle</span>
      <input
        type="text"
        name="url"
        class="box"
        placeholder=""
        v-model="book.urlHadle"
      />
      <div class="error-message">
        {{ msg.urlHadle }}
      </div>
      <span>price</span>
      <input
        type="number"
        name="price"
        class="box"
        placeholder="enter price"
        v-model="book.price"
      />
      <div class="error-message">
        {{ msg.price }}
      </div>
      <div class="block">
        <div class="main-container">
          <div class="categories-container">
            <span>categories</span>
            <div v-for="category in categories" :key="category.id">
              <label>
                <input
                  type="checkbox"
                  :value="category.id"
                  v-model="book.categories"
                />
                {{ category.name }}
              </label>
            </div>
            <div class="error-message">
              {{ msg.category }}
            </div>
          </div>
          <div class="authors-container">
            <span>Collections</span>
            <div v-for="collection in collections" :key="collection.id">
              <label>
                <input
                  type="checkbox"
                  :value="collection.id"
                  v-model="book.collections"
                />
                {{ collection.name }}
              </label>
              <div class="error-message">
                {{ msg.collections }}
              </div>
            </div>
          </div>
          <div class="authors-container">
            <span>Authors</span>
            <div v-for="author in authors" :key="author.id">
              <label>
                <input
                  type="checkbox"
                  :value="author.id"
                  v-model="book.authors"
                />
                {{ author.fullName }}
              </label>
            </div>
            <div class="error-message">
              {{ msg.authors }}
            </div>
          </div>
        </div>
        <div class="image-container">
          <div v-if="book.imageUrl">
            <img :src="book.imageUrl" alt="Book Image" />
          </div>
        </div>
      </div>
      <span>add new picture here</span>
      <input type="file" ref="fileInput" class="box" accept="image/*" />
      <div class="error-message">
        {{ msg.file }}
      </div>
      <input type="submit" value="submit" formaction="#" class="btn" />
      <div class="error-message">
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
      book: {
        title: "",
        description: "",
        isbn: "",
        pageCount: "",
        urlHadle: "",
        price: "",
        categories: [],
        collections: [],
        authors: [],
      },
      msg: {
        title: "",
        description: "",
        isbn: "",
        pageCount: "",
        urlHadle: "",
        price: "",
        categories: "",
        collections: "",
        authors: "",
      },
      collections: [],
      authors: [],
      categories: [],
    };
  },
  watch: {
    "book.title": function () {
      this.msg.title = this.validateName(this.book.title);
    },
    "book.description": function () {
      this.msg.description = this.validateName(this.book.description);
    },
    "book.isbn": function () {
      this.msg.isbn = this.validateISBN(this.book.isbn);
    },
    "book.pageCount": function () {
      this.msg.pageCount = this.validatePageCount(this.book.pageCount);
    },
    "book.urlHadle": function () {
      this.msg.urlHadle = this.validateUrlHandle(this.book.urlHadle);
    },
    "book.price": function () {
      this.msg.price = this.validateForEmpty(this.book.price);
    },
    "book.categories": function () {
      this.msg.categories = this.validateArray(this.book.categories);
    },
    "book.collections": function () {
      this.msg.collections = this.validateArray(this.book.collections);
    },
    "book.authors": function () {
      this.msg.authors = this.validateArray(this.book.authors);
    },
    "book.file": function () {
      this.msg.file = this.validateFile(false, this.user.file);
    },
  },
  methods: {
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
            this.book.imageUrl = response.data.filePath;
            console.log(this.book.imageUrl);
            console.log("Файл успішно завантажено на сервер", response);
            router.push("/books");
            resolve();
          })
          .catch((error) => {
            console.error("Помилка завантаження файлу", error);
            reject(error);
          });
      });
    },
    handleSubmission() {
      if (Object.values(this.msg).every((message) => message === "")) {
        this.handleFileUpload().then(async () => {
          try {
            const response = await axios.post(
              "http://localhost:5154/api/Books",
              this.book,
              {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                  "Content-Type": "application/json", // При необхідності вказуйте тип контенту
                },
              }
            );
            if (response.status === 201) {
              console.log("Book added successfully");
            }
          } catch (error) {
            console.error("Error adding book:", error);
            throw error;
          }
        });
      }
    },
    async getCollections() {
      this.collections = await this.$store.dispatch("fetchCollections");
    },
    async getCategories() {
      this.categories = await this.$store.dispatch("fetchCategories");
    },
    async getAuthors() {
      this.authors = await this.$store.dispatch("fetchAuthors");
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
    this.getCollections();
    this.getAuthors();
    this.getCategories();
  },
};
</script>

<style scoped lang="scss">
@import "@/components/auth-components/auth-style";
</style>
