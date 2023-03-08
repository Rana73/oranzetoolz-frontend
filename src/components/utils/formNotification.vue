<template>
  <div>
    <v-alert :value="offOn" :type="type">{{ msg }}</v-alert>
  </div>
</template>

<script>
export default {
  computed: {
    type() {
      return this.$store.getters.getType;
    },
    msg() {
      return this.$store.getters.getMsg;
    },
    offOn() {
      return this.$store.getters.getOffOn;
    }
  }
};
</script>
