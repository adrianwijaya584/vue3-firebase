<template>
  <div class="">
    <!-- <p>{{ Fcmtoken }}</p> -->
    <img :src="notificationImage" alt="">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue';
  import * as messaging from "firebase/messaging"

  const Fcmtoken= ref("")
  const notificationImage= ref("")
  const router= useRouter()

  onMounted(async ()=> {
   try {
     const token= await messaging.getToken(messaging.getMessaging(), {
      vapidKey: "BJoJH6jT324JUOTn5PcpXAvJi6oSJrY2_QtqopDVFF_Knqy8TKeApTQrqihixmFex155NlWfsYXHZeKYCHir0_4"
    })

    Fcmtoken.value= token
    console.log(token);

    messaging.onMessage(messaging.getMessaging(), payload=> {
      console.log(payload);
      notificationImage.value= payload.notification?.image ?? ""
      
      alert(payload.notification?.body)
    })
   } catch (error) {
    console.log(error);
    
   } 
  })
</script>
