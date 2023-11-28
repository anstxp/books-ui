import axios from "axios";
export default {
  methods: {
    handleFileUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:5154/api/Images/Upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File successfully uploaded", response);
          return response.data.filePath;
        })
        .catch((error) => {
          console.error("Error", error);
        });
    },
  },
};
