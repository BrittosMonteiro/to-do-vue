<template>
  <v-app>
    <v-main class="blue-grey darken-4">
      <v-container>
        <v-row no-gutters justify="center">
          <span class="text-h3 font-weight-light rounded-sm pa-2 page-title"
            >TODO</span
          >
        </v-row>
        <v-row class="pa-2 mx-0">
          <v-col cols="12">
            <ListTasksComponent />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ListTasksComponent from "./components/ListTasks/ListTasks.vue";

export default {
  name: "App",
  components: {
    ListTasksComponent,
  },
  data() {
    return {};
  },
};
</script>

<style>
.v-input__slot {
  box-shadow: none !important;
}
.page-title {
  color: #fff;
  border: 3px solid #fff;
  background: linear-gradient(to right, #fff 50%, #263238 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 1s ease;
}
.page-title:hover {
  background-position: left bottom;
  color: #263238;
  transform: rotateY(360deg);
}
.item-done {
  text-decoration: line-through;
}
.v-input__control {
  color: #263238 !important;
}
.v-text-field__slot input {
  color: #fff !important;
}
.v-text-field__slot textarea {
  color: #fff !important;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot{
  background: initial !important;
}
</style>