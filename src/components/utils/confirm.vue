<template>
  <v-dialog v-model="dialog" persistent :max-width="options.width">
    <v-card style="border-radius:10px">
      <v-toolbar dark :color="options.color" class="my-tool pa-1" style flat>
        <v-spacer></v-spacer>
        <v-icon x-large style="font-size: 50px;">{{ options.icon }}</v-icon>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text v-show="!!message" class="title pa-4 text-xs-center">{{ message }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pt-0 pb-0">
        <v-spacer></v-spacer>
        <v-btn color="primary" flat text @click.native="agree">
          <div class="title text-xs-center">Yes</div>
        </v-btn>
        <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" text flat large @click.native="cancel">
          <div class="title text-xs-center">Cancel</div>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    options: {
      color: "primary",
      width: 490,
      icon: "warning",
      height: 500
    }
  }),
  methods: {
    open(message, options) {
      this.dialog = true;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    }
  }
};
</script>
<style lang="scss">
.my-tool {
  .v-toolbar__content {
    padding: 0 0px;
  }
}
</style>
