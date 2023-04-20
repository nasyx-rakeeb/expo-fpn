import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBoKfCxsS8uwm4naJWXoHjiIfcfnxTUjFY",
  authDomain: "expo-fpn.firebaseapp.com",
  projectId: "expo-fpn",
  storageBucket: "expo-fpn.appspot.com",
  messagingSenderId: "878481698655",
  appId: "1:878481698655:web:da029e2c14eb58155990ea",
  measurementId: "G-1EVJ8N8DM5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;