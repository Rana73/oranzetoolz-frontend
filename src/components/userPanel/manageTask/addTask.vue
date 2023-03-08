<template>
    <div class="form">
      <v-dialog v-model="dialog" max-width="80%" persistent>
        <v-card>
          <v-card color="primary" flat>
            <v-card-title>
              <span class="headline white--text">{{ formTitle }}</span>
              <v-spacer></v-spacer>
              <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close" >
                <v-icon medium>close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <formNotification />
          <v-card-text>
            <v-card flat class="pa-3 pr-3 scroll">
              <v-form>
                <v-layout row wrap align-center class="py-1">
                    <v-flex md4 sm12>
                    <v-text-field
                        v-if="getSchema"
                        name="name"
                        label="Name"
                        v-model="getSchema.name"
                        v-validate="'required|max:100'"
                        :error-messages="errors.collect('name')"
                        data-vv-name="name"
                        prepend-icon="edit"
                        clearable
                    ></v-text-field>
                </v-flex>
                <v-flex md4 sm12>
                    <v-menu v-model="start_date" :close-on-content-click="false" lazy transition="scale-transition" >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="getSchema.start_date"
                              label="Start Date"
                              prepend-icon="calendar_month"
                              readonly
                              v-on="on"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="getSchema.start_date" @input="start_date = false" ></v-date-picker>
                    </v-menu>                  
                </v-flex>
                <v-flex md4 sm12>
                    <v-menu v-model="end_date" :close-on-content-click="false" lazy transition="scale-transition" >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="getSchema.end_date"
                              label="End Date"
                              prepend-icon="calendar_month"
                              readonly
                              v-on="on"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="getSchema.end_date" @input="end_date = false" ></v-date-picker>
                    </v-menu>                  
                </v-flex>               
                </v-layout> 
                <v-layout row wrap align-center class="py-1">
                  <v-flex md6 sm12>
                      <v-textarea
                        clearable
                        v-model="getSchema.key_points"
                        clear-icon="mdi-close-circle"
                        label="Key Points"
                        prepend-icon="list"
                        rows="3"
                        v-validate="'required|max:100'"
                        :error-messages="errors.collect('key_points')"
                        data-vv-name="key_points"
                      ></v-textarea>
                  </v-flex>
                  <v-flex md6 sm12>
                      <v-textarea
                        clearable
                        v-model="getSchema.note"
                        clear-icon="mdi-close-circle"
                        label="Note"
                        prepend-icon="notes"
                        rows="3"
                      ></v-textarea>
                  </v-flex>
                </v-layout>    
                
                <v-layout row wrap align-center class="py-1">
                  <v-flex md12 sm12>
                    <label for="" style="padding-bottom:10px">Description</label><br>
                    <ckeditor
                        :editor="editor"
                        v-model="getSchema.description"
                        :config="editorConfig"
                        :contentCss="'height: 500px !important;'"
                      ></ckeditor>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout justify-center>
              <v-btn color="primary  white--text" @click.stop.prevent="validationForm()" >{{ buttonTitle }}</v-btn >
              <v-btn color="red  white--text" @click="clear">Reset</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import Vue from "vue";
  import CKEditor from "@ckeditor/ckeditor5-vue2";
  Vue.use(CKEditor);
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  import formNotification from "@/components/utils/formNotification";
  export default {
    $_veeValidate: {
      validator: "new",
    },
    components: {
      formNotification,
    },
    props: ["dialogStatus", "editedData", "indexEdited", "getDataFromApi"],
    data: () => ({
      editor: ClassicEditor,
      editorConfig: {
      },
      dialog: false,
      editedStatus: false,
      start_date:true,
      end_date:true
    }),
    created() {
    },
    mounted() {
    },
    watch: {
      dialogStatus(val) {
        this.dialog = val;
        this.$store.commit("SET_TASK_ITEM", this.editedData);
      },
      dialog(val) {
        if (!val) this.close();
      },
    },
    computed: {
      getSchema() {
        return this.$store.getters.getTaskItemSchema;
      },
      buttonTitle() {
        return this.indexEdited === -1 ? "Save" : "Update";
      },
      formTitle() {
        return this.indexEdited === -1
          ? "Add Task"
          : "Update Task";
      }
    },
    methods: {
      validationForm() {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.indexEdited === -1 ? this.save() : this.edit();
          }
        });
      },
      save() {
        let self = this;
        let item = this.getSchema;
        this.$store
          .dispatch("saveTaskData", item)
          .then((response) => {
              self.close();
              self.getDataFromApi();
          })
          .catch((error) => {
            self.getDataFromApi();
          });
      },
      edit() {
        let self = this;
        let item = this.getSchema;
        this.$store
          .dispatch("updateTaskData", item)
          .then(function() {
            try {
              self.close();
              self.getDataFromApi();
            } catch (ex) {
              console.log(ex);
            }
          })
          .catch(function(error) {
            console.log(error);
            self.getDataFromApi();
          });
      },
      clear() {
        this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
        this.$store.commit("UNSET_TASK_ITEM");
        this.$validator.reset();
      },
      close() {
        this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
        this.$emit("update:dialogStatus", false);
        setTimeout(() => {
          this.$emit("update:indexEdited", -1);
        }, 300);
        this.clear();
      },
    },
  };
  </script>
  <style scoped>
  .scroll {
    overflow-y: auto;
  }
  .ck-toolbar .ck-toolbar-more-button {
    display: none;
  }
  </style>
