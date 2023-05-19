<template>
  <TheCard v-if="!isLoading">
    <button v-if="!isLogin" @click.stop="login">Login</button>

    <div v-if="isLogin">
      <p>Hello {{ currentUser?.displayName }}</p>
      <p>{{ currentUser?.email }}</p>
      <img :src="currentUser?.photoURL || ''" alt="">
      <button @click="logout">Logout</button>
    </div>

    <div v-else>
      <h3>Please Login to continue</h3>
    </div>
  </TheCard>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
  import { GoogleAuthProvider, getAuth, signInWithPopup, type User, signOut, signInWithEmailLink, signInWithRedirect, signInWithCredential } from 'firebase/auth'
  import { computed, onMounted, ref, shallowRef } from 'vue';
  import { getCurrentUser} from 'vuefire';
  import { googleOneTap } from 'vue3-google-login'
import { TheCard } from 'flowbite-vue';

  const provider= new GoogleAuthProvider()
  const isLogin= ref(false)
  const isLoading= ref(true)
  const currentUser= shallowRef<User>()
  
  async function login() {
    try {
      const result= await signInWithPopup(getAuth(), provider)
      
      isLogin.value= true
      currentUser.value= result.user
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      const res= await signOut(getAuth())

      isLogin.value= false
      currentUser.value= undefined
    } catch (error) {
      console.log(error);
      
    }
  }

  onMounted(async()=> {
    const user= await getCurrentUser()
    
    if (user) {
      isLogin.value= true
      currentUser.value= user
    }

    isLoading.value= false
  })
</script>