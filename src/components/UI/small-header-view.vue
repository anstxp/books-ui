<template>
  <div class="full-width-block">
    <div class="first-half">
      <div class="text-center">
        <h2>{{ currentContent.title }}</h2>
        <p>
          {{ currentContent.body }}
        </p>
      </div>
    </div>
    <div class="second-half">
      <img :src="currentContent.image" :alt="currentContent.title" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    currentContent() {
      return this.content[this.currentIndex];
    },
  },
  mounted() {
    this.startContentRotation();
  },
  methods: {
    startContentRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.content.length;
      }, 5000); // Зміна кожні 10 секунд (10000 мс)
    },
  },
};
</script>

<style scoped lang="scss">
.full-width-block {
  display: flex;
  width: 100%;
  margin-top: 15px;
}

.first-half {
  flex: 4.3;
  background-color: #f0f0f0;
  padding: 20px;
  height: 250px;
}

.text-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-left: 40px;
}

.text-center h2 {
  font-size: 2.2rem;
  color: var(--black);
}

.text-center p {
  font-size: 1.4rem;
  color: var(--black);
  text-transform: none;
}

.second-half {
  flex: 5.7;
}

.second-half img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .full-width-block {
    flex-direction: column; /* Stack elements vertically */
  }
  .first-half {
    width: 100%;
  }
  .second-half img {
    width: 100%;
    height: 202px;
    object-fit: cover;
  }
}
</style>
