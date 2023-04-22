<template>
  <div class="">
    <input type="text" v-model="myName">
    <p>Wow Main {{ myName }}</p>
    <img :src="authStore.userData.photoURL || ''" alt="">
    <p>{{ authStore.userData?.displayName }}</p>

    <form @submit.prevent="">
      <input type="text" v-model="formData.name">
      <input type="text" v-model="formData.age">
    </form>

    <p>Hello I'm {{ formData.name }} and I {{ formData.age }} y.o.</p>
  </div>
</template>

<script setup lang="ts">
  import AuthStore from '@/stores/auth'
  import { onMounted, shallowReactive, shallowRef, watch } from 'vue';

  const authStore= AuthStore()
  const myName= shallowRef('')
  const formData= shallowReactive({
    name: '',
    age: 10
  })

  watch(myName, (newData, oldData, cb)=> {    
    const timeout= setTimeout(()=> {
      console.log('my name is changed.');
    }, 300)

    cb(()=> {
      clearTimeout(timeout)
    })
  })

  onMounted(()=> {
    authStore.getUser()
  })
</script>