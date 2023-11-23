<script>
export default {
  props: {
    faqList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <h2 class="heading-np">frequently asked questions</h2>
  <section class="faq">
    <div v-for="(item, index) in faqList" :key="index" class="faq-item">
      <div class="faq-question">{{ item.question }}</div>
      <div class="faq-answer">{{ item.answer }}</div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "faq-style";
</style>
