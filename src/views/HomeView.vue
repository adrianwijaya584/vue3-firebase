<template>
  <div class="">
    <p @click="()=> counterStore.increment()">{{counterStore.counter}}</p>

    <p>FCM & firestore </p>

    <input type="text" v-model="title">

    <p>Nama Kucing</p>
    <input type="text" v-model="catName" placeholder="Nama Kucing">
    <button @click="addCat">Tambah Kucing</button>

    <div v-for="(v, k) in cats" :key="k">
      <p>{{v.name}}</p>
      <button @click.stop="deleteCat(v.id)">Hapus</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, shallowRef } from 'vue';
import { addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useFavicon } from "@vueuse/core";
import { getCurrentUser, useCurrentUser } from "vuefire";
import {db, catsCollection} from "@/helpers/firestore"
import { useHead } from '@vueuse/head'
import { useCounterStore } from "@/stores/counter";
import { GoogleAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { googleOneTap } from 'vue3-google-login'
import { useRouter } from 'vue-router';

  const counterStore= useCounterStore()
  const router= useRouter()

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
      await signInWithCredential(getAuth(), GoogleAuthProvider.credential(credential))

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
    if (!confirm("hapus data ?")) 
      return

    try {
      await deleteDoc(doc(db, "cats", id))
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(()=> {
    oneTapSignin()
    getCats()
    console.log(useCurrentUser().value);
  })

  onBeforeMount(()=> {
    
  })
</script>