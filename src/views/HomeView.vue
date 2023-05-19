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

      <Button type="button" color="default">Tambah kucing</Button>
    </form>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TheCard href="#" variant="default" v-for="(v, k) in cats" :key="k" class="min-w-full">
        <div class="flex flex-col space-y-3">
          <h1 class="font-bold text-2xl">{{v.name}}</h1>
          <p class="line-clamp-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo doloribus nulla nesciunt est pariatur distinctio id ipsum? Officiis doloribus pariatur nostrum magnam, adipisci ea harum quo unde reiciendis! Omnis, amet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nobis rem fugit est consequuntur consectetur provident porro soluta nulla iusto exercitationem rerum, eligendi minus doloribus eveniet, esse illo eaque nostrum.</p>
          <Button color="red" @click.stop="openDeleteModal(v.id)">Hapus</Button>
        </div> 
      </TheCard>
    </div>

    <Modal size="lg" v-if="showModal" @close="showModal= !showModal">
      <template #header>
        <div class="flex items-center text-lg">
          Terms of Service
        </div>
      </template>

      <template #body>
        <p>Hapus data kucing ini ?</p>
      </template>

      <template #footer>
        <div class="flex justify-center space-x-3">
          <Button @click="showModal=!showModal" type="button" color="alternative">
            Kembali
          </Button>
          <Button @click.stop="deleteCat()" type="button" color="blue">
            Hapus
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {Button, Input, Modal, TheCard, Toast, useToast} from 'flowbite-vue'
import { computed, onBeforeMount, onMounted, ref, shallowRef, type DefineComponent } from 'vue';
import { addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { getCurrentUser, useCurrentUser } from "vuefire";
import {db, catsCollection} from "@/helpers/firestore"
import { useHead } from '@vueuse/head'
import { useCounterStore } from "@/stores/counter";
import { GoogleAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { googleOneTap } from 'vue3-google-login'
import { useRouter } from 'vue-router';

  const counterStore= useCounterStore()
  const router= useRouter()
  const toast= useToast()


  const catName= shallowRef("")
  const cats= ref<Cats[]>([])
  const title= shallowRef("Hello World !")
  const showModal= ref(false)
  const catId= ref("")

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

  const openDeleteModal= (id: string)=> {
    showModal.value= true
    catId.value= id
  }
  
  const deleteCat= async ()=> {

    try {
      await deleteDoc(doc(db, "cats", catId.value))

      toast.add({
        type: 'success',
        text: 'Data kucing berhasil dihapus',
        time: 3000,
      })
    } catch (error) {
      console.log(error)
    } finally {
      showModal.value= false
      catId.value= ""
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