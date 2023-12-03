<template>
  <div class="book-item" v-if="book">
    <router-link :to="'/book/' + book.urlHandle">
      <img :src="book.imageUrl" :alt="book.title" class="book-cover" />
    </router-link>
    <div class="book-details">
      <router-link :to="'/book/' + book.urlHandle">
        <h2 class="book-title">{{ book.title }}</h2>
      </router-link>
      <p class="book-description">{{ book.description }}</p>
      <p class="price"><strong>Price:</strong> ${{ book.price }}</p>
      <div class="quantity-controls">
        <button
          @click="decreaseQuantity(itemId, quantity)"
          class="quantity-btn"
        >
          -
        </button>
        <span class="quantity">{{ quantity }}</span>
        <button
          @click="increaseQuantity(itemId, quantity)"
          class="quantity-btn"
        >
          +
        </button>
        <button @click="deleteItem(itemId)" class="light-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-item {
  color: var(--black);
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

.book-cover {
  width: 150px;
  object-fit: cover;
  margin-right: 20px;
}

.light-button {
  padding: 5px 15px;
  font-size: 1.4rem;
  cursor: pointer;
  margin: 0 8px;
  border: 1px solid #ccc;
  background-color: transparent;
}

.book-details {
  flex: 1;
}

.book-title {
  color: var(--black);
  text-decoration: none;
  font-size: 1.7rem;
  margin-bottom: 5px;
}

.book-description {
  font-size: 1.4rem;
  margin-bottom: 12px;
  text-transform: none;
}

.price {
  color: var(--black);
  font-size: 1.4rem;
  margin-bottom: 12px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 2px;
}

.quantity-btn {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.4rem;
  cursor: pointer;
  margin: 0 8px;
  border: 1px solid #ccc;
  background-color: transparent;
}

.quantity {
  font-size: 1.4rem;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .book-item {
    flex-direction: column;
  }

  .book-cover {
    width: 110px;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .book-details {
    text-align: center;
  }

  .quantity-controls {
    justify-content: center;
  }
}
</style>

<script>
import store from "@/store";
import axios from "axios";

export default {
  name: "item-component",
  props: {
    book: {
      type: Object,
      required: true,
    },
    quantity: Number,
    itemId: String,
  },
  data() {
    return {
      msg: {
        error: "",
      },
    };
  },
  methods: {
    async decreaseQuantity(itemId, quantity) {
      const newQuantity = quantity - 1;
      if (newQuantity < 1) {
        return;
      }
      await this.updateItemQuantity(itemId, newQuantity);
    },
    async increaseQuantity(itemId, quantity) {
      const newQuantity = quantity + 1;
      if (newQuantity > 10) {
        return;
      }
      await this.updateItemQuantity(itemId, newQuantity);
    },
    async updateItemQuantity(itemId, newQuantity) {
      try {
        const token = store.state.user.jwtToken;
        const userId = store.state.user.userId;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(
          `http://localhost:5154/api/ShoppingCart/UpdateCart/${userId}/${itemId}/${newQuantity}`,
          null,
          config
        );
        this.$store.dispatch("fetchUserCart");
        return response.data;
      } catch (error) {
        console.error("Error updating cart item quantity:", error);
        throw error;
      }
    },
    deleteItem(itemId) {
      this.$store.dispatch("deleteItem", itemId);
    },
  },
};
</script>
