<template>
    <v-container fluid>
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :getDataFromApi.sync="getDataFromApi"
      ></formDialog>
      <div>
        <v-container fluid>
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title">Your Task Lists</v-card-text>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>
              <v-spacer />
              <v-card-actions>
                <v-btn @click="newItem" color="primary" dark>Add Task</v-btn>
              </v-card-actions>
            </v-layout>
          </v-card>
          <v-data-table
            :headers="headers"
            :items="getTaskItem"
            class="elevation-1"
            :total-items="pagination.totalItems"
            :loading="loading"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
          >
            <template v-slot:items="props">
              <td>{{ props.index + 1 }}</td>
              <td class="text-xs">{{ props.item.name }}</td>             
              <td class="justify-center text-xs-center">
                <v-chip color="#388E3C" text-color="white" v-if="props.item.progress == 1" >Pending</v-chip >
                <v-chip color="#EE3B00" text-color="white" v-if="props.item.progress == 2" >In Progress</v-chip >
                <v-chip color="primary" text-color="white" v-if="props.item.progress == 3" >Testing</v-chip >
                <v-chip color="blue" text-color="white" v-if="props.item.progress == 4" >Done</v-chip >
              </td>
              <td class="text-xs text-xs-center">{{ props.item.start_date }}</td>
              <td class="text-xs text-xs-center">{{ props.item.end_date }}</td>
              <td class="justify-center text-xs-center">
                <v-item-group>
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn fab small color="primary" v-on="on">
                        <v-icon
                          @click="editItem(props.item)"
                          class="mr-0"
                          color="white"
                          >edit</v-icon
                        >
                      </v-btn>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                  <v-tooltip right color="red">
                    <template v-slot:activator="{ on }">
                      <v-btn fab small color="red" v-on="on">
                        <v-icon @click="deleteItem(props.item)" color="white"
                          >delete</v-icon
                        >
                      </v-btn>
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
                </v-item-group>
              </td>
            </template>
          </v-data-table>
        </v-container>
      </div>
    </v-container>
  </template>
  
  <script>
  import formDialog from "@/components/userPanel/manageTask/addTask.vue";
  export default {
    components: {
      formDialog
    },
    data() {
      return {
        loading: false,
        publishState: 0,
        search: "",
        sl_count: 0,
        searchParam: {},
        pagination: {
          rowsPerPage: 10,
          rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
        },
        dialog: false,
        formDialogStatus: false,
        limit: {},
        headers: [
          { text: "SL", align: "center", value: "id", width: "10", sortable: false },
          { text: "Name", value: "name",align: "left" ,sortable: false },
          { text: "Progress Status",align: "center", value: "progress", sortable: true },
          { text: "Start Date", align: "center", value: "start_date", sortable: true },
          { text: "End Date", align: "center", value: "end_date", sortable: true },
          { text: "Actions", align: "center", value: "actions", sortable: false }
        ],
        editedIndex: -1,
        editedItem: this.unSetEditedData
      };
    },
    created() {

    },
    // mounted() {
    // 	this.getDataFromApi();
    // },
    watch: {
      pagination() {
        this.getDataFromApi();
      }
    },
    computed: {
      getTaskItem() {
        return this.$store.getters.getTaskItem;
      }
    },
    methods: {
      unSetEditedData() {
        this.editedItem = {
          id: "",
          exam_code: "",
          exam_name: "",
          exam_type: "",
          session: "",
          exam_type_name: "",
          year: "",
          created_at: "",
          updated_at: "",
          deleted_at: ""
        };
      },
      setLimit() {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        this.searchParam.page = page;
        this.searchParam.limit = rowsPerPage;
        this.searchParam.sort = sortBy;
        this.searchParam.search = this.search;
      },
      getDataFromApi() {
        this.loading = true;
        this.setLimit();
        this.$store.dispatch("getTaskItem")
            .then(data => {
                this.loading = false;
                this.sl_count = data.meta.from;
                this.pagination.totalItems = data.meta.total;
            })
            .catch(error => {
                this.loading = false;
            })
            .then(always => {
                this.loading = false;
            })

      },
      dialogOpen() {
        this.formDialogStatus = true;
      },
      newItem() {
        this.unSetEditedData();
        this.dialogOpen();
      },
      editItem(item) {
        this.editedIndex = this.getTaskItem.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogOpen();
      },
      deleteItem(item) {
        const id = item.id;
        let self = this;
        this.$root
          .$confirm("Are you sure that you want to delete?")
          .then(confirm => {
            if (confirm) {
              this.$store
                .dispatch("deleteTaskItem", id)
                .then(function() {
                  self.getDataFromApi();
                })
                .catch(function(error) {
                  console.log(error);
                  self.getDataFromApi();
                });
            }
          });
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  