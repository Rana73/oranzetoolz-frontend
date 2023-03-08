import moment from "moment";
import Vue from "vue";

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("uppercase", function(value) {
  return value.toUpperCase();
});
Vue.filter("lowercase", function(value) {
  return value.toLowerCase();
});

Vue.filter("dateFormat", function(value, format = "ll") {
  if (value) {
    return moment(String(value)).format(format);
  }
});
Vue.filter("toFixed", function(value) {
  return Number(value).toFixed(2);
});
Vue.filter("getResultType", function(value) {
  var data = "";
  switch (value) {
    case "1":
      data = "Promoted";
      break;
    case "2":
      data = "Not Promoted";
      break;
    case "3":
      data = "Absent";
      break;
    case "4":
      data = "Improved";
      break;
    default:
      data = "Others";
      break;
  }
  return data;
});
