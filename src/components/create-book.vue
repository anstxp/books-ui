<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "create-book",
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
        categories: [],
        collections: [],
        authors: [],
      },
    };
  },
  methods: {
    validateTitle() {
      if (/^[a-zA-Z]{3,}$/.test(this.book.title)) {
        this.msg.title = "";
        console.log("validateTitle+");
      } else {
        this.msg.title = "title must be at least 3 characters";
        console.log("validateTitle-");
      }
    },
    validateDescription() {
      console.log("validateContent");
      if (this.book.description !== null) {
        this.msg.description = "";
        console.log("validateContent+");
      } else {
        console.log("validateContent-");
        this.msg.description =
          "description is required and must be at least 20 characters";
      }
    },
    validateISBN() {
      console.log("validateContent");
      if (/^\d{10}$/.test(this.book.isbn)) {
        this.msg.isbn = "";
        console.log("validateContent+");
      } else {
        console.log("validateContent-");
        this.msg.isbn = "invalid isbn";
      }
    },
    validatePageCount() {
      if (this.book.pageCount === null) {
        this.msg.pageCount = "page count is required";
      } else {
        console.log("validateContent-");
        this.msg.pageCount = "";
      }
    },
    validateUrlHandle() {
      if (/^[a-zA-Z/-]+$/.test(this.book.urlHadle)) {
        this.msg.urlHadle = "";
        console.log("validateContent+");
      } else {
        console.log("validateContent-");
        this.msg.urlHadle = "invalid url handle";
      }
    },
    validatePrice() {
      if (this.book.price === null) {
        this.msg.price = "price is required";
      } else {
        console.log("validateContent-");
        this.msg.price = "";
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
          this.msg.file = "file is required";
        }
      }
    },
    validateAuthors() {
      if (this.book.authors.length > 0) {
        this.msg.author = "";
      } else {
        this.msg.author = "choose at least one author";
      }
    },
    validateCategories() {
      if (this.book.categories.length > 0) {
        this.msg.categories = "";
      } else {
        this.msg.categories = "choose at least one category";
      }
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
      this.showErrors = true;
      this.validateTitle();
      this.validateDescription();
      this.validateISBN();
      this.validateCategories();
      this.validateAuthors();
      this.validatePageCount();
      this.validateUrlHandle();
      this.validatePrice();
      this.validateFile();
      console.log(this.msg);
      if (Object.values(this.msg).every((message) => message === "")) {
        console.log("handleSubmission2");
        console.log(this.token);
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
    computed: {
      token() {
        return this.$store.state.user.jwtToken;
      },
    },
  },
};
</script>

<template>
  <div class="login-form-container">
    <form
      action="#"
      id="editBook-form"
      novalidate
      @submit.prevent="handleSubmission"
      class="form-grid"
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
      <div class="error-message" v-if="msg.title">
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
      <div class="error-message" v-if="msg.description">
        {{ msg.description }}
      </div>
      <span>isbn</span>
      <input
        type="number"
        name="isbn"
        class="box"
        placeholder="enter isbn"
        v-model="book.isbn"
      />
      <div class="error-message" v-if="msg.isbn">
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
      <div class="error-message" v-if="msg.pageCount">
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
      <div class="error-message" v-if="msg.urlHadle">
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
      <div class="error-message" v-if="msg.price">
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
            <div class="error-message" v-if="msg.category">
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
              <div class="error-message" v-if="msg.collections">
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
            <div class="error-message" v-if="msg.authors">
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

<style scoped lang="scss"></style>
