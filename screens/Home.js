import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    AppState
} from 'react-native';
import UserOnlineStatus from "../components/UserOnlineStatus.js"

const Home = () => {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to my App!</Text>
      <Text style={styles.subtitle}>Explore and have fun!</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        color: '#555555',
    },
});

export default Home;