import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { StyleSheet, FlatList, Button, ScrollView, View, SafeAreaView, Text, Alert } from "react-native";
import mineReducer from "./src/Reducers";
import MineSweeperViewer from "./src/MineSweeperScreen";
let store = createStore(mineReducer);

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <MineSweeperViewer />
            </Provider>

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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#feb",
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        borderWidth: 3,
        // margin: 10,
    },
});
