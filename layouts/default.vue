<script setup lang="ts">
import {
  Button
} from '~/components/ui/button'
import {useAuthStore} from "~/stores/auth";
import Dialog from '@/components/custom/Dialog.vue';

import {Icon} from '@iconify/vue'
import {useColorMode} from "@vueuse/core";

const colorMode = useColorMode()
const dialog = ref<boolean>(false);

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  dialog.value = true;
}

const logout = () => {
  auth.logout();
  router.push('/login');
}

</script>

<template>
  <div class="w-svw">
    <aside class="fixed top-0 left-0 h-svh w-[230px] dark:bg-background border-r-2 border-r-muted border-gray-50 bg-white">
      <div class="w-full border-r-muted">
        <div class="flex items-center gap-3 border-b p-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="transition-all h-8 w-8">
            <rect width="256" height="256" fill="none"></rect>
            <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
            <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
            <span class="sr-only">Website Name</span></svg>
          <div>
            <div class="font-semibold">Zern App</div>
            <div class="text-[0.8rem]">Nuxt + Shadcn</div>
          </div>
        </div>
      </div>
      <div class="h-full overflow-auto flex flex-col group mt-4">
        <nav class="grid gap-1 font-semibold mx-2">
          <a class="inline-flex whitespace-nowrap items-center bg-blue-700 text-white duration-150 cursor-pointer rounded-md">
            <div class="py-3 px-4 text-[0.9rem]">Dashboard</div>
          </a>
          <a class="inline-flex whitespace-nowrap dark:hover:text-black rounded-md items-center hover:bg-gray-100 duration-150 cursor-pointer">
            <div class="py-3 px-4 text-[0.9rem]">Apps</div>
          </a>
          <a class="inline-flex whitespace-nowrap dark:hover:text-black rounded-md items-center hover:bg-gray-100 duration-150 cursor-pointer">
            <div class="py-3 px-4 text-[0.9rem]">Charts</div>
          </a>
        </nav>
      </div>
    </aside>
    <div class="ml-[230px]">
      <div class="fixed top-0 left-[230px] dark:bg-background right-0 border-b border-r-muted py-2 px-4 bg-white">
        <div class="flex justify-between">
          <div>Welcome, <span class="text-blue-600 font-bold cursor-pointer">{{auth.name}}</span></div>
          <div class="flex items-center gap-3">
            <Icon icon="radix-icons:moon"
                  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer" @click="colorMode = 'dark'"/>
            <Icon icon="radix-icons:sun"
                  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer" @click="colorMode = 'light'"/>
            <div>
              <Button variant="ghost" size="xs" @click="handleLogout">Logout</Button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[4rem] my-4 mx-8">
        <slot/>
      </div>
    </div>
    <Dialog v-model="dialog" @submit="logout" title="Are you sure to logout?"></Dialog>
  </div>
</template>