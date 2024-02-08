// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getFirestore,
	collection,
	setDoc,
	getDocs,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCG6qQEqgBODnvEqEcJJ70jAHYoEZpH2vU",
    authDomain: "iot-daw.firebaseapp.com",
    databaseURL: "https://iot-daw-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "iot-daw",
    storageBucket: "iot-daw.appspot.com",
    messagingSenderId: "834059410466",
    appId: "1:834059410466:web:b23c81cfea34916b35fe7b",
    measurementId: "G-QSM3CJ4VV0"
  };

//Conectamos con la base de datos
initializeApp(firebaseConfig);
const db = getFirestore()

//CRUD

/* export const saveData = (ref,objeto) => addDoc(collection(db,ref),objeto) */
export const getDataCollection = (ref) => getDocs(collection(db,ref))
export const getDataChanged = ( ref, callBack) => onSnapshot(collection(db,ref),callBack)
export const deleteData = (id, ref) => deleteDoc(doc(db,ref,id))
export const getDataDocument = (id, ref) => getDoc(doc(db,ref,id))
export const updateData = (id, ref,objeto) => updateDoc(doc(db,ref,id),objeto)
export const getDataChanged_document = (ref, document, callBack) => 	onSnapshot(doc(db,ref, document),callBack)
export const getDataChanged_collection = ( ref, callBack) => onSnapshot(collection(db,ref),callBack)

export const saveData = (ref, objeto) => addDoc(collection(db, ref), objeto);
/**
 * Añade un documento con un ID específico a una colección en Firestore.
 * @param {string} docId - El ID del documento a añadir.
 * @param {string} collectionRef - La referencia a la colección donde se añadirá el documento.
 * @param {Object} data - Los datos a añadir como un objeto.
 * @returns {Promise} - Una promesa que se resuelve cuando se añade el documento.
 */
export const sabeID = async (docId, collectionRef, data) => {
	try {
	  const documentRef = doc(db, collectionRef, docId);
	  await setDoc(documentRef, data);
	  console.log('Documento añadido con éxito con ID personalizado.');
	} catch (error) {
	  console.error('Error al añadir el documento:', error);
	  throw error;
	}
  };
