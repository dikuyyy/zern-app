<script setup lang="ts">
import {
  Button
} from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Input
} from '@/components/ui/input'

import {
  Label
} from '@/components/ui/label'

import {useAuthStore} from "~/stores/auth";
import {AUTH_LOGIN_ENDPOINT, CUSTOMER_ENDPOINT} from "~/lib/api";

definePageMeta({
  layout: 'custom'
})

const auth = useAuthStore();
const router = useRouter();
const axios = useNuxtApp().$axios;
const httpMethod = useNuxtApp().$httpMethod


const login = () => {
  const request = axios({
    method: httpMethod.POST,
    url: AUTH_LOGIN_ENDPOINT,
    data: form
  })

  request
      .then((data: any) => {
        auth.login({
          name: data.name,
          username: data.username,
          token: data.token
        })
        router.push("/");
      })
      .catch((error: any) => {
        console.log(error);
      })
}

interface form {
  username: string;
  password: string;
}

const form: form = reactive({
  username: '',
  password: ''
})

</script>

<template>
  <div class="flex justify-center items-center h-[100vh]">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Login Page</CardTitle>
        <CardDescription>Fill your username and password to login</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label>Username</Label>
            <Input id="username" placeholder="Your Username" v-model="form.username" @keyup.enter="login"></Input>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label>Password</Label>
            <Input id="password" placeholder="Password" v-model="form.password" type="password"
                   @keyup.enter="login"></Input>
          </div>
          <Button @click="login" class="dark:bg-blue-700 dark:text-white">Login</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>