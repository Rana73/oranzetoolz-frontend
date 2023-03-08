<template>
  <div id="UserInfo">
    <v-layout row wrap v-if="user">
      <v-flex xs9 sm9 md9 layout>
        <div class="mx-4">
          <span class="headline">
            <span>{{ user.name }} <span v-if="user.name != null || user.name == ''"> - </span> {{ user.user_code }}</span>
          </span>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    }
  },
  mounted() { }
};
</script>
