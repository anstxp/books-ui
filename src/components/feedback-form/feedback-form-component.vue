<script></script>

<template>
  <div class="feedback-form-container">
    <form action="">
      <h3>feedback form</h3>
      <span>name</span>
      <input
        type="text"
        name=""
        class="box"
        placeholder="enter your name"
        id=" "
      />
      <span>phone number</span>
      <input
        type="text"
        name=""
        class="box"
        placeholder="enter your phone number"
        id=""
      />
      <span>your message</span>
      <textarea
        id="message"
        name="message"
        placeholder="your message here"
        class="box"
        rows="2"
      ></textarea>
      <input type="submit" value="submit" class="btn" />
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "feedback-form-style";
</style>
