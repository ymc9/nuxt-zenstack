<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
useHead({ title: 'Home' })
const { $client } = useNuxtApp()
const { data: hello } = await $client.hello.useQuery({ text: 'world' })
const { data: posts } = await $client.crud.post.findMany.useQuery({})
</script>

<template>
  <div id="page-home">
    <h1>Nuxt / ZenStack</h1>
    <p>{{ hello.greeting }}</p>
    <h2>Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <p>{{ post.title }}</p>
      </li>
    </ul>
  </div>
</template>
