<template>
  <div class="login-form-container">
    <form
      action="#"
      id="signup-form"
      novalidate
      @submit.prevent="handleSubmission"
    >
      <h3>update profile</h3>
      <span>username</span>
      <input
        type="text"
        name="username"
        class="box"
        placeholder="enter your username"
        v-model="user.userName"
      />
      <div class="error-message">
        {{ msg.userName }}
      </div>
      <span>first name</span>
      <input
        type="text"
        name="name"
        class="box"
        placeholder="enter your name"
        v-model="user.firstName"
      />
      <div class="error-message">
        {{ msg.name }}
      </div>
      <span>last name</span>
      <input
        type="text"
        name="surname"
        class="box"
        placeholder="enter your surname"
        v-model="user.lastName"
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
        v-model="user.phoneNumber"
      />
      <div class="error-message">
        {{ msg.phoneNumber }}
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
      <div class="error-message">
        {{ msg.file }}
      </div>
      <input type="submit" value="submit" formaction="#" class="btn" />
      <div class="error-message" v-if="msg.signup">
        {{ msg.editing }}
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
      user: {
        userName: "",
        firstName: "",
        lastName: "",
        gender: "",
        date: "",
        phoneNumber: "",
        email: "",
        genre: "",
        profilePhotoUrl: "",
      },
      msg: {
        userName: "",
        firstName: "",
        lastName: "",
        gender: "",
        date: "",
        phoneNumber: "",
        email: "",
        genre: "",
        file: "",
        editing: "",
      },
    };
  },
  watch: {
    "user.username": function () {
      this.msg.userName = this.validateName(this.user.username);
    },
    "user.name": function () {
      this.msg.firstName = this.validateName(this.user.firstName);
    },
    "user.surname": function () {
      this.msg.lastName = this.validateName(this.user.lastName);
    },
    "user.gender": function () {
      this.msg.gender = this.validateForEmpty(this.user.gender);
    },
    "user.date": function () {
      this.msg.date = this.validateForEmpty(this.user.date);
      console.log(this.msg.date);
    },
    "user.phone": function () {
      this.msg.phoneNumber = this.validatePhone(this.user.phoneNumber);
    },
    "user.email": function () {
      this.msg.email = this.validateEmail(this.user.email);
    },
    "user.file": function () {
      this.msg.file = this.validateFile(false, this.user.file);
    },
  },
  methods: {
    handleSubmission() {
      this.msg.gender = this.validateForEmpty(this.user.gender);
      if (Object.values(this.msg).every((message) => message === "")) {
        this.handleFileUpload().then(async () => {
          try {
            const response = await axios.put(
              `http://localhost:5154/api/Auth/${this.$store.state.user.userId}`,
              this.user,
              {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                },
              }
            );
            if (response.status === 200) {
              console.log("User was successfully updated");
              router.push("/user-home");
            }
          } catch (error) {
            console.log("Error updating book");
            console.error("Error updating book:", error);
            throw error;
          }
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
            this.user.profilePhotoUrl = response.data.filePath;
            resolve();
          })
          .catch((error) => {
            console.error("Помилка завантаження файлу", error);
            reject(error);
          });
      });
    },
    async getUserId(id) {
      try {
        const response = await axios.get(
          `http://localhost:5154/api/Auth/${id}`
        );
        if (response.status === 200) {
          const bookData = response.data;
          this.user = {
            userName: bookData.userName,
            email: bookData.email,
            firstName: bookData.userInfo.firstName,
            lastName: bookData.userInfo.lastName,
            phoneNumber: bookData.phoneNumber,
            date: this.reformatDate(bookData.userInfo.birthdate),
            gender: bookData.userInfo.gender,
            genre: bookData.userInfo.genre,
            profilePhotoUrl: bookData.userInfo.profilePhotoUrl,
          };
        }
      } catch (error) {
        console.log("Error receiving book");
        console.error("Error receiving book:", error);
        throw error;
      }
    },
  },
  computed: {
    token() {
      return this.$store.state.user.jwtToken;
    },
  },
  mounted() {
    this.addPhoneMask(this.$refs.phone);
    this.getUserId(this.$store.state.user.userId);
  },
};
</script>

<style scoped lang="scss">
@import "auth-style";
</style>
