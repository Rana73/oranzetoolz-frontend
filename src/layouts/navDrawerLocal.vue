<template>
  <div>
    <v-navigation-drawer :permanent="navigation.ifPermanent" ref="drawer" app :dark="darkSwitch" :width="navigation.width"
      v-model="navigation.shown">
      <v-layout column align-center>
        <v-flex>
          <v-avatar @click="goHome" size="150" tile class="ma-3">
            <img :src="require('@/assets/logo/logo.png')" />
          </v-avatar>
        </v-flex>
      </v-layout>

      <v-list>
        <v-btn outline class="white--text" color="blue-grey" style="padding-left: 10px; padding-right: 20px;"
          @click="goHome">
          <v-icon left dark>home</v-icon>home
        </v-btn>

        <v-list-group v-for="(item, i) in NavbarItems" :key="i" class="ml-3">
          <template v-slot:activator>
            <v-btn outline class="white--text" color="blue-grey" style="padding-left: 10px; padding-right: 10px;">
              <v-icon left dark>{{ item.icon }}</v-icon>
              {{ item.name }}
            </v-btn>
          </template>

          <div class="localNav">
            <v-timeline align-top dense class="mx-0">
              <v-timeline-item v-for="(subitem, i) in item.children" :key="i" :icon="subitem.icon" color="blue-grey"
                fill-dot small class>
                <v-card class="elevation-1" style="padding-left: 0px; padding-right: 0px;">
                  <v-btn :to="subitem.link" round flat style="padding-left: 10px; padding-right: 10px;">
                    <span class="body-1">{{ subitem.name }}</span>
                  </v-btn>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </div>

        </v-list-group>
      </v-list>
      <div class="pl-3">
        <v-switch v-model="navigation.ifPermanent" color="black" label="Permanent"></v-switch>  
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { navbarSeeder } from "@/store/navBar";
export default {
  props: ["navigation"],
  data: () => ({
    NavbarItems: navbarSeeder,
    darkSwitch: false,
    drawer: true
  }),

  methods: {
    goHome() {
      this.$router.push("/dashboard");
    },
    goTo(val) {
      this.$router.push({ path: val }).catch(err => { });
    },
    setBorderWidth() {
      let i = this.$refs.drawer.$el.querySelector(
        ".v-navigation-drawer__border"
      );
      i.style.width = this.navigation.borderSize + "px";
      i.style.cursor = "ew-resize";
    },
    setEvents() {
      const minSize = this.navigation.borderSize;
      const el = this.$refs.drawer.$el;
      const drawerBorder = el.querySelector(".v-navigation-drawer__border");
      const vm = this;
      const direction = el.classList.contains("v-navigation-drawer--right") ? "right" : "left";
      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f =
          direction === "right"
            ? document.body.scrollWidth - e.clientX
            : e.clientX;
        el.style.width = f + "px";
      }

      drawerBorder.addEventListener("mousedown", function (e) {
          if (e.offsetX < minSize) {
            el.style.transition = "initial";
            document.addEventListener("mousemove", resize, false);
          }
        },
        false
      );

      document.addEventListener(
        "mouseup",
        function () {
          el.style.transition = "";
          vm.navigation.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, false);
        },
        false
      );
    }
  },
  computed: {
    getIcon() { },

    NavbarItems_() {
      return this.$store.getters.getNavbarItems;
    },
    NavbarItemsFromLogin() {
      return JSON.parse(localStorage.getItem("menu"));
    },
    direction() {
      return this.navigation.shown === false ? "Open" : "Closed";
    },
    icon_dark() {
      return this.darkSwitch === false ? "" : "white";
    },
    title_dark() {
      return this.darkSwitch === false ? "black" : "white";
    },
    //snackbar
    snackbar_color() {
      return this.$store.getters.getSnackbarColor;
    },
    snackbar_msg() {
      return this.$store.getters.getSnackbarMsg;
    },
    snackbar_timeout() {
      return this.$store.getters.getSnackbarTimeout;
    },
    snackbar_multiline() {
      return this.$store.getters.getSnackbarMultiline;
    },
    snackbar_vmodel: {
      get: function () {
        return this.$store.getters.getSnackbar;
      },
      set: function (val) {
        this.$store.commit("UNSET_SNACKBAR");
      }
    },

    //loading
    progress_status() {
      return this.$store.getters.getLoading;
    },
    progress_color() {
      return this.$store.getters.getLoadingColor;
    }
  },
  mounted() {
    this.setBorderWidth();
    this.setEvents();
  },
  created() {
    this.$store.dispatch("fetchNavbarItems");
  }
};
</script>

<style lang="scss">
.localNav {
  .v-timeline--dense .v-timeline-item__body {
    max-width: calc(100% - 45px) !important;
  }
}
</style>
