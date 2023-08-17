<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-semibold mb-4">Delete</h2>
        <div class="mb-4">
          <label class="text-1xl leading-6" for="nome">Deseja realmente excluir o registro <span class="text-1xl font-extrabold text-indigo-500 leading-6">{{ item.name }}?</span> </label>
        </div>

        <div class="flex justify-end">
          <button type="button" @click="closeModal"
            class="border border-gray-200 bg-white-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-100 focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button type="button" @click="deleteEntry"
            class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
            Delete
          </button>

        </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(['item']),
    // ...mapState({
    //   item: state => state.item
    // }),
  },
  data() {
    return {};
  },
  methods: {

    ...mapActions(['getItems','deleteItem']),
    
    closeModal() {
      this.$emit('close');
    },
    async deleteEntry() {

      try {
        await this.deleteItem()
      } catch (error) {
        console.log(error.message)        
      }

      this.closeModal();
    },
  },
};
</script>
