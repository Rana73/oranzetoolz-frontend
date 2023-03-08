<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn flat fab small color="primary" v-on="on">
          <v-badge left>
            <template v-slot:badge>
              <span>{{ notifications.length }}</span>
            </template>
            <v-icon large dark>notifications</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list two-line v-if="notifications.length">
        <v-card v-for="(item, i) in notifications" v-bind:key="i" @click="goTo(item.linkto)">
          <v-list-tile :key="item.main_title" avatar>
            <v-list-tile-avatar color="grey darken-3">
              <v-img class="elevation-1" :src="require('../assets/logo/logo.png')"></v-img>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="item.main_title">{{
                item.main_title
              }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="item.main_body">{{
                item.main_body
              }}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-if="item.date" class="font-weight-bold">{{
                getFormatedDate(item.date.toDate())
              }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-card>
      </v-list>
      <v-list two-line v-else>
        <template>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>No Notification</v-list-tile-title>
              <v-list-tile-sub-title>You don't have any notification</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-avatar color="grey darken-3">
              <v-img class="elevation-1" :src="require('../assets/logo/logo.png')"></v-img>
            </v-list-tile-avatar>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    notifications() {
      return this.$store.getters.getNotifications;
    }
  },
  created() {
    this.$store.dispatch("getNotification");
  },
  methods: {
    goTo(val) {
      this.$router.push({ path: val }).catch(err => { });
    },
    clicked() { },
    getFormatedDate(date) {
      return moment(date).format("Do MMMM, YYYY (dddd)");
    }
  }
};
</script>
