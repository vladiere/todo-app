import { defineStore } from 'pinia';

export const useListStore = defineStore('lists', {
  state: () => ({
    lists: [] as Array<{ id: string, date_time: string, list: string, status: number }>
  }),
  getters: {
    doneLists: (state) => state.lists.filter((item: any) => item.status === 1)
  },
  actions: {
    listsAdd(newList: { id: string, date_time: string, list: string, status: number }) {
      this.lists.push(newList);
    },
    getAllLists(): Array<{ id: string, date_time: string, list: string, status: number }> {
      return this.lists;
    },
    clearLists() {
      this.lists = [] as Array<{ id: string, date_time: string, list: string, status: number }>
    },
    searchList(search: string) {
      return this.lists.filter((item: any) => {
        item.list.toLowerCase().includes(search.toLowerCase())
      })
    },
    removeList(id: string) {
      const index = this.lists.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        this.lists.splice(index, 1);
      }
    },
    doneList(list_id: string) {
      const item = this.lists.find((item: any) => item.id === list_id)
      if (item) {
        item.status = item.status === 0 ? 1 : 0;
      }
    }
  }
});
