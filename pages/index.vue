<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import { useFindManyPost } from '../lib/hooks';

useHead({ title: 'Home' });
const { data } = useFindManyPost({});
</script>

<template>
  <div id="page-home">
    <h1>Nuxt / ZenStack</h1>
    <h2>Posts</h2>
    <ul>
      <li v-for="post in data" :key="post.id">
        <p>{{ post.title }}</p>
      </li>
    </ul>
  </div>
</template>
