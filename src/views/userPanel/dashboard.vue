<template>
  <v-container fluid>
    <v-layout row wrap class="mb-5">
      <v-flex xs12>
        <v-card grey darken-10 height="40">
          <marquee>
              <span style="font-weight: bold">
                Welcome To Task Management Systemm
          </span>
          </marquee>
        </v-card>
      </v-flex>
    </v-layout>
    <template v-if="ifResponse">
        <v-layout row>
        <v-flex xs6 sm12 class="my-2 mr-2">
          <v-card>
            <v-layout justify-center>
              <v-tooltip right color="blue">
                      <template v-slot:activator="{ on }">
                        <v-btn fab  color="primary" v-on="on">
                          <v-icon color="white">pending_actions</v-icon>
                        </v-btn>
                      </template>
                      <span>Pending Tasks</span>
                </v-tooltip>            
              </v-layout>   
              <v-layout justify-center>
                <b class="title-class" color="red">TOTAL PENDING TASKS: <span v-if="getAllTaskItem.hasOwnProperty('pending')"></span>{{ Object.keys(getAllTaskItem['pending']).length }}</b>
              </v-layout>        
          </v-card>
        </v-flex>
        <v-flex xs6 sm12 class="my-2 ml-2">
          <v-card>
            <v-layout justify-center>
              <v-tooltip right color="blue">
                      <template v-slot:activator="{ on }">
                        <v-btn fab  color="deep-purple" v-on="on">
                          <v-icon color="white">pending_actions</v-icon>
                        </v-btn>
                      </template>
                      <span>In Progress Tasks</span>
                </v-tooltip>            
              </v-layout>   
              <v-layout justify-center>
                <b class="title-class" color="red">TOTAL IN PROGRESS TASKS: <span v-if="getAllTaskItem.hasOwnProperty('progress')"></span>{{ Object.keys(getAllTaskItem['progress']).length }}</b>
              </v-layout>        
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row >
        <v-flex xs6 sm12 class="my-2 mr-2">
          <v-card>
            <v-layout justify-center>
              <v-tooltip right color="blue">
                      <template v-slot:activator="{ on }">
                        <v-btn fab  color="purple" v-on="on">
                          <v-icon color="white">pending_actions</v-icon>
                        </v-btn>
                      </template>
                      <span>Testing Tasks</span>
                </v-tooltip>            
              </v-layout>  
              <v-layout justify-center>
                <b class="title-class" color="red">TOTAL TESTING TASKS: <span v-if="getAllTaskItem.hasOwnProperty('testing')"></span>{{ Object.keys(getAllTaskItem['testing']).length }}</b>
              </v-layout>        
          </v-card>
        </v-flex>
        <v-flex xs6 sm12 class="my-2 ml-2">
          <v-card>
            <v-layout justify-center>
              <v-tooltip right color="blue">
                      <template v-slot:activator="{ on }">
                        <v-btn fab  color="green" v-on="on">
                          <v-icon color="white">pending_actions</v-icon>
                        </v-btn>
                      </template>
                      <span>Done Tasks</span>
                </v-tooltip>            
              </v-layout>   
              <v-layout justify-center>
                <b class="title-class" color="red">TOTAL DONE TASKS: <span v-if="getAllTaskItem.hasOwnProperty('done')"></span>{{ Object.keys(getAllTaskItem['done']).length }}</b>
              </v-layout>        
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      ifResponse:false
    };
  },
  computed: {
    getAllTaskItem() {
        return this.$store.getters.getAllTaskItem;
    }
  },
  methods: {

  },
  created() {
    this.$store.dispatch("getAllTaskItem")
    .then((response) =>{
      this.ifResponse = true;
    })
  },
  mounted() {

  },
};
</script>

<style lang="scss">

.headLineMoc{
  background-color:#3F51B5;
  color: #fff;
  padding: 10px;
}

.scroll-div {
  height: 150px;
  display: flex !important;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
}

marquee {
  font-size: 15px;
  font-weight: 100;
  font-family: sans-serif;
  padding: 10px 0;
}

.pointer {
  cursor: pointer;
}

.title-class{
  font-size: 18px;
  margin:15px auto
}
</style>
