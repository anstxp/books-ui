<template>
  <section>
    <div class="orders">
      <h1>Orders List</h1>
      <div v-for="order in allOrders" :key="order.id" class="order">
        <h2>Order #{{ order.id }}</h2>
        <p class="order-info">Order Date: {{ formatDate(order.orderDate) }}</p>
        <p class="order-info">User: {{ order.user.userName }}</p>
        <div class="order-items">
          <div
            v-for="item in order.orderItems"
            :key="item.id"
            class="order-item"
          >
            <img
              :src="item.book.imageUrl"
              alt="Book Cover"
              class="book-cover"
            />
            <div class="item-details">
              <h3>{{ item.book.title }}</h3>
              <p>Price: {{ item.book.price }}</p>
              <p>Quantity: {{ item.quantity }}</p>
            </div>
          </div>
        </div>
        <p class="total-amount">
          <strong>Total Amount: {{ order.total }}</strong>
        </p>
        <hr class="order-divider" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Global styles */
.orders {
  color: #333;
  margin: 20px;
}

/* Order container */
.order {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Order heading */
h1 {
  text-align: center;
  font-size: 2.6rem;
  margin-bottom: 15px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

/* Order info */
.order-info {
  margin-bottom: 5px;
}

.order-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}

.order-item {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.book-cover {
  width: 80px;
  height: auto;
  margin-right: 15px;
  border-radius: 5px;
}

.item-details {
  flex-grow: 1;
}

/* Total amount */
.total-amount {
  text-align: right;
  margin-top: 10px;
  font-size: 18px;
}

/* Order divider */
.order-divider {
  border: none;
  border-top: 1px solid #ccc;
  margin-top: 20px;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.fetchOrders();
  },
  computed: {
    allOrders() {
      return this.$store.state.orderModule.orders;
    },
  },
  methods: {
    formatDate(date) {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleString();
    },
    fetchOrders() {
      this.$store.dispatch("fetchAllOrders");
    },
  },
};
</script>
