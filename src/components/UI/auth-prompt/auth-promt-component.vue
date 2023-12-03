<template>
  <section class="auth-component">
    <div class="auth-content">
      <h3>To access more posts or create one, please sign in ;)</h3>
      <p>Register or log in to gain access to all the materials</p>
      <router-link to="/sign-in" class="btn-small"
        >Sign In or Register
      </router-link>
    </div>
  </section>
</template>

<style>
.auth-component {
  margin-top: 15px;
  background: url("https://scontent-iev1-1.xx.fbcdn.net/v/t1.6435-9/48266685_10161115183225371_1099281804075991040_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=c2f564&_nc_ohc=6h6yuS9wkmgAX-PrWJY&_nc_ht=scontent-iev1-1.xx&oh=00_AfATHA5H-18Q-tY5FuLDvMNqjbQ-r8XF9g_Ax3C-e5kX5Q&oe=65907435")
    no-repeat fixed center;
  background-size: cover;
}

.auth-content {
  padding: 20px;
  border-radius: 8px;
  //background-color: rgba(255, 254, 254, 0.7);
  width: fit-content;
  background-color: rgba(255, 255, 255, 0.95);
  //padding: 20px 40px;
  color: var(--dark-color);
}

.auth-content h3 {
  font-size: 1.7rem;
  font-weight: bold;
  text-transform: none;
}

.auth-content p {
  font-size: 1.4em;
  margin: 5px 0;
  text-transform: none;
}
</style>
<script setup></script>
