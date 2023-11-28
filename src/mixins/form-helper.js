import Inputmask from "inputmask";
export default {
  methods: {
    addPhoneMask(phone) {
      const inputMask = new Inputmask("+380 (99) 999-99-99");
      inputMask.mask(phone);
    },
    validateName(name) {
      if (/^[a-zA-Z\s]{3,}$/.test(name)) {
        return "";
      } else {
        return "this field must contain at least three characters";
      }
    },
    validateContent(content) {
      if (/^[a-zA-Z\s]{20,}$/.test(content)) {
        return "";
      } else {
        return "this field must contain at least 20 characters";
      }
    },
    validateForEmpty(string) {
      if (string === "") {
        return "this field is required";
      } else {
        return "";
      }
    },
    validatePhone(phone) {
      if (!/^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(phone)) {
        return "Phone number is required";
      } else {
        return "";
      }
    },
    validateEmail(email) {
      if (/^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2,3})+$/.test(email)) {
        return "";
      } else {
        return "invalid email address";
      }
    },
    validatePassword(password) {
      if (
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
          password
        )
      ) {
        return "";
      } else {
        return "Password must contain an uppercase letter, a digit, and a special character";
      }
    },
    validateFile(isRequired, file) {
      if (!file && isRequired) {
        return "File is required";
      } else if (file && file.size > 10 * 1024 * 1024) {
        return "File size should not exceed 10MB";
      } else if (file) {
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          return "Only image files (jpg, jpeg, png, gif) are allowed";
        }
      }
      return "";
    },
    validateUrlHandle(url) {
      if (/^[a-zA-Z/-]+$/.test(url)) {
        return "";
      } else {
        return "invalid url handle";
      }
    },
    validateArray(array) {
      if (array.length > 0) {
        return "";
      } else {
        return "choose at least one";
      }
    },
    validateISBN(isbn) {
      if (/^\d{10}$/.test(isbn)) {
        return "";
      } else {
        return "invalid isbn";
      }
    },
  },
};
