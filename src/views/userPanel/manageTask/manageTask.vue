<template>
    <v-container grid-list-md>
      <v-card color="white">
        <v-layout row wrap>
        <!-- Pending -->
        <v-flex md3 sm6>
          <div class="mx-2 my-2">
            <div class="text-center title">Pending</div>
            <div class="drag-card">
                <draggable class="list-group" tag="ul" v-model="pending" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" @change="updateTaskList">
                    <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in pending" :key="element.id">
                        <div class="item-design"> <b class="title-design">{{element.name.slice(0, 15)}}</b><br>
                            <span class="badge"><b>Start Date :</b> {{element.start_date}}</span><br>
                            <span class="badge"><b>End Date :</b>{{element.end_date}}</span>
                        </div>                      
                    </li>
                    </transition-group>
                </draggable>
            </div>
          </div>
        </v-flex>

        <!-- In Progress -->
        <v-flex md3 sm6>
          <div class="mx-2 my-2">
            <div class="text-center title">In Progress</div>
            <div class="drag-card">
                <draggable class="list-group" tag="ul" v-model="progress" v-bind="dragOptions" :move="onMove" @change="updateTaskList">
                    <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in progress" :key="element.id">
                        <div class="item-design"> <b class="title-design">{{element.name.slice(0, 15)}}</b><br>
                            <span class="badge"><b>Start Date :</b> {{element.start_date}}</span><br>
                            <span class="badge"><b>End Date :</b>{{element.end_date}}</span>
                        </div>                      
                    </li>
                    </transition-group>
                </draggable>
            </div>
          </div>
        </v-flex>
        <!-- Testing -->
        <v-flex md3 sm6>
          <div class="mx-2 my-2">
            <div class="text-center title">Testing</div>
            <div class="drag-card">
                <draggable class="list-group" tag="ul" v-model="testing" v-bind="dragOptions" :move="onMove" @change="updateTaskList">
                    <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in testing" :key="element.id">
                        <div class="item-design"> <b class="title-design">{{element.name.slice(0, 15)}}</b><br>
                            <span class="badge"><b>Start Date :</b> {{element.start_date}}</span><br>
                            <span class="badge"><b>End Date :</b>{{element.end_date}}</span>
                        </div>                      
                    </li>
                    </transition-group>
                </draggable>
            </div>
          </div>
        </v-flex>
        <!-- Done -->
        <v-flex md3 sm6>
          <div class="mx-2 my-2">
            <div class="text-center title">Done</div>
            <div class="drag-card">
                <draggable class="list-group" tag="ul" v-model="done" v-bind="dragOptions" :move="onMove" @change="updateTaskList">
                    <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in done" :key="element.id">
                        <div class="item-design"> <b class="title-design">{{element.name.slice(0, 15)}}</b><br>
                            <span class="badge"><b>Start Date :</b> {{element.start_date}}</span><br>
                            <span class="badge"><b>End Date :</b>{{element.end_date}}</span>
                        </div>                      
                    </li>
                    </transition-group>
                </draggable>
            </div>
          </div>
        </v-flex>
      </v-layout>
      </v-card>
    </v-container>
    
  </template>
  <script>
import draggable from "vuedraggable";
  export default {
    components: {
    draggable,
    },
    data() {
      return {
        dialogStatus: false,
        pending: [],
        progress: [],
        testing: [],
        done: [],
        editable: true,
        isDragging: false,
        delayedDragging: false
      }
    },
    created(){
        this.getDataFromApi();
    },
    computed: {
      getAllTaskItem() {
        return this.$store.getters.getAllTaskItem;
      },
      dragOptions() {
        return {
            animation: 0,
            group: "description",
            // disabled: !this.editable,
            ghostClass: "ghost"
        };
    }
    },
    methods: {
    getDataFromApi(){
        this.$store.dispatch("getAllTaskItem")
        .then((response) => {
          if(response.hasOwnProperty('data') && response.data.hasOwnProperty('data')){
            if(response.data.data['all'].length > 0){
                let data = response.data.data;
                this.pending  = Object.values(data['pending']);
                this.progress = Object.values(data['progress']);
                this.testing  = Object.values(data['testing']) 
                this.done     = Object.values(data['done']);
            }
          }           
        }) 
    },
    updateTaskList(){
        let updateDate = {
            pending: this.pending,
            progress: this.progress,
            testing: this.testing,
            done: this.done,
        }
        this.$store.dispatch("updateTaskList",updateDate);
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        relatedElement
      );
    }
    },
    watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  },
    mounted(){
    }
  };
  </script>
  <style scoped>
    .text-center{
        text-align:center
    }
    .title{
        font-size: 17px;
        text-transform: uppercase;
        padding-top:7px
    }
    .drag-card{
        width:100%;
        min-height: 400px;
        border:1px dotted black;
        padding:5px 5px;
        border-radius: 10px;
        margin-top: 10px;
    }
    .item-design{
        border:1px solid gray;
        border-radius: 2px;
        padding: 3px 4px;
        color:black;
        margin:4px 1px;
        /* user-select: none; */
    }
    .item-design:hover{
        cursor:all-scroll;
        background-color: #1515184a;
        color:black
    }
    .title-design{
        color:blue;
    }
    .flip-list-move {
    transition: transform 0.5s;
    }

    .no-move {
    transition: transform 0s;
    }

    .ghost {
    opacity: 0.5;
    background: #c8ebfb;
    }

    .list-group {
    min-height: 50px;
    padding-left:0px !important;
    }

    .list-group-item {
    cursor: move;
    list-style: none;
    }

    .list-group-item i {
    cursor: pointer;
    }
  </style>
  
