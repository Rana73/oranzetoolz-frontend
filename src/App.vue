<template>
  <v-app>
    <v-content>
      <router-view ></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  data() {
    return {
      //
    };
  },
  created() {},
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
@media (min-width: 576px) {
  .form-card-size {
    max-width: 5px;
  }
}
@media (min-width: 768px) {
  .form-card-size {
    max-width: 60px;
  }
}

@media (min-width: 992px) {
  .form-card-size {
    max-width: 120px;
  }
}

@media (min-width: 1200px) {
  .form-card-size {
    max-width: 300px;
  }
}

.v-list__group__header--sub-group .v-list__group__header__prepend-icon {
  padding: 0 0 0 33px;
  margin-right: 30px;
}

.CSP_BoarderStyle {
  border: 2px solid #b6b6b6;
  border-radius: 30px;
}

.chessboard {
  tbody {
    tr:nth-of-type(odd) {
      background-color: #ffe0b2;
      td:nth-of-type(even) {
        background-color: #fac16c;
      }
    }
    tr:nth-of-type(even) {
      background-color: #ffe0b2;
      td:nth-of-type(odd) {
        background-color: #fac16c;
      }
    }
  }
}

tbody {
  tr:nth-of-type(odd) {
    background-color: #e0f7fa;
  }
  tr:nth-of-type(even) {
    background-color: #b2ebf2;
  }
}

table.v-table tbody td {
  font-size: 16px !important;
  border: 1px solid black;
}

.theme--light.v-table thead th {
  background-color: #0097a7;
  color: rgb(255, 255, 255);
  font-size: 18px;
  border: 1px solid black;
}

.rowStrip {
  tbody {
    tr:nth-of-type(odd) {
      background-color: #ffe0b2;
    }
    tr:nth-of-type(even) {
      background-color: #fac16c;
    }
  }
}

.colStrip {
  tbody {
    td:nth-of-type(odd) {
      background-color: #ffe0b2;
    }
    td:nth-of-type(even) {
      background-color: #fac16c;
    }
  }
}

.v-progress-linear {
  height: 20px !important;
}
</style>