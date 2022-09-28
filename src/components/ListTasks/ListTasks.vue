<template>
  <v-card rounded="sm">
    <v-card-actions>
      <v-dialog v-model="openNewTaskDialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="font-weight-regular" text v-bind="attrs" v-on="on">
            <ph-plus-circle :size="iconSize" />
            ADICIONAR
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h6 font-weight-light text-center"
              >CRIAR TAREFA</span
            >
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newTask"
              class="rounded-sm"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn icon @click="addTask">
              <ph-upload-simple :size="iconSize" color="blue" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
    <v-card-title
      class="text-h6 font-weight-light text-center"
      v-if="!tasksList.length > 0"
    >
      <p class="mb-0">Não há tarefas</p>
    </v-card-title>
    <v-list class="pa-0" v-if="tasksList.length > 0">
      <v-list-item v-for="item in tasksList" :key="item.id">
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
              color="orange"
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
        <v-btn icon class="ml-2">
          <ph-trash
            :size="iconSize"
            @click="deleteTaskFromList(item.id)"
            color="red"
          />
        </v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import {
  PhPlusCircle,
  PhCircle,
  PhCheckCircle,
  PhTrash,
  PhUploadSimple,
} from "phosphor-vue";
import {
  getTasksList,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../../service/taskService";

export default {
  name: "ListTasksComponent",
  components: {
    PhPlusCircle,
    PhCircle,
    PhCheckCircle,
    PhTrash,
    PhUploadSimple,
  },
  props: {
    update: Boolean,
  },
  data() {
    return {
      iconSize: "25px",
      tasksList: [],
      openNewTaskDialog: false,
      newTask: null,
    };
  },
  methods: {
    getTasks() {
      getTasksList()
        .then((res) => res.json())
        .then((res) => {
          this.tasksList = res;
          this.$emit("update", false);
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
      this.$emit("idTask", id);
    },
    deleteTaskFromList(id) {
      deleteTask(id)
        .then(() => {
          this.getTasks();
          this.$emit("close");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    init() {
      this.getTasks();
    },
  },
  watch: {
    update() {
      this.getTasks();
    },
  },
  created() {
    this.init();
  },
};
</script>