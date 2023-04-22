import app from "./firebaseConfig"
import {collection, getDoc, getFirestore, onSnapshot } from "firebase/firestore"

export const db= getFirestore(app)

export const catsCollection= collection(db, "cats")