import {
    StatusBar
} from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Pressable,
    AppState
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import React, {
    useEffect,
    useState
} from "react"
import Signup from "./screens/Signup.js"
import Login from "./screens/Login.js"
import Home from "./screens/Home.js"
import firebase from "./firebase/main.js"
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const setUserOnline = (uid) => {
  const userDoc = firebase.firestore().collection('users').doc(uid);
  userDoc.set({ online: true }, { merge: true });
};

const setUserOffline = (uid) => {
  const userDoc = firebase.firestore().collection('users').doc(uid);
  userDoc.set({ online: false, lastSeen: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
};

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

export default function App() {
   /* const [token, setToken] = useState()
    useEffect(() => {
        if (requestUserPermission()) {
            messaging().getToken().then(token => {
                setToken(token)
            })
        } else {
            Alert.alert("Failed to et devie token")
        }

        messaging().getInitialNotification().then(async (remoteMessage) => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:', remoteMessage.notification);
            }
        });

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log('Notification caused app to open from background state:', remoteMessage.notification);
            //navigation.navigate(remoteMessage.data.type);
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('Message handled in the background!', remoteMessage);
        });

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, [])*/
    
     const [userOnline, setUserOnline] = useState(false);

  useEffect(() => {
    const authStateListener = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUserOnline(true);

        const userDoc = firebase.firestore().collection('users').doc(user.uid);
        userDoc.set({ online: true }, { merge: true });

        const appStateListener = AppState.addEventListener('change', (nextAppState) => {
          if (nextAppState === 'active') {
            setUserOnline(true);
            userDoc.set({ online: true }, { merge: true });
          } else {
            setUserOnline(false);
            userDoc.set({ online: false, lastSeen: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
          }
        });

        return () => {
          appStateListener.remove();
          setUserOnline(false);
          userDoc.set({ online: false, lastSeen: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        };
      }
    });

    return () => authStateListener();
  }, []);
    return (
        <>
          <StatusBar />
          <Signup />
        </>
    );
}