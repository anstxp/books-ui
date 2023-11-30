<script>
import router from "@/router";
export default {
  computed: {
    isAdmin() {
      console.log("hi");
      return this.$store.state.user.roles.includes("admin");
    },
  },
  methods: {
    addAuthor() {
      router.push("/create-author");
    },
  },
};
</script>

<template>
  <div class="options-bar" v-if="isAdmin">
    <div class="light-button">
      <a @click="addAuthor"> Add new author </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
