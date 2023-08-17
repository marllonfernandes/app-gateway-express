<template>
    <div class="bg-zinc-50 grid gap-4 grid-cols-1">
        <div v-for="item in items" :key="item.name" class="p-4 bg-white-300 rounded shadow">

            <ModalDel v-if="isModalOpenDel" @close="isModalOpenDel = false" />
            <ModalEdit v-if="isModalOpenEdit" @close="isModalOpenEdit = false" />

            <div>
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{{ item.name }}</h5>
                    <div class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">

                        <button @click="openModal('edit', item)">
                            <i class="fa-solid fa-pencil fa-lg" style="color: rgb(99 102 241)"></i>
                        </button>

                        <button @click="openModal('del', item)" class="p-2">
                            <i class="fa-solid fa-trash-can fa-lg" style="color: rgb(239, 106, 106)"></i>
                        </button>

                    </div>

                </div>
                <div class="flow-root p-4">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    <i class="fa-solid fa-circle-chevron-right fa-lg" style="color: rgb(99 102 241)"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Backend
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {{ item.backend }}
                                    </p>
                                </div>

                            </div>
                        </li>
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <!-- <div class="flex-shrink-0">
                                    <i class="fa-solid fa-arrow-right-from-bracket fa-lg" style="color: indigo;"></i>
                                </div> -->
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Status
                                    </p>
                                    <span :class="badgeColorStatus(item.active)">
                                        {{ item.active ? "Active" : "Inactive" }}
                                    </span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Backend with authentication
                                    </p>
                                    <span :class="badgeColorenable_auth(item.enable_auth)">
                                        {{ item.enable_auth ? "Authenticated" : "Unauthenticated" }}
                                    </span>
                                </div>

                            </div>
                        </li>

                    </ul>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

import ModalDel from '@/components/ModalDel.vue';
import ModalEdit from '@/components/ModalEdit.vue';
import { mapMutations } from "vuex";

export default {
    props: {
        items: Array
    },
    components: {
        ModalDel,
        ModalEdit
    },
    data() {
        return {
            // item: {},
            isModalOpenEdit: false,
            isModalOpenDel: false,
        }
    },
    methods: {

        ...mapMutations(['positionItem']),

        openModal(type, item) {
            
            this.positionItem(item)
            
            if (type === 'edit') {
                this.isModalOpenEdit = true
            } else if (type === 'del') {
                this.isModalOpenDel = true
            }

        },
        badgeColorStatus(status) {
            let classBadge = "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20"
            if (!status) {
                classBadge = "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20"
            }
            return classBadge
        },
        badgeColorenable_auth(enable_auth) {
            let classBadge = "inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-800 ring-1 ring-inset ring-indigo-600/20"
            if (!enable_auth) {
                classBadge = "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
            }
            return classBadge
        },
    }
}
</script>