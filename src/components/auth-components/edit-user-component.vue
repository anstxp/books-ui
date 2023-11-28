<template>
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
        <div class="error-message" v-if="msg.username && showErrors">
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
        <div class="error-message" v-if="msg.name && showErrors">
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
        <div class="error-message" v-if="msg.surname && showErrors">
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
        <div class="error-message" v-if="msg.gender && showErrors">
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
        <div class="error-message" v-if="msg.date && showErrors">
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
        <div class="error-message" v-if="msg.phone && showErrors">
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
        <div class="error-message" v-if="msg.email && showErrors">
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
        <div class="error-message" v-if="msg.password && showErrors">
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
        <div class="error-message" v-if="msg.file && showErrors">
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
        checked: false,
      },
      users: [],
      msg: {
        username: "",
        name: "",
        surname: "",
        gender: "",
        date: "",
        phone: "",
        email: "",
        password: "",
        file: "",
        signup: "",
      },
      isFormValid: false,
      showErrors: false,
    };
  },
  watch: {
    "user.username": function () {
      this.validateUserName();
    },
    "user.name": function () {
      this.validateName();
    },
    "user.surname": function () {
      this.validateSurname();
    },
    "user.gender": function () {
      this.validateGender();
    },
    "user.date": function () {
      this.validateDate();
    },
    "user.phone": function () {
      this.validatePhone();
    },
    "user.email": function () {
      this.validateEmail();
    },
    "user.password": function () {
      this.validatePassword();
    },
  },
  methods: {
    validateUserName() {
      if (/^[a-zA-Z]{3,}$/.test(this.user.username)) {
        this.msg.username = "";
      } else {
        this.msg.username = "name must be at least 3 characters";
      }
    },
    validateName() {
      if (/^[a-zA-Z]{3,}$/.test(this.user.name)) {
        this.msg.name = "";
      } else {
        this.msg.name = "name must be at least 3 characters";
      }
    },
    validateSurname() {
      if (/^[a-zA-Z]{3,}$/.test(this.user.surname)) {
        this.msg.surname = "";
      } else {
        this.msg.surname = "surname must be at least 3 characters";
      }
    },
    validateGender() {
      if (this.user.gender === "") {
        this.msg.gender = "Gender is required";
      } else {
        this.msg.gender = "";
      }
    },
    validateDate() {
      if (this.user.date === "") {
        this.msg.date = "Please enter your birthdate";
      } else {
        this.msg.date = "";
      }
    },
    validatePhone() {
      if (!/^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(this.user.phone)) {
        this.msg.phone = "Phone number is required";
      } else {
        this.msg.phone = "";
      }
    },
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
    validateFile() {
      const file = this.$refs.fileInput.files[0]; // Отримуємо файл з інпута

      if (file && file.size > 10 * 1024 * 1024) {
        this.msg.file = "File size should not exceed 10MB";
      } else {
        this.msg.file = "";
      }
    },

    handleSubmission() {
      this.showErrors = true;
      this.validateName();
      this.validateSurname();
      this.validateGender();
      this.validateDate();
      this.validatePhone();
      this.validateEmail();
      this.validatePassword();
      this.validateFile();

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
          this.isFormValid = true;
          this.showErrors = false;
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
      const dateString = this.user.date;
      const date = new Date(dateString);

      const year = date.getFullYear(); // Рік (наприклад, 2013)
      const month = date.getMonth() + 1; // Місяць (у JavaScript місяці починаються з 0, тому додаємо 1)
      const day = date.getDate(); // День (наприклад, 12)

      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const UserData = {
        userName: this.user.username,
        phoneNumber: this.user.phone,
        email: this.user.email,
        firstName: this.user.name,
        lastName: this.user.surname,
        birthdate: formattedDate,
        gender: this.user.gender,
        genre: this.user.genre,
        profilePhotoUrl: this.user.file,
        password: this.user.password,
      };
      console.log(UserData);

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
    async getUserById(id) {
      try {
        const response = await axios.get(
          `http://localhost:5154/api/Books/${id}`
        );
        if (response.status === 200) {
          console.log("Book was successfully received");
          const bookData = response.data;
          this.book = {
            title: bookData.title,
            description: bookData.description,
            isbn: bookData.isbn,
            pageCount: bookData.pageCount,
            urlHadle: bookData.urlHadle,
            price: bookData.price,
            categories: bookData.categories.map((category) => category.id),
            collections: bookData.collection.map((collection) => collection.id),
            authors: bookData.authors.map((author) => author.id),
            imageUrl: bookData.imageUrl,
          };
        }
      } catch (error) {
        console.log("Error receiving book");
        console.error("Error receiving book:", error);
        throw error;
      }
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
