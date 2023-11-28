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
      <div class="error-message" v-if="msg.email && showErrors">
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
      <div class="error-message" v-if="msg.password && showErrors">
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
        login: "",
      },
      isFormValid: false,
      showErrors: false,
    };
  },
  watch: {
    "user.email": function () {
      this.validateEmail();
    },
    "user.password": function () {
      this.validatePassword();
    },
  },
  methods: {
    validateEmail() {
      if (/^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
        this.msg.email = "";
      } else {
        this.msg.email = "Invalid Email Address";
      }
    },
    validatePassword() {
      if (
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
          this.user.password
        )
      ) {
        this.msg.password = "";
      } else {
        this.msg.password =
          "Password must contain an uppercase letter, a digit, and a special character";
      }
    },
    handleSubmission() {
      this.showErrors = true;
      this.validateEmail();
      this.validatePassword();

      if (Object.values(this.msg).every((message) => message === "")) {
        this.registerUser();
        this.user = {
          email: "",
          password: "",
        };
        this.isFormValid = true;
        this.showErrors = false;
      }
    },
    async registerUser() {
      const UserData = {
        email: this.user.email,
        password: this.user.password,
      };
      console.log(UserData);

      try {
        await this.$store.dispatch("loginUser", UserData);
        await router.push("/");
      } catch (error) {
        console.error(error);
        this.msg.login =
          "Something went wrong, check credentials and try again";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "auth-style";
</style>
