<script setup lang="ts">
import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
});

const session = await authClient.getSession();

function signUp() {
  return authClient.signUp.email({
    email: "test@example1.com",
    password: "test123456",
    name: "testuser",
  });
}
</script>

<template>
  <h1>hello</h1>
  <pre>{{ session }}</pre>
  <button @click="signUp">Login</button>
</template>

<style lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
}
</style>
