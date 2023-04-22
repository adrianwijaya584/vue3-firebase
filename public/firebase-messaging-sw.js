importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDikeNUFmfDzSOUUt5PY2rGj9G7iIPw5q0",
  authDomain: "cat-app-5c296.firebaseapp.com",
  projectId: "cat-app-5c296",
  storageBucket: "cat-app-5c296.appspot.com",
  messagingSenderId: "796887966671",
  appId: "1:796887966671:web:b107868c1097accc30e8ba",
  measurementId: "G-F4S5EMKVRK"
};

const app= firebase.initializeApp(firebaseConfig)

const isSupported= firebase.messaging.isSupported()

if (isSupported) {
  const messaging= firebase.messaging()

  messaging.onBackgroundMessage(({ notification }) => {
    const { title, body, image }= notification

    // self.registration.showNotification(title, { body: body, icon: image ?? "./favicon.ico"})
  })
}