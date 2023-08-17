<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-semibold mb-4">Add</h2>
      <form @submit.prevent="saveEntry">
        <div class="mb-4">
          <label class="text-sm leading-6" for="name">Name:</label>
          <input v-model="name" id="name" type="text"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="mb-4">
          <label class="text-sm leading-6" for="backend">URL:</label>
          <input v-model="backend" id="backend" type="text"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <div class="relative flex gap-x-3">
          <div class="flex h-6 items-center">
            <input v-model="active" id="active" name="active" type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
          </div>
          <div class="text-sm leading-6">
            <label for="active" class="font-medium text-gray-900">Active</label>
          </div>
        </div>

        <div class="relative flex gap-x-3">
          <div class="flex h-6 items-center">
            <input v-model="enable_auth" id="enable_auth" name="enable_auth" type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
          </div>
          <div class="text-sm leading-6">
            <label for="enable_auth" class="font-medium text-gray-900">Backend with authentication</label>
          </div>
        </div>

        <div v-show="enable_auth" class="mb-4 mt-2">
          <label class="text-sm leading-6" for="auth_object">Authentication Request:</label>
          <p class="mt-1 text-sm italic leading-6 text-gray-600">know more <a class="font-medium text-indigo-500"
              target="_blank" href="https://axios-http.com/docs/intro">Axios</a></p>
          <textarea v-model="auth_object" id="auth_object" :placeholder="placeholderauth_object" rows="7"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal"
            class="border border-gray-200 bg-white-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-100 focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button type="button" @click="saveEntry"
            class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: {
    placeholderauth_object: String
  },
  computed: {
    ...mapState(['item']),
  },
  data() {
    return {
      name: '',
      backend: '',
      active: true,
      enable_auth: false,
      auth_object: '',
    };
  },
  methods: {

    ...mapActions(['saveItem']),

    ...mapMutations(['positionItem']),

    closeModal() {
      this.$emit('close');
    },
    async saveEntry() {

      this.positionItem({
        name: this.name,
        backend: this.backend,
        active: this.active,
        enable_auth: this.enable_auth,
        auth_object: this.auth_object
      })
      await this.saveItem()

      this.closeModal();
    },
  },
};
</script>