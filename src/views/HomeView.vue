<template>
  <div class="">
    <p @click="()=> counterStore.increment()">{{counterStore.counter}}</p>

    <p>FCM & firestore </p>

    <Input type="text" v-model="title"/>

    <form @submit.prevent="addCat" class="mb-3 flex flex-col space-y-2 max-w-2xl">
      <div class="">
        <p>Nama Kucing</p>
        <Input type="text" v-model="catName" placeholder="Nama Kucing"/>
      </div> 

      <Button type="submit" color="default">Tambah kucing</Button>
    </form>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TheCard v-if="cats.length" href="#" variant="default" v-for="(v, k) in cats" :key="v.id" class="min-w-full">
        <div class="flex flex-col space-y-3">
          <h1 class="font-bold text-2xl">{{v.name}}</h1>
          <p class="line-clamp-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo doloribus nulla nesciunt est pariatur distinctio id ipsum? Officiis doloribus pariatur nostrum magnam, adipisci ea harum quo unde reiciendis! Omnis, amet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nobis rem fugit est consequuntur consectetur provident porro soluta nulla iusto exercitationem rerum, eligendi minus doloribus eveniet, esse illo eaque nostrum.</p>
          <Button color="red" @click.stop="deleteCat(v.id)">Hapus</Button>
        </div> 
      </TheCard>

      <TheCard v-else-if="!cats.length" v-for="_, k in 3" :key="k" class="min-w-full">
        <div class="flex flex-col space-y-3 animate-pulse">
          <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-full"></div>
        </div>
      </TheCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Button, Input, TheCard, useToast} from 'flowbite-vue'
import { computed, onBeforeMount, onMounted, ref, shallowRef, type DefineComponent } from 'vue';
import { addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { getCurrentUser } from "vuefire";
import {db, catsCollection} from "@/helpers/firestore"
import { useHead } from '@vueuse/head'
import { useCounterStore } from "@/stores/counter";
import { GoogleAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { googleOneTap } from 'vue3-google-login'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

  const counterStore= useCounterStore()
  const router= useRouter()
  const toast= useToast()

  const catName= shallowRef("")
  const cats= ref<Cats[]>([])
  const title= shallowRef("Hello World !")

  useHead({
    title: computed(()=> title.value),
  })

  async function oneTapSignin() {
    try {
      const user= await getCurrentUser()

      if (user) {
        return
      }

      const {credential}= await googleOneTap()
      const waitingToast= toast.add({
        type: 'warning',
        text: 'Checking credential...',
        time: 20000
      })
      await signInWithCredential(getAuth(), GoogleAuthProvider.credential(credential))
      
      toast.remove(waitingToast)

      router.push('/dashboard')
    } catch (error) {
      console.log('one tap sign in failed..');
      
    }
  } 

  const getCats= async ()=> {
    try {
      onSnapshot(catsCollection, doc=> {       
        const catsTemp: Cats[]= []

        catsTemp.length= 0
                
        doc.forEach(doc=> catsTemp.push(<any> {
          id: doc.id,
          ...doc.data()
        }))

        cats.value= catsTemp
      })

    } catch (error) {
      console.log(error);
    }
  }

  const addCat= async ()=> {
    if (!catName.value) {
      alert("isi nama kucing !")
    }

    try {
      addDoc(catsCollection, {
        name: catName.value
      })

      catName.value= ""
    } catch (error) {
      console.log(error);
    }
  }
  
  const deleteCat= async (id: string)=> {
    const prompt= await Swal.fire({
        icon: 'warning',
        title: 'Hapus data',
        text: 'hapus data kucing ini ?',
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonColor: '#d33'
      })

    if (!prompt.isConfirmed) {
      return
    }
    
    try {
      await deleteDoc(doc(db, "cats", id))

      toast.add({
        type: 'success',
        text: 'Data kucing berhasil dihapus',
        time: 3000,
      })
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(()=> {
    oneTapSignin()
    getCats()
  })

  onBeforeMount(()=> {
    
  })
</script>