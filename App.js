import { StatusBar } from "expo-status-bar";
import React from "react";

import { StyleSheet, Button, ScrollView, View, SafeAreaView, Text, Alert } from "react-native";

// import MineProvider from './src/MineProvider'
import MineSweeperViewer from "./src/MineSweeperScreen";
// import Game from './src/MineSweeper'

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ backgroundColor: "rgba(180, 120, 140, 0.4)" }}>
                <MineSweeperViewer />

                <Text>Open up App.js to start working on your app!</Text>
                <StatusBar style="auto" />

                <Text style={styles.title}>
                    {`
                TODO:
                    Init Mines after first click,
                    Flags,
                    Mines Count,
                    Game Reset,
                    Timer,
                    Statistics,
                    Improve UI,
                    `}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
