<template>
  <q-page padding class="column content-center bg-primary text-white">
    <div
      :class="
        Platform.is.mobile
          ? 'column q-gutter-y-md q-pa-md'
          : 'column q-gutter-y-md'
      "
      :style="Platform.is.mobile ? 'width: 100%' : 'width: 40%'"
    >
      <div class="col-1 row">
        <span class="text-h6">Lists</span>
        <q-space />
        <q-btn label="Add" flat @click="addList = true" />
      </div>
      <div class="col row q-gutter-x-md">
        <div
          class="col column cursor-pointer rounded-borders bg-secondary q-pa-md"
          @click="handleList('/')"
          style="width: 30%"
        >
          <span class="text-h4">0</span>
          <span class="text-caption">All</span>
        </div>
        <div
          class="col column cursor-pointer rounded-borders bg-secondary q-pa-md"
          @click="handleList('/completed')"
          style="width: 30%"
        >
          <span class="text-h4">0</span>
          <span class="text-caption">Completed</span>
        </div>
      </div>
      <router-view />
    </div>

    <q-dialog v-model="addList" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add new list</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="newTodo"
            autofocus
            :error="addListError.error"
            :error-message="addListError.message"
            @keyup.enter="addNewListFunction"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Add List"
            @click="addNewListFunction"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { uid } from 'quasar';
import { useRouter } from 'vue-router';
import { useListStore } from 'src/stores/lists-store';
import { Platform } from 'quasar';

defineComponent({
  name: 'IndexPage',
});

const listsStore = useListStore();
const currentDate = new Date();
const newTodo = ref('');
const router = useRouter();
const addList = ref(false);
const addListError = ref({
  error: false,
  message: '',
});

const handleList = (link: string) => {
  router.push(link);
};

const addNewListFunction = () => {
  if (newTodo.value !== '') {
    addList.value = false;
    const listId: string = uid();
    const dateToday =
      currentDate.getFullYear() +
      '-' +
      currentDate.getMonth() +
      '-' +
      currentDate.getDate() +
      ' ' +
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes();

    listsStore.listsAdd({
      id: listId,
      date_time: dateToday,
      list: newTodo.value.toLocaleLowerCase(),
      status: 0,
    });

    newTodo.value = '';
  }
};
</script>
