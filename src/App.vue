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
          <v-col cols="12" sm="12" md="4">
            <ListTasksComponent
              :update="update"
              @idTask="setIdTask"
              @update="updateList"
              @close="close"
            />
          </v-col>
          <v-col cols="12" sm="12" md="8" v-if="idTask != null">
            <TaskDetailsComponent
              v-if="idTask"
              :idTask="idTask"
              @update="updateList"
              @close="close"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ListTasksComponent from "./components/ListTasks/ListTasks.vue";
import TaskDetailsComponent from "./components/TaskDetails/TaskDetails.vue";

export default {
  name: "App",

  components: {
    ListTasksComponent,
    TaskDetailsComponent,
  },

  data() {
    return {
      iconSize: "25px",
      idTask: null,
      update: false,
    };
  },

  methods: {
    setIdTask(id) {
      this.idTask = id;
    },
    close() {
      this.idTask = null;
    },
    updateList(value) {
      this.update = value;
    },
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
</style>