<template>
  <div class="feedback-form-container">
    <form @submit.prevent="submitForm">
      <h3>feedback form</h3>
      <span>name</span>
      <input
        v-model="formData.name"
        type="text"
        class="box"
        placeholder="enter your name"
        required
        pattern="^[a-zA-Z]{3,}$"
      />
      <span>phone number</span>
      <input
        v-model="formData.phone"
        id="phone"
        ref="phone"
        type="tel"
        class="box"
        placeholder="enter your phone"
        required
        pattern="^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$"
      />
      <span>your message</span>
      <textarea
        v-model="formData.message"
        name="message"
        placeholder="your message here"
        class="box"
        rows="2"
        required
      ></textarea>
      <input type="submit" value="submit" class="btn" />
    </form>
  </div>
</template>

<script>
import helper from "@/mixins/form-helper";
import axios from "axios";

export default {
  mixins: [helper],
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        message: "",
      },
    };
  },
  mounted() {
    this.addPhoneMask(this.$refs.phone);
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:5154/api/Feedbacks",
          this.formData
        );
        console.log("Response:", response.data);

        this.formData.name = "";
        this.formData.phone = "";
        this.formData.message = "";
      } catch (error) {
        console.error("Error:", error);
        // Обробка помилок при відправці запиту на сервер
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "feedback-form-style";
</style>
