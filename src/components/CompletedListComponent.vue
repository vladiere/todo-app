<template>
  <span class="text-h6 text-weight-bold">Completed Lists</span>
  <q-list bordered separator class="bg-accent">
    <div v-if="doneLists.length === 0" class="colum flex flex-center">
      <q-img src="../assets/no-task.png" width="30%" />
    </div>
    <q-virtual-scroll
      v-else
      :items="doneLists"
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
import { useListStore } from 'src/stores/lists-store';
import { computed, defineComponent } from 'vue';

defineComponent({
  name: 'CompletedList',
});

const listStore = useListStore();

const doneLists = computed(() => listStore.doneLists);

const removeList = (list_id: string) => {
  listStore.removeList(list_id);
};

const doneList = (list_id: string) => {
  listStore.doneList(list_id);
};
</script>
