<template>
  <h2 class="heading-np">recent reviews</h2>
  <section class="reviews" id="reviews">
    <div class="reviews-slider" v-for="comment in comments" :key="comment.id">
      <div class="review-box">
        <div class="user-images">
          <img
            class="profile-picture"
            :src="comment.user.userInfo.profilePhotoUrl"
            alt="User Profile"
          />
        </div>
        <div class="review-details">
          <h3 class="user-name">{{ comment.user.userInfo.firstName }}</h3>
          <h4 class="book-title">
            {{ comment.book.title }} by
            <span v-for="(author, index) in comment.book.authors" :key="index">
              {{ author.fullName }}
              <span v-if="index !== comment.book.authors.length - 1">,</span>
            </span>
          </h4>
          <p class="comment-content">{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "review-item-style.scss";
</style>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>
