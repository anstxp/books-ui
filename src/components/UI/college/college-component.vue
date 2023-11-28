<template>
  <section>
    <div class="college-container">
      <div
        v-for="(image, index) in imageUrls"
        :key="index"
        class="image-container"
      >
        <img
          :src="image.url"
          :alt="'Image ' + (index + 1)"
          class="college-image"
        />
        <div class="bottom-left">
          <h3>discounts on books up to 50%</h3>
          <span>prepare gifts for Christmas with 'Books'</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imageUrls: [
        {
          url: "https://shop.penguin.co.uk/cdn/shop/products/Austen_2048x2048_cropped.jpg?v=1691680728",
        },
        {
          url: "https://shop.penguin.co.uk/cdn/shop/products/Penguin_Shop_Vintage_Japanese_series_all_2048x2048_cropped.jpg?v=1691678023",
        },

        {
          url: "https://shop.penguin.co.uk/cdn/shop/products/Penguin_Shop_15.10.183156_2048x2048_cropped.jpg?v=1691680791",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
$imageSize: 395px;
$marginSize: 6px;

.college-container {
  display: flex;
  flex-wrap: wrap;
  gap: $marginSize;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  color: #ffffff;
}

// Стилі для кожного зображення
.college-image {
  width: $imageSize;
  margin: $marginSize / 2; // Половина відступу для кожного боку
}

.bottom-left {
  position: absolute;
  bottom: 40px;
  left: 417px;
  background-color: rgba(240, 241, 242, 0.5);
  padding: 20px 40px;
  font-size: 1.6rem;
  color: var(--dark-color);
}

@media (max-width: 768px) {
  $imageSize: 300px;
  $marginSize: 5px;
  .college-image {
    width: $imageSize;
    margin: $marginSize / 2; // Половина відступу для кожного боку
  }

  .bottom-left {
    display: none;
  }
}
</style>
