<template>
  <div>
    <v-card
      rounded="sm"
      width="100%"
      max-width="750"
      class="ma-auto blue-grey darken-3 pa-4"
      elevation="10"
    >
      <v-card-actions>
        <v-text-field
          v-model="newTask"
          class="rounded-sm font-weight-light text-body-2"
          outlined
          dense
          hide-details
          placeholder="NOVA TAREFA"
        ></v-text-field>
        <v-btn
          icon
          @click="addTask"
          class="ml-2"
          :disabled="!newTask"
          color="white"
        >
          <ph-upload-simple :size="iconSize" />
        </v-btn>
      </v-card-actions>
      <v-card-title
        class="text-h6 font-weight-light text-center"
        v-if="!tasksList.length > 0"
      >
        <p class="mb-0">Não há tarefas</p>
      </v-card-title>
      <v-list class="pa-0 blue-grey darken-3" v-if="tasksList.length > 0">
        <v-list-item
          v-for="item in tasksList"
          :key="item.id"
          class="white--text"
        >
          <v-list-item-icon class="pa-0 mr-2">
            <v-btn icon>
              <ph-check-circle
                :size="iconSize"
                @click="updateTodoItemStatus(item.id, false)"
                v-if="item.status"
                color="green"
              />
              <ph-circle
                :size="iconSize"
                @click="updateTodoItemStatus(item.id, true)"
                v-if="!item.status"
                color="white"
              />
            </v-btn>
          </v-list-item-icon>
          <v-list-item-title
            class="font-weight-light text-subtitle-1"
            @click="openTaskDetails(item.id)"
            :class="{ 'item-done': item.status }"
            style="cursor: pointer"
          >
            {{ item.title }}
          </v-list-item-title>
          <v-spacer />
          <v-btn icon class="ml-2" color="error">
            <ph-trash :size="iconSize" @click="deleteTaskFromList(item.id)" />
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog
      v-model="dialogTaskDetails"
      width="100%"
      max-width="1000"
      scrollable
    >
      <TaskDetailsComponent
        :idTask="idTask"
        @update="getTasks"
        @close="close"
      />
    </v-dialog>
  </div>
</template>

<script>
import { PhCircle, PhCheckCircle, PhTrash, PhUploadSimple } from "phosphor-vue";
import {
  getTasksList,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../../service/taskService";
import TaskDetailsComponent from "../TaskDetails/TaskDetails.vue";

export default {
  name: "ListTasksComponent",
  components: {
    PhCircle,
    PhCheckCircle,
    PhTrash,
    PhUploadSimple,
    TaskDetailsComponent,
  },
  props: {
    update: Boolean,
  },
  data() {
    return {
      iconSize: "25px",
      tasksList: [],
      idTask: null,
      openNewTaskDialog: false,
      newTask: null,
      dialogTaskDetails: false,
    };
  },
  methods: {
    getTasks() {
      getTasksList()
        .then((res) => res.json())
        .then((res) => {
          this.tasksList = res;
          this.dialogTaskDetails = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTask() {
      const data = {
        title: this.newTask,
        comment: null,
        items: [],
        status: false,
      };
      createTask(data)
        .then(() => {
          this.getTasks();
          this.openNewTaskDialog = false;
          this.newTask = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTodoItemStatus(id, status) {
      const data = {
        id: id,
        status: status,
      };

      updateTaskStatus(data)
        .then((res) => res.json())
        .then(() => this.getTasks())
        .catch((err) => {
          console.log(err);
        });
    },
    openTaskDetails(id) {
      this.idTask = id;
      this.dialogTaskDetails = true;
    },
    deleteTaskFromList(id) {
      deleteTask(id)
        .then(() => {
          this.getTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.dialogTaskDetails = false;
    },
    init() {
      this.getTasks();
    },
  },
  created() {
    this.init();
  },
};
</script>