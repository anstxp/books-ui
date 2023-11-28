<script>
export default {
  name: "author-box",
};
</script>

<template>
  <div class="author-info">
    <div class="author-block">
      <img
        :src="author.authorImageUrl"
        :alt="author.fullName"
        class="author-image"
      />
      <h2>{{ author.fullName }}</h2>
      <p>{{ author.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.author-block {
  text-align: center;
  margin-bottom: 20px;
}

.author-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

h2 {
  font-size: 1.7em;
  margin-bottom: 5px;
}

p {
  color: var(--light-color);
  font-size: 1.4rem;
}
</style>
