<template>
  <v-card rounded="sm" class="blue-grey darken-3 pa-4" elevation="10">
    <v-card-title class="pa-3 pb-0">
      <v-text-field
        solo
        placeholder="TÍTULO"
        hide-details
        class="font-weight-regular"
        v-if="task"
        v-model="task.title"
      ></v-text-field>
    </v-card-title>

    <v-card-text class="pa-3">
      <v-divider class="mb-4"></v-divider>
      <v-row no-gutters>
        <v-text-field
          dense
          outlined
          placeholder="ADICIONAR ITEM"
          class="text-body-2 rounded-sm"
          hide-details
          v-model="newItemToTask"
        ></v-text-field>
        <v-btn
          icon
          class="ml-2"
          @click="addNewItemToTask"
          :disabled="!newItemToTask"
          color="white"
        >
          <ph-list-plus :size="iconSize" />
        </v-btn>
      </v-row>
      <p
        v-if="task && !task.items.length > 0"
        class="text-subtitle-1 font-weight-light text-center ma-4 white--text"
      >
        Nenhum item
      </p>
      <div v-if="task && task.items.length > 0">
        <v-list
          v-for="(item, key) in task.items"
          :key="key"
          class="pa-0 blue-grey darken-3"
        >
          <v-list-item class="ma-0">
            <v-list-item-icon>
              <v-btn icon>
                <ph-square
                  :size="iconSize"
                  v-if="!item.status"
                  @click="changeTaskItemStatus(key, true)"
                  color="white"
                ></ph-square>
                <ph-check-square
                  :size="iconSize"
                  v-if="item.status"
                  color="green"
                  @click="changeTaskItemStatus(key, false)"
                ></ph-check-square>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-title
              class="white--text"
              :class="{ 'item-done': item.status }"
              >{{ item.content }}</v-list-item-title
            >
            <v-spacer />
            <v-list-item-icon>
              <v-btn icon color="error">
                <ph-trash :size="iconSize" @click="deleteItemFromTask(key)" />
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </div>
      <v-divider class="mt-4"></v-divider>
      <v-textarea
        solo
        class="pa-0 text-body-1 font-weight-light blue-grey darken-3 white--text"
        placeholder="INFORMAÇÕES ADICIONAIS"
        no-resize
        v-if="task"
        v-model="task.comment"
      ></v-textarea>
      <v-divider></v-divider>
    </v-card-text>
    <v-card-actions class="p-3">
      <v-btn class="rounded-sm" text color="error" @click="close()">
        FECHAR
      </v-btn>
      <v-spacer />
      <v-btn class="rounded-sm" color="success" @click="save()">SALVAR</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { PhSquare, PhCheckSquare, PhTrash, PhListPlus } from "phosphor-vue";
import {
  getTaskById,
  updateTitleAndCommentFromTaskById,
  updateTaskItemsList,
} from "../../service/taskService";

export default {
  name: "TaskDetailsComponent",
  props: {
    idTask: Number,
  },
  components: {
    PhSquare,
    PhCheckSquare,
    PhTrash,
    PhListPlus,
  },
  data() {
    return {
      iconSize: "25px",
      task: null,
      newItemToTask: null,
    };
  },
  methods: {
    getTask() {
      getTaskById(this.idTask)
        .then((res) => res.json())
        .then((res) => {
          this.task = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    save() {
      const data = {
        id: this.task.id,
        title: this.task.title,
        comment: this.task.comment,
      };
      updateTitleAndCommentFromTaskById(data)
        .then(() => {
          this.$emit("update", true);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addNewItemToTask() {
      const data = {
        content: this.newItemToTask,
        status: false,
      };
      this.task.items.unshift(data);
      this.updateTaskItems();
    },
    changeTaskItemStatus(key, status) {
      this.task.items[key].status = status;
      this.updateTaskItems();
    },
    deleteItemFromTask(key) {
      this.task.items.splice(key, 1);
      this.updateTaskItems();
    },
    updateTaskItems() {
      const data = {
        id: this.task.id,
        list: this.task.items,
      };
      updateTaskItemsList(data)
        .then(() => {
          this.newItemToTask = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    close() {
      this.$emit("close");
    },
  },
  watch: {
    idTask() {
      this.getTask();
    },
  },
  created() {
    this.getTask();
  },
};
</script>