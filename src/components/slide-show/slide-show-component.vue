<template>
  <div class="fullscreen-gallery">
    <img :src="currentPhoto" alt="Fullscreen Image" @click="toggleSlideshow" />
    <div v-if="isSlideshowRunning" class="slideshow-overlay">
      <button @click="prevPhoto" class="slideshow-control prev">
        Previous
      </button>
      <button @click="nextPhoto" class="slideshow-control next">Next</button>
      <button @click="toggleSlideshow" class="slideshow-control stop">
        Stop Slideshow
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photos: ["slide7.webp", "slide6.jpeg", "slide2.jpeg"],
      currentPhotoIndex: 0,
      isSlideshowRunning: false,
      slideshowInterval: null,
    };
  },
  computed: {
    currentPhoto() {
      return this.photos[this.currentPhotoIndex];
    },
  },
  methods: {
    nextPhoto() {
      this.currentPhotoIndex =
        (this.currentPhotoIndex + 1) % this.photos.length;
    },
    prevPhoto() {
      this.currentPhotoIndex =
        (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
    },
    toggleSlideshow() {
      if (this.isSlideshowRunning) {
        clearInterval(this.slideshowInterval);
      } else {
        this.slideshowInterval = setInterval(() => {
          this.nextPhoto();
        }, 3000); // Час затримки між слайдами (3000 мс = 3 секунди)
      }
      this.isSlideshowRunning = !this.isSlideshowRunning;
    },
  },
  unmounted() {
    clearInterval(this.slideshowInterval);
  },
};
</script>

<style scoped>
.fullscreen-gallery {
  position: relative;
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullscreen-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
}

.slideshow-overlay {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
}

.slideshow-control {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}

.slideshow-control.stop {
  background-color: red;
  color: white;
}
</style>
