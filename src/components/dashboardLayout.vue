<template>
  <div class="">
    <p @click="show= !show">Dashboard</p>

    <RouterView v-if="show"  />
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { onMounted, ref } from 'vue';

  useTitle("Dashboard")

  const show= ref(true)

  onMounted(()=> {
    console.log("dashboard mounted.");
  })
</script>