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
          <span>Books</span>
          <div v-for="book in books" :key="book.id">
            <label>
              <input type="checkbox" :value="book.id" v-model="author.books" />
              {{ book.title }}
            </label>
          </div>
          <div class="error-message" v-if="msg.books">
            {{ msg.books }}
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
  name: "edit-author",
  mixins: [helper],
  data() {
    return {
      author: {},
      msg: {},
      books: [],
      authorId: this.$store.state.authorsModule.currentAuthor,
    };
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
            this.author.imageUrl = response.data.filePath;
            router.push("/authors");
            resolve();
          })
          .catch((error) => {
            console.error("Помилка завантаження файлу", error);
            reject(error);
          });
      });
    },
    async getAuthorById(id) {
      try {
        const response = await axios.get(
          `http://localhost:5154/api/Authors/${id}`
        );
        if (response.status === 200) {
          console.log("Book was successfully received");
          const userData = response.data;
          this.author = {
            fullName: userData.fullName,
            description: userData.description,
            urlHandle: userData.urlHandle,
            books: userData.books.map((category) => category.id),
            authorImageUrl: userData.authorImageUrl,
          };
        }
      } catch (error) {
        console.error("Error receiving book:", error);
        throw error;
      }
    },
    async getBooks() {
      this.books = await this.$store.dispatch("fetchBooks");
    },
    handleSubmission() {
      this.msg.fullName = this.validateName(this.author.fullName);
      this.msg.description = this.validateForEmpty(this.author.description);
      // this.msg.books = this.validateArray(this.author.books);
      this.msg.urlHandle = this.validateUrlHandle(this.author.urlHadle);
      this.msg.file = this.validateFile(false, this.$refs.fileInput.files[0]);
      if (Object.values(this.msg).every((message) => message === "")) {
        console.log(this.token);
        this.handleFileUpload().then(async () => {
          try {
            const response = await axios.put(
              `http://localhost:5154/api/Authors/${this.authorId}`,
              this.author,
              {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                },
              }
            );
            if (response.status === 200) {
              console.log("Book was successfully updated");
              router.push("/authors-table");
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
  mounted() {
    this.getAuthorById(this.authorId);
    this.getBooks();
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
