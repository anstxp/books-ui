<template>
  <section>
    <div class="book-details">
      <div class="book-details-container">
        <div v-if="book" class="book-info">
          <img :src="book.imageUrl" :alt="book.title" class="book-image" />
          <div class="book-text">
            <h1>{{ book.title }}</h1>
            <h3 class="author">
              <strong>Author:</strong> {{ book.authors[0].fullName }}
            </h3>
            <p><strong>Description:</strong> {{ book.description }}</p>
            <p>
              <strong>Categories:</strong>
              {{ book.categories.map((category) => category.name).join(", ") }}
            </p>
            <p><strong>ISBN:</strong> {{ book.isbn }}</p>
            <p><strong>Page Count:</strong> {{ book.pageCount }}</p>
            <p><strong>Price:</strong> ${{ book.price }}</p>
            <input
              @click="addToCart(book.id)"
              type="submit"
              class="btn-small"
              value="Add to cart"
            />
          </div>
        </div>
        <div v-if="this.$store.state.isAuth" class="add-comment">
          <h2>Add a Comment:</h2>
          <form @submit.prevent="handleSubmission">
            <div class="form">
              <textarea
                name="content"
                class="box"
                placeholder="content of your post"
                v-model="comment.content"
              />
              <input type="submit" class="btn-small" value="Add comment" />
            </div>
          </form>
        </div>
        <div v-if="book" class="comments">
          <h2>Comments:</h2>
          <div
            v-for="comment in book.comments"
            :key="comment.id"
            class="comment"
          >
            <p><strong>User:</strong> {{ comment.user.userName }}</p>
            <p><strong>Content:</strong> {{ comment.content }}</p>
            <p>
              <strong>Date:</strong>
              {{ formattedDate(comment.publishDate) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import router from "@/router";
import formHelper from "@/mixins/form-helper";

export default {
  mixins: [formHelper],
  data() {
    return {
      book: null,
      comment: {
        content: "",
      },
      msg: {
        content: "",
      },
    };
  },
  watch: {
    "comment.content": function () {
      this.msg.content = this.validateContent(this.comment.content);
    },
  },
  created() {
    this.fetchBook();
  },
  methods: {
    formattedDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    },
    handleSubmission() {
      if (Object.values(this.msg).every((message) => message === "")) {
        console.log("handleSubmission2");
        this.addComment();
        this.comment = {
          content: "",
        };
      }
    },
    async fetchBook() {
      try {
        const urlHandle = this.$route.params.urlHandle;
        const response = await axios.get(
          `http://localhost:5154/api/Books/${urlHandle}`
        );
        this.book = response.data;
        console.log("done", response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    },
    async addComment() {
      const data = {
        content: this.comment.content,
        user: this.$store.state.user.userId,
        book: this.book.id,
        date: this.getCurrentDate(),
      };
      console.log(data);
      try {
        const response = await axios.post(
          `http://localhost:5154/api/Comments`,
          data
        );
        console.log("done", response.data);
        await this.fetchBook();
        router.push(`/book/${this.book.urlHadle}`);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    },
    addToCart(bookId) {
      this.$store
        .dispatch("addToCart", { bookId })
        .then((cart) => {
          router.push("/shopping-cart");
          console.log("Товар успішно додано до кошика:", cart);
        })
        .catch((error) => {
          console.error("Помилка додавання товару до кошика:", error);
          router.push("/shopping-cart");
        });
    },
  },
};
</script>

<style scoped>
.book-details {
  color: var(--black);
}

.book-details-container {
  display: flex;
  flex-direction: column;
}

.book-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.book-image {
  width: 220px;
  height: auto;
  margin-right: 30px;
  border-radius: 5px;
}

.book-text {
  width: 100%;
}

.book-text h1 {
  font-size: 2rem;
}

.book-text h3 {
  font-size: 1.6rem;
  margin-bottom: 2px;
}

.author {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1.4em;
}

.book-text p {
  font-size: 1.4rem;
  text-transform: none;
  padding: 3px;
  margin-bottom: 3px;
}

.comments {
  margin-top: 20px;
  color: var(--black);
  font-size: 1.3rem;
}

.comment {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

form .box {
  width: 100%;
  margin: 1rem 0;
  font-size: 1.4rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #333;
  transition: border-color 0.3s ease;
}
</style>
