<template>
  <SmallHeaderView :content="contentProp" :show="isEmpty"></SmallHeaderView>
  <section>
    <div class="shopping-cart">
      <div class="cart-items">
        <div class="items-list">
          <ItemComponent
            v-for="item in cartItems"
            :key="item.id"
            :book="item.book"
            :quantity="item.quantity"
            :item-id="item.id"
          >
          </ItemComponent>
        </div>
      </div>
      <div v-if="!isEmpty" class="total">
        <div class="slider">
          <h2>Cart Summary</h2>
          <p>Total: {{ total }}</p>
          <button @click="createOrder()" class="light-button">Order</button>
          <div class="button">
            <router-link :to="{ name: 'books' }" class="link"
              >my orders
            </router-link>
          </div>
          <div class="button">
            <router-link :to="{ name: 'books' }" class="link"
              >favourites
            </router-link>
          </div>
          <div class="button">
            <router-link :to="{ name: 'books' }" class="link"
              >wishlist
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="isEmpty">
        <swiper
          :slides-per-view="5"
          :space-between="1"
          navigation
          :pagination="{ clickable: true }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="book in getRandomBooks" :key="book.id">
            <BookItemComponent :book="book"></BookItemComponent>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import ItemComponent from "@/components/cart-components/item-component.vue";
import SmallHeaderView from "@/components/UI/header-view/small-header-view.vue";
import BookItemComponent from "@/components/book-components/bookSmall-item-component.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  name: "items-list",
  components: {
    SwiperSlide,
    Swiper,
    BookItemComponent,
    SmallHeaderView,
    ItemComponent,
  },
  data() {
    return {
      contentProp: [
        {
          title: "Your shopping cart",
          body: "Your basket is currently empty.\n" + "Continue browsing here.",
          image:
            "https://shop.penguin.co.uk/cdn/shop/files/Square1_2048x2048_cropped.jpg?v=1692366438",
        },
      ],
      books: this.getRandomBooks(),
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.cartModule.items;
    },
    allBooks() {
      return this.$store.state.booksModule.books;
    },
    isEmpty() {
      if (this.$store.state.cartModule.items.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    total() {
      return this.cartItems.find(
        (item) => item.shoppingCart && item.shoppingCart.total !== ""
      )?.shoppingCart.total;
    },
  },
  created() {
    this.fetchItems();
    this.fetchBooks();
  },
  methods: {
    fetchItems() {
      this.$store.dispatch("fetchUserCart");
    },
    fetchBooks() {
      this.$store.dispatch("fetchBooks");
    },
    createOrder() {
      this.$store.dispatch("createOrder");
      this.$store.dispatch("fetchUserCart");
    },
    getRandomBooks() {
      if (Array.isArray(this.allBooks) && this.allBooks.length > 4) {
        const clonedBooks = [...this.allBooks];
        const randomBooks = [];
        while (randomBooks.length < 8 && clonedBooks.length > 0) {
          const randomIndex = Math.floor(Math.random() * clonedBooks.length);
          const randomBook = clonedBooks.splice(randomIndex, 1)[0];
          randomBooks.push(randomBook);
        }
        console.log(randomBooks);
        return randomBooks;
      } else {
        if (Array.isArray(this.allBooks)) {
          console.log(this.allBooks.slice(0, 5));
          return this.allBooks.slice(0, 5);
        } else {
          console.log("No books available");
          return [];
        }
      }
    },
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>

<style>
.shopping-cart {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .cart-items {
    flex: 70%;
    flex-direction: column;
    align-items: flex-start;

    h2 {
      font-size: 24px;
      margin-bottom: 15px;
    }

    .items-list {
      border-radius: 8px;
    }

    h3 {
      font-size: 16px;
      margin-bottom: 5px;
    }

    p {
      margin: 5px 0;
      font-size: 15px;
    }
  }

  .total {
    flex: 30%;
    border-radius: 8px;

    .slider {
      position: sticky;
      top: 25px;
      width: 100%;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      transition: top 0.3s ease;
      border: 1px solid #ccc;
      margin-bottom: 5px;

      .light-button {
        padding: 5px 15px;
        font-size: 1.4rem;
        cursor: pointer;
        margin: 10px 20px 30px 8px;
        border: 1px solid #ccc;
        background-color: transparent;
      }
    }
  }

  .total .slider h2 {
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 5px;
  }

  .total .slider p {
    font-size: 1.4rem;
  }

  .button {
    width: 100%;

    .link {
      margin-top: -1px;
      font-size: 1.3rem;
      display: inline-block;
      width: 100%;
      padding: 10px;
      color: var(--black);
      text-decoration: none;
      border: 1px solid #ccc;
    }
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;

    .cart-items,
    .total {
      width: 100%;
      flex: 100%;
      align-items: center;
    }

    .total {
      .slider {
        position: relative;
        top: auto;
        width: 100%;
        padding: 15px;
        border-radius: 0;
      }
    }
  }
}
</style>
