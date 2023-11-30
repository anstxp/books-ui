import axios from "axios";
export default {
  methods: {
    handleFileUpload(file) {
      return new Promise((resolve, reject) => {
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
            this.post.imageUrl = response.data.filePath;
            console.log(this.post.imageUrl);
            console.log("Файл успішно завантажено на сервер", response);
            resolve();
          })
          .catch((error) => {
            console.error("Помилка завантаження файлу", error);
            reject(error);
          });
      });
    },
  },
};
