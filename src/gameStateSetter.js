import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { testAction, switch_tile_reveal, resetTimer, resetDifficulty, restartGame } from "./Actions";
import { EASY, INTERMIDIATE, HARD } from "./constants";

class GameStateSetterButtons extends Component {
    constructor(props) {
        super(props);
    }

    setDifficultyHard() {
        const startTime = performance.now()

        var level = HARD;
        this.props.resetDifficulty(level);
        this.props.resetTimer();

        const endTime = performance.now()
        console.log("init d took", (endTime - startTime) + " milliseconds");


    }

    setDifficultyEasy() {
        const startTime = performance.now()
        var level = EASY;
        this.props.resetDifficulty(level);
        this.props.resetTimer();
        const endTime = performance.now()
        console.log("init d took", (endTime - startTime) + " milliseconds");

    }

    setDifficultyIntermediate() {
        const startTime = performance.now()

        var level = INTERMIDIATE;
        this.props.resetDifficulty(level);
        this.props.resetTimer();

        const endTime = performance.now()
        console.log("init d took", (endTime - startTime) + " milliseconds");

    }

    restartGame() {
        const startTime = performance.now()

        this.props.restartGame();
        this.props.resetTimer();
        const endTime = performance.now()
        console.log("init d took", (endTime - startTime) + " milliseconds");

    }

    render() {
        return (
            <View style={styles.settingContainer}>
                <TouchableOpacity
                    style={[styles.settingButton]}
                    onPress={this.restartGame.bind(this)}
                    key="restartButton"
                    activeOpacity={0.6}
                >
                    <Text style={styles.settingText}>Restart Game</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.settingButton]}
                    onPress={this.setDifficultyEasy.bind(this)}
                    key="easyButton"
                    activeOpacity={0.6}
                >
                    <Text style={styles.settingText}>Easy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.settingButton]}
                    onPress={this.setDifficultyIntermediate.bind(this)}
                    key="intermediateButton"
                    activeOpacity={.1}
                >
                    <Text style={styles.settingText}>Intermediate</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.settingButton}
                    onPress={this.setDifficultyHard.bind(this)}
                    key="hardButton"
                    activeOpacity={.1}
                >
                    <Text style={styles.settingText}>Hard</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        row: state.row,
        column: state.column,
        mineRevealedMatrix: state.mineRevealedMatrix,
        nbhMatrix: state.nbhMatrix,
    };
};

const styles = StyleSheet.create({
    settingContainer: {
        alignSelf: 'center',
        flexDirection: "row",
        width: "90%",
    },

    settingButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center',

        // width: 1,
        height: 30,
        borderColor: "#333",
        borderWidth: 2,
        backgroundColor: "#bef",
        padding: 2,
    },

    settingText: {
        // fontFamily: 'monospace',
        fontSize: 10
    }
});

export default connect(mapStateToProps, { switch_tile_reveal, resetTimer, testAction, resetDifficulty, restartGame })(
    GameStateSetterButtons
);
