<template>
  <div class="user-profile">
    <div class="profile-header">
      <img
        v-if="userInfo"
        :src="userInfo.profilePhotoUrl"
        alt="Profile Photo"
        class="profile-photo"
      />
      <h1 v-if="userInfo">{{ userInfo.firstName }} {{ userInfo.lastName }}</h1>
      <p class="contact-info"><span>Email:</span> {{ email }}</p>
      <p class="contact-info"><span>Phone:</span> {{ phoneNumber }}</p>
      <div class="buttons">
        <button @click="createBlog" class="btn-small">Create Blog</button>
        <button @click="logout" class="btn-small">Logout</button>
      </div>
    </div>
    <div class="profile-details">
      <h2>Personal Details</h2>
      <p><strong>Username:</strong> {{ userName }}</p>
      <p v-if="userInfo"><strong>Gender:</strong> {{ userInfo.gender }}</p>
      <p v-if="userInfo">
        <strong>Favorite Genre:</strong> {{ userInfo.genre }}
      </p>
      <p v-if="userInfo"><strong>Birthdate:</strong> {{ formatBirthdate }}</p>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      userInfo: {
        firstName: "",
        lastName: "",
        gender: "",
        genre: "",
        birthdate: "",
        profilePhotoUrl: "",
      },
      id: "",
      userName: "",
      email: "",
      phoneNumber: "",
      showConfirmation: false,
    };
  },
  computed: {
    formatBirthdate() {
      const date = new Date(this.userInfo.birthdate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      router.push("/sign-in");
    },
    createBlog() {
      router.push("/create-blog");
    },
    async getUserInfo() {
      const userId = this.$store.state.user.userId;
      try {
        const response = await fetch(
          `http://localhost:5154/api/Auth/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        this.userInfo = data.userInfo;
        this.id = data.id;
        this.userName = data.userName;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>
<style scoped>
.user-profile {
  max-width: 600px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 5px;
  font-size: 24px;
  color: #333;
}

.contact-info {
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
}

.contact-info span {
  font-weight: bold;
  margin-right: 5px;
}

.profile-details {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
}

.profile-details p {
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
}

.buttons {
  display: flex;
  justify-content: space-between;
  padding: 8px;
}

.buttons button {
  flex: 1;
  padding: 8px 16px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  gap: 5px;
  transition: background-color 0.3s ease;
}
</style>
