import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

import GameState from "./GameState";
import GameStateDisplayer from "./gameStateDisplayer";
import GameStateSetterButtons from "./gameStateSetter";
import StopwatchContainer from "./StopWatch";
import Board from "./Board";
import { startTimer, stopTimer, resetTimer } from "./Actions";

const Separator = () => <View style={styles.separator} />;

class MineSweeperViewer extends Component {
    startTimerV() {
        console.log("start");
        this.props.startTimer();
    }

    render() {
        return (
            <>
                <Text>Minesweeper</Text>

                <Separator />

                <GameStateSetterButtons />
                <StopwatchContainer />
                <GameStateDisplayer />
                <Separator />
                <Board />

                <Separator />
                </>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 1,
        borderBottomColor: "#11f",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default connect(null, { startTimer, stopTimer, resetTimer })(MineSweeperViewer);
