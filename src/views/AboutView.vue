<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div v-if="getCatsIsLoading">
      <p>Loading</p>
    </div>

    <div v-else>
      <form @submit.prevent="addCat">
        <div>
          <label for="catName">Cat Name</label>
          <input type="text"  id="catName" v-model="inputCatName">
        </div>

        <button>Add Cat</button>
      </form>

      <div v-for="{ name, id, createdAt }, k in catsCollection" :key="k">
        <p>{{ name }} | {{ id }}</p>
        <p v-if="createdAt">{{ createdAt.seconds }}</p>
        <button @click="updateCat(id)">Update</button>
        <button @click="deleteCat(id)">Delete</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc, } from 'firebase/firestore';
  import { computed, ref, } from 'vue';
  import { useCollection, useFirestore } from 'vuefire';

  const catsCollection= useCollection<Cats>(collection(useFirestore(), "cats"))
  const getCatsIsLoading= computed(()=> catsCollection.pending.value)
  const inputCatName= ref("")

  function getDoc(id: string) {
    return doc(getFirestore(), "cats", id)
  }

  function addCat() {
    if (!inputCatName.value) {
      return
    }

    addDoc(collection(useFirestore(), "cats"), {
      name: inputCatName.value,
      createdAt: new Date()
    })

    inputCatName.value= ""
  }
  
  function updateCat(id: string) {
    const newCatName= prompt("cat Name")

    if (!newCatName) {
      return
    }

    updateDoc(getDoc(id), {
      name: newCatName
    })
  }

  function deleteCat(id: string) {
    if (!confirm("Delete cat ?")) {
      return
    }

    deleteDoc(getDoc(id))
  }
</script>
