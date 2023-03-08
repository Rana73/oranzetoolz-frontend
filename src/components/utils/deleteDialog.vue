<template>
  <div class="dia">
    <v-dialog v-model="ddialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Are you sure, you want to delete this item?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="close">No</v-btn>
          <v-btn color="red darken-1" flat @click="triggerDelete()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["ddialogStatus", "deleteAction"],
  name: "dia",
  data: () => ({
    ddialog: false
  }),
  watch: {
    ddialogStatus(val) {
      this.ddialog = val;
    },
    ddialog(val) {
      if (!val) this.close();
    }
  },
  methods: {
    triggerDelete() {
      this.deleteFunctionCall();
      if (this.deleteActionStatus == true) {
        this.$emit("update:deleteAction", true);
      }
    },
    close() {
      this.$emit("update:ddialogStatus", false);
    }
  }
};
</script>
