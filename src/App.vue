<template>
  <v-app>
    <v-main>
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
  color: #303030;
  border: 3px solid #303030;
  background: linear-gradient(to right, #303030 50%, #fff 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 1s ease;
}
.page-title:hover {
  background-position: left bottom;
  color: #fff;
}
.item-done {
  text-decoration: line-through;
}
</style>