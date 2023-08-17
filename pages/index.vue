<template>
    <div class="bg-zinc-100">
        <nav class="bg-zinc-50 p-4">
            <div class="container mx-auto flex justify-between items-center">
                <img class="text-white font-semibold text-xl"
                    src="https://logodownload.org/wp-content/uploads/2019/12/totvs-logo-4.png" width="150">
            </div>
        </nav>

        <!-- Exibição da modal add -->
        <ModalAdd v-if="isModalOpen" :placeholderauth_object="JSON.stringify(exampleArea, null, 4)"
            @close="isModalOpen = false" />

        <div class="max-w-screen-md mx-auto">
            <div class="flex justify-between items-center bg-zinc p-4">
                <!-- Texto do lado esquerdo -->
                <p class="font-sans text-3xl font-extrabold text-gray-600">List of API's</p>

                <!-- Botão do lado direito -->
                <button type="button" @click="isModalOpen = true"
                    class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                    Add
                </button>
            </div>
        </div>

        <div class="container mx-auto p-12">
            <ResponsiveList :items="items" />
        </div>

    </div>
</template>

<script>

import ResponsiveList from '@/components/ResponsiveList.vue';
import ModalAdd from '@/components/ModalAdd.vue';
import { mapState, mapActions } from "vuex";

export default {
    name: 'IndexPage',
    components: {
        ResponsiveList,
        ModalAdd
    },
    computed: {
        ...mapState(['items']),
    },
    data() {
        return {
            isModalOpen: false,
            exampleArea: {
                "method": "",
                "url": "",
                "headers": {},
                "data": {}
            }
        }
    },
    async asyncData({ $axios, params, store }) {
        await store.dispatch('getItems')
    },
    methods: {
        ...mapActions(['getItems']),
    },
}
</script>