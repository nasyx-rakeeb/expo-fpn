import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const UserOnlineStatus = ({ uid }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);

  useEffect(() => {
    const userRef = firebase.database().ref(`users/${uid}`);

    // Subscribe to changes in the user's data
    userRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setIsOnline(data.online);
        setLastSeen(data.lastSeen);
      }
    });

    // Unsubscribe from changes when the component unmounts
    return () => userRef.off('value');
  }, [uid]);

  const formatLastSeen = () => {
    if (!lastSeen) {
      return null;
    }

    const secondsAgo = Math.floor((Date.now() - lastSeen) / 1000);
    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 30) {
      return `${daysAgo} days ago`;
    }

    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
      return `${monthsAgo} months ago`;
    }

    const yearsAgo = Math.floor(monthsAgo / 12);
    return `${yearsAgo} years ago`;
  };

  return (
    <Text>{isOnline ? 'Online' : formatLastSeen()}</Text>
  );
};

export default UserOnlineStatus;
