<script>
import { ref, onMounted } from "vue";
import { discountMsg } from "@/mixins/discount-message";
export default {
  name: "DiscountComponent",
  setup() {
    const index = ref(0);
    const next = () => {
      if (index.value === discountMsg.length - 1) {
        index.value = 0;
        return;
      }
      index.value++;
    };

    onMounted(() => {
      setInterval(next, 7000);
    }); // Change image every 7 seconds

    return {
      index,
      discountMsg,
    };
  },
};
</script>

<template>
  <div class="discountComponent">
    <h3>
      📖
      <span>{{ discountMsg[index][0].toUpperCase() }}</span>
      {{ discountMsg[index][1].toUpperCase() }} 📖
    </h3>
  </div>
</template>

<style scoped lang="scss">
@import "discount-style.css";
</style>
