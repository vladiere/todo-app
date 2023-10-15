<template>
  <div class="row justify-between items-center">
    <span class="text-h6 text-weight-bold">All Lists</span>
    <q-btn
      v-if="allLists.length !== 0"
      flat
      icon="mdi-delete-empty-outline"
      @click="clearLists"
    >
      <q-tooltip class="bg-secondary text-primary">Empty List</q-tooltip>
    </q-btn>
  </div>
  <q-list bordered separator class="bg-accent text-capitalize">
    <div v-if="allLists.length === 0" class="colum flex flex-center">
      <q-img src="../assets/no-task.png" width="30%" />
    </div>
    <q-virtual-scroll
      v-else
      :items="allLists"
      style="height: 60vh; max-height: calc(100% - 280px)"
      v-slot="{ item, index }"
    >
      <q-item :key="index">
        <q-item-section avatar>
          <q-icon
            color="secondary"
            :name="item.status === 0 ? 'mdi-circle-outline' : 'mdi-circle'"
          />
        </q-item-section>
        <q-item-section
          :class="item.status === 1 ? 'text-weight-thin text-strike' : ''"
          >{{ item.list }}</q-item-section
        >
        <q-item-section avatar>
          <q-btn
            flat
            no-caps
            color="secondary"
            :icon="item.status === 0 ? 'mdi-check' : 'mdi-minus-thick'"
            @click="doneList(item.id)"
          >
            <q-tooltip class="bg-secondary text-primary">
              {{ item.status === 0 ? 'Done' : 'Undone' }}
            </q-tooltip>
          </q-btn>
        </q-item-section>
        <q-item-section avatar>
          <q-btn
            flat
            no-caps
            color="secondary"
            icon="mdi-trash-can-outline"
            @click="removeList(item.id)"
          >
            <q-tooltip class="bg-secondary text-primary">
              Remove list
            </q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-list>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useListStore } from 'src/stores/lists-store';

defineComponent({
  name: 'TodayList',
});

const listsStore = useListStore();
const allLists = ref(listsStore.getAllLists());
const listLength = ref(listsStore.getAllLists().length);

const clearLists = () => {
  listsStore.clearLists();
  allLists.value = [];
};

const removeList = (list_id: string) => {
  listsStore.removeList(list_id);
};

const doneList = (list_id: string) => {
  listsStore.doneList(list_id);
};

watch(
  () => listsStore.getAllLists(),
  (newData) => {
    allLists.value = newData;
    listLength.value = listsStore.getAllLists().length;
  }
);
</script>
