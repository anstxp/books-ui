<template>
  <div class="login-form-container">
    <form
      action="#"
      id="signIn-form"
      novalidate
      @submit.prevent="handleSubmission"
    >
      <h3>sign in</h3>
      <span>username</span>
      <input
        v-model="user.email"
        type="email"
        class="box"
        placeholder="enter your email"
        id=" "
      />
      <div class="error-message" v-if="msg.email">
        {{ msg.email }}
      </div>
      <span>password</span>
      <input
        v-model="user.password"
        type="password"
        class="box"
        placeholder="enter your password"
        id=""
      />
      <div class="error-message" v-if="msg.password">
        {{ msg.password }}
      </div>
      <input type="submit" value="submit" formaction="#" class="btn" />
      <div class="error-message">
        {{ msg.login }}
      </div>
      <p>forgot password? <a href="#">click here</a></p>
      <p>don`t have an account? <a href="/sign-up">create one</a></p>
    </form>
  </div>
</template>

<script>
import helper from "@/mixins/form-helper";
import router from "@/router";

export default {
  mixins: [helper],
  data() {
    return {
      user: {
        email: "",
        password: "",
        checked: false,
      },
      users: [],
      msg: {
        email: "",
        password: "",
      },
      loginError: "",
      isFormValid: false,
      showErrors: false,
    };
  },
  watch: {
    "user.email": function () {
      this.msg.email = this.validateEmail(this.user.email);
      this.loginError = "";
    },
    "user.password": function () {
      this.msg.password = this.validatePassword(this.user.password);
      this.loginError = "";
    },
  },
  methods: {
    handleSubmission() {
      this.msg.email = this.validateEmail(this.user.email);
      this.msg.password = this.validatePassword(this.user.password);

      if (Object.values(this.msg).every((message) => message === "")) {
        this.loginUser();
        this.user = {
          email: "",
          password: "",
        };
        this.isFormValid = true;
        this.showErrors = false;
      }
    },
    async loginUser() {
      const UserData = {
        email: this.user.email,
        password: this.user.password,
      };

      try {
        await this.$store.dispatch("loginUser", UserData);
        await router.push("/");
      } catch (error) {
        console.error(error);
        this.loginError =
          "Something went wrong, check credentials and try again";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "auth-style";
</style>
