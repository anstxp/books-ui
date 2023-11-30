<template>
  <div class="options-bar">
    <div class="sorting-options">
      <label for="sort" class="sort-label"></label>
      <select
        id="sort"
        v-model="selectedSort"
        @change="applySort"
        class="sort-select"
      >
        <option value="" disabled selected hidden>
          Choose a sorting option
        </option>
        <option value="Title">Title</option>
        <option value="Price">Price</option>
        <option value="PageCount">Pages</option>
      </select>
    </div>

    <div class="light-button" v-if="isAdmin">
      <a @click="addBook"> Add new book </a>
    </div>

    <div class="display-icons">
      <a
        class="display-icon grid-icon"
        @click="updateDisplay('grid')"
        :class="{ active: displayType === 'grid' }"
      >
        <i class="fas fa-th"></i>
      </a>
      <a
        class="display-icon list-icon"
        @click="updateDisplay('list')"
        :class="{ active: displayType === 'list' }"
      >
        <i class="fas fa-th-list"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
.options-bar {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: -15px;
  margin-right: 20px;
  gap: 15px;
  padding: 15px;
  justify-content: flex-end;
}

.sorting-options {
  display: flex;
  align-items: center;
}

.sort-label {
  margin-right: 10px;
}

.sort-select {
  padding: 8px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
  outline: none;
  margin: 0 10px;
}

.display-icons {
  display: flex;
  align-items: center;
}

.display-icon {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
}

.display-icon:hover {
  color: #666;
}

.grid-icon,
.list-icon {
  font-size: 18px;
}

.light-button {
  padding: 8px 35px;
  border-radius: 5px;
  font-size: 1.2rem;
  border: 1px solid #ccc;
}

.light-button:hover {
  background-color: #f0f0f0; /* Зміна кольору при наведенні */
}
</style>

<script>
import router from "@/router";

export default {
  data() {
    return {
      selectedSort: "",
      displayType: "",
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.roles.includes("admin");
    },
  },
  methods: {
    addBook() {
      router.push("/create-book");
    },
    applySort() {
      this.$store.dispatch("updateSort", this.selectedSort);
    },
    updateDisplay(type) {
      this.$store.dispatch("updateDisplay", type);
    },
  },
};
</script>
