import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { decreaseMine, decreaseTile, testAction, stopTimer } from "./Actions";

class GameStateDisplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.displayableFields = [];
    }

    render() {
        const context = this.context;
        return (
            <View>
                <Text style={styles.gameState} key="stateDisplayerTitle">
                    Current Game State
                </Text>
                <Text style={styles.gameState} key="stateDifficulty">
                    Difficulty: {this.props.difficulty} ({this.props.row}X{this.props.column})
                </Text>
                <Text style={styles.gameState} key="stateRemainedMines">
                    Remained mines: {this.props.remainedMines}{" "}
                </Text>
                <Text style={styles.gameState} key="stateRemainedCells">
                    Remained cells: {this.props.remainedTiles}/{this.props.clearedTiles}
                </Text>

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        row: state.row,
        column: state.column,
        difficulty: state.difficulty,
        remainedMines: state.remainedMines,
        remainedTiles: state.remainedTiles,
        valueForTest: state.valueForTest,
        nbhMatrix: state.nbhMatrix,
        clearedTiles: state.clearedTiles,
    };
};

const mapDispatchToProps = {
    decreaseMine,
    decreaseTile,
    testAction,
    stopTimer,
};

const styles = StyleSheet.create({
    gameState: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStateDisplayer);
