<template>
  <div>
    <v-navigation-drawer :permanent="navigation.ifPermanent" ref="drawer" app :dark="darkSwitch" :width="navigation.width"
      v-model="navigation.shown">
      <v-layout column align-center>
        <v-flex>
          <v-avatar @click="goTo('/user/dashboard')" size="90" tile class="ma-3">
            <img :src="require('@/assets/logo/logo.png')" />
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-card>
        <v-card-title class="title font-weight-light">
          <v-layout align-center justify-center row fill-height text-capitalize>Task Management System</v-layout>
        </v-card-title>
      </v-card>
      <v-list>
        <router-link to="/user/dashboard" class="nav-link navigation__list" aria-selected="false">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <router-link to="/user/profile" class="nav-link navigation__list" aria-selected="false">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
        </router-link>

        <router-link to="/user/create-task" class="nav-link navigation__list" aria-selected="false">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Create Task</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <router-link to="/user/manage-task" class="nav-link navigation__list" aria-selected="false">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Manage Tasks</v-list-tile-title>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  props: ["navigation"],
  computed: {
    direction() {
      return this.navigation.shown === false ? "Open" : "Closed";
    },
    icon_dark() {
      return this.darkSwitch === false ? "" : "white";
    },
    title_dark() {
      return this.darkSwitch === false ? "black" : "white";
    },
  },
  data: () => ({
    darkSwitch: false,
    drawer: true,
  }),
  methods: {
    goHome() {
      this.$router.push("/user/dashboard");
    },
    goTo(val) {
      this.$router.push({ path: val }).catch((err) => { });
    },
  },
};
</script>
<style type="text/css">
  .nav-link {
    text-decoration: none;
  }
  .nav-link.router-link-exact-active div {
    background-color: #d3d6e8;
  }
</style>
