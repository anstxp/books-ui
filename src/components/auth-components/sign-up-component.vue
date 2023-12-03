<template>
  <div class="login-form-container">
    <form
      action="#"
      id="signup-form"
      novalidate
      @submit.prevent="handleSubmission"
    >
      <h3>sign up</h3>
      <span>username</span>
      <input
        type="text"
        name="username"
        class="box"
        placeholder="enter your username"
        v-model="user.username"
      />
      <div class="error-message">
        {{ msg.username }}
      </div>
      <span>name</span>
      <input
        type="text"
        name="name"
        class="box"
        placeholder="enter your name"
        v-model="user.name"
      />
      <div class="error-message">
        {{ msg.name }}
      </div>
      <span>surname</span>
      <input
        type="text"
        name="surname"
        class="box"
        placeholder="enter your surname"
        v-model="user.surname"
      />
      <div class="error-message">
        {{ msg.surname }}
      </div>
      <span>gender</span>
      <label
        ><input
          type="radio"
          name="gender"
          v-model="user.gender"
          value="male"
        />Male</label
      >
      <label
        ><input
          type="radio"
          name="gender"
          v-model="user.gender"
          value="female"
        />Female</label
      >
      <label
        ><input
          type="radio"
          name="gender"
          v-model="user.gender"
          value="other"
        />Other</label
      >
      <div class="error-message">
        {{ msg.gender }}
      </div>
      <span>birthday date</span>
      <input
        type="date"
        v-model="user.date"
        name="date"
        class="box"
        max="2013-12-30"
      />
      <div class="error-message">
        {{ msg.date }}
      </div>
      <span>phone number</span>
      <input
        type="tel"
        id="phone"
        name="phone"
        class="box"
        ref="phone"
        placeholder="enter your phone number"
        v-model="user.phone"
      />
      <div class="error-message">
        {{ msg.phone }}
      </div>
      <span>email</span>
      <input
        type="text"
        name="email"
        class="box"
        placeholder="enter your email"
        v-model="user.email"
      />
      <div class="error-message">
        {{ msg.email }}
      </div>
      <span>password</span>
      <input
        type="password"
        name="password"
        class="box"
        placeholder="enter your password"
        v-model="user.password"
      />
      <div class="error-message">
        {{ msg.password }}
      </div>
      <span>favourite genre</span>
      <select name="genre" class="box" v-model="user.genre">
        <option value="not selected">not selected</option>
        <option value="Action and Adventure">Action and Adventure</option>
        <option value="Classics">Classics</option>
        <option value="Comic Book or Graphic Novel">
          Comic Book or Graphic Novel
        </option>
        <option value="Detective and Mystery">Detective and Mystery</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Historical Fiction">Historical Fiction</option>
        <option value="Horror">Horror</option>
      </select>
      <span>add profile picture</span>
      <input type="file" ref="fileInput" class="box" accept="image/*" />
      <div class="error-message" v-if="msg.file">
        {{ msg.file }}
      </div>
      <input type="submit" value="submit" formaction="#" class="btn" />
      <div class="error-message" v-if="msg.signup">
        {{ msg.signup }}
      </div>
      <p>already have an account? <a href="/sign-in">sign in</a></p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import helper from "@/mixins/form-helper";
import router from "@/router";

export default {
  mixins: [helper],
  data() {
    return {
      user: {},
      msg: {},
    };
  },
  watch: {
    "user.username": function () {
      this.msg.username = this.validateName(this.user.username);
    },
    "user.name": function () {
      this.msg.name = this.validateName(this.user.name);
    },
    "user.surname": function () {
      this.msg.surname = this.validateName(this.user.surname);
    },
    "user.gender": function () {
      this.msg.gender = this.validateForEmpty(this.user.gender);
    },
    "user.date": function () {
      this.msg.date = this.validateForEmpty(this.user.date);
    },
    "user.phone": function () {
      this.msg.phone = this.validatePhone(this.user.phone);
    },
    "user.email": function () {
      this.msg.email = this.validateEmail(this.user.email);
    },
    "user.password": function () {
      this.msg.password = this.validatePassword(this.user.password);
    },
  },
  methods: {
    handleSubmission() {
      if (Object.values(this.msg).every((message) => message === "")) {
        this.handleFileUpload().then(() => {
          this.registerUser();
          this.user = {
            username: "",
            name: "",
            surname: "",
            gender: "",
            date: "",
            phone: "",
            email: "",
            password: "",
            genre: "not selected",
            file: "",
          };
        });
      }
    },
    handleFileUpload() {
      return new Promise((resolve, reject) => {
        const file = this.$refs.fileInput.files[0];
        if (file == null) {
          this.user.file =
            "http://localhost:5154/Images/default.png_20231127_182052.png";
          resolve();
          return;
        }
        const formData = new FormData();
        formData.append("file", file);

        axios
          .post("http://localhost:5154/api/Images/Upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.user.file = response.data.filePath;
            console.log(this.user.file);
            console.log("Файл успішно завантажено на сервер", response);
            resolve();
          })
          .catch((error) => {
            console.error("Помилка завантаження файлу", error);
            reject(error);
          });
      });
    },
    registerUser() {
      const UserData = {
        userName: this.user.username,
        phoneNumber: this.user.phone,
        email: this.user.email,
        firstName: this.user.name,
        lastName: this.user.surname,
        birthdate: this.reformatDate(this.user.date),
        gender: this.user.gender,
        genre: this.user.genre,
        profilePhotoUrl: this.user.file,
        password: this.user.password,
      };

      axios
        .post("http://localhost:5154/api/Auth/Register", UserData)
        .then((response) => {
          console.log(response.data);
          router.push("/sign-in");
        })
        .catch((error) => {
          console.error(error);
          this.msg.signup =
            "Something went wrong, maybe you`re already registered";
        });
    },
  },
  mounted() {
    this.addPhoneMask(this.$refs.phone);
  },
};
</script>

<style scoped lang="scss">
@import "auth-style";
</style>
