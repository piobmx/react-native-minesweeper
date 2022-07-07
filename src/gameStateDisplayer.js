import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import MineContext from "./MineContext";

class GameStateDisplayer extends Component {
    static contextType = MineContext;

    constructor(props) {
        super(props);
        this.state = {};
        this.displayableFields = []
    }

    getGameStateFromContext () {
        // Row, Col, Remain Mines, Remain Empties,
        let currentGameState = {}
        const context = this.context
        const difficulty = context.difficulty
        const r = context.ROW_MAX
        const c = context.COLUMN_MAX
        const remainedMines = context.remainedMines
        const remainedSafeTilts = context.remainedSafeTilts

        currentGameState.level = difficulty
        currentGameState.row = r
        currentGameState.col = c
        currentGameState.difficulty = difficulty
        currentGameState.remainedMines = remainedMines
        currentGameState.remainedSafeTilts = remainedSafeTilts

        return  currentGameState
    }

    render() {
        const context = this.context
        return (
            <View>
                <Text style={styles.gameState}>Current Game State</Text>
                <Text style={styles.gameState}>state: {context.ROW_MAX}</Text>
                <Text style={styles.gameState}>remained mines: {context.remainedMines}</Text>
                <Text style={styles.gameState}>remained cells: {context.remainedSafeTilts}</Text>
            </View>
        );
    }
}

export default GameStateDisplayer;
