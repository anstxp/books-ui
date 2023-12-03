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
        type="text"
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

<script>
import axios from "axios";
import router from "@/router";
import helper from "@/mixins/form-helper";

export default {
  name: "edit-book",
  mixins: [helper],
  data() {
    return {
      book: {},
      msg: {},
      collections: [],
      authors: [],
      categories: [],
      bookId: this.$store.state.booksModule.currentBook,
    };
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
    async getBookById(id) {
      try {
        const response = await axios.get(
          `http://localhost:5154/api/Books/${id}`
        );
        if (response.status === 200) {
          console.log("Book was successfully received");
          const bookData = response.data;
          this.book = {
            title: bookData.title,
            description: bookData.description,
            isbn: bookData.isbn,
            pageCount: bookData.pageCount,
            urlHadle: bookData.urlHadle,
            price: bookData.price,
            categories: bookData.categories.map((category) => category.id),
            collections: bookData.collection.map((collection) => collection.id),
            authors: bookData.authors.map((author) => author.id),
            imageUrl: bookData.imageUrl,
          };
        }
      } catch (error) {
        console.log("Error receiving book");
        console.error("Error receiving book:", error);
        throw error;
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
    handleSubmission() {
      this.showErrors = true;
      this.msg.title = this.validateName(this.book.title);
      this.msg.description = this.validateForEmpty(this.book.description);
      this.msg.isbn = this.validateISBN(this.book.isbn);
      this.msg.categories = this.validateArray(this.book.categories);
      this.msg.authors = this.validateArray(this.book.authors);
      this.msg.pageCount = this.validatePageCount(this.book.pageCount);
      this.msg.urlHandle = this.validateUrlHandle(this.book.urlHadle);
      this.msg.price = this.validateForEmpty(this.book.price);
      this.msg.file = this.validateFile(false, this.$refs.fileInput.files[0]);
      console.log(this.msg);
      if (Object.values(this.msg).every((message) => message === "")) {
        console.log("handleSubmission2");
        console.log(this.token);
        this.handleFileUpload().then(async () => {
          try {
            const response = await axios.put(
              `http://localhost:5154/api/Books/${this.bookId}`,
              this.book,
              {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                },
              }
            );
            if (response.status === 200) {
              console.log("Book was successfully updated");
              await router.push("/books");
            }
          } catch (error) {
            console.log("Error updating book");
            console.error("Error updating book:", error);
            throw error;
          }
        });
      }
    },
  },
  created() {
    this.getBookById(this.bookId);
    this.getAuthors();
    this.getCollections();
    this.getCategories();
  },
  computed: {
    token() {
      return this.$store.state.user.jwtToken;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/components/auth-components/auth-style";

.block {
  display: flex;
  width: 100%;
}

.main-container {
  margin-left: 10px;
  flex: 5;
}

.image-container {
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container img {
  margin-top: 20px;
  height: 300px;
  object-fit: cover;
}
</style>
