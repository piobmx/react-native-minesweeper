import React, { Component } from "react";
import uuid from "react-native-uuid";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";


import { difficultyData, NEARBYS } from "./constants";
import { generatemineCoords, searchForArray, searchForNeighborMines, AddArrays } from "./utils";
import Cell, { cellType } from "./Cell";
import MineContext from "./MineContext";
import styles from "./styles";

const [ROWMAX, COLUMNMAX, MINENUM] = [
    difficultyData.intermediate.ROW,
    difficultyData.intermediate.COLUMN,
    difficultyData.intermediate.MINES,
];

class MineGenerator extends Component {
    constructor(props) {
        super(props);
        const mineCoords = this.createMines(MINENUM);
        let nbhMatrix, mineRevealedMatrix;
        [nbhMatrix, mineRevealedMatrix] = this.initCount(ROWMAX, COLUMNMAX, mineCoords);
        console.log("init", mineCoords);

        this.state = {
            // Difficulty: props.difficulty,
            Difficulty: "intermidiant",
            ROW_MAX: ROWMAX,
            COL_MAX: COLUMNMAX,
            MINE_NUM: MINENUM,

            mineCoords: mineCoords,
            nbhMatrix: nbhMatrix,
            mineRevealedMatrix: mineRevealedMatrix,

            remainedMines: MINENUM,
            remainedSafeTilts: ROWMAX * COLUMNMAX - MINENUM,
        };
    }

    oneLessMine() {
        const currentMine = this.state.remainedMines - 1;
        this.setState({
            remainedMines: currentMine,
        });
    }

    oneLessSafe() {
        const currentSafeTilts = this.state.remainedSafeTilts - 1;
        this.setState({
            remainedSafeTilts: currentSafeTilts,
        });
    }

    componentDidMount() {
        console.log(this.state.mineRevealedMatrix);
    }

    createMines(mineNum) {
        let mineCoords = [];
        for (let i = 0; i < mineNum; i++) {
            let mine = generatemineCoords(ROWMAX, COLUMNMAX);
            let flag = 0;
            for (let j = 0; j < mineCoords.length; j++) {
                if (mine[0] === mineCoords[j][0] && mine[1] === mineCoords[j][1]) {
                    i -= 1;
                    flag = 1;
                }
            }
            if (flag == 0) {
                mineCoords.push(mine);
            }
        }
        return mineCoords;
    }

    initCount(row, col, mines) {
        let nbhMatrix = Array(row)
            .fill()
            .map(() => Array(col).fill(null));
        let mineRevealedMatrix = Array(row)
            .fill()
            .map(() => Array(col).fill(null));

        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                let currentCoord = [r, c];
                const [neighbours, nearbyCoords] = searchForNeighborMines(mines, currentCoord);
                for (let m = 0; m < mines.length; m++) {
                    if (mines[m][0] === r && mines[m][1] === c) {
                        neighbours = -1;
                    }
                }

                neighbours === -1
                    ? (mineRevealedMatrix[r][c] = cellType.unrevealedMine)
                    : (mineRevealedMatrix[r][c] = cellType.unrevealedEmptyCell);
                nbhMatrix[r][c] = neighbours;
            }
        }
        return [nbhMatrix, mineRevealedMatrix];
    }

    resetMineMatrix() {
        const mineCoords = this.createMines(MINENUM);
        let nbhMatrix, mineRevealedMatrix;
        [nbhMatrix, mineRevealedMatrix] = this.initCount(ROWMAX, COLUMNMAX, mineCoords);
        console.log("before", this.state.nbhMatrix);
        this.setState({
            mineCoords: mineCoords,
            nbhMatrix: nbhMatrix,
            mineRevealedMatrix: mineRevealedMatrix,
        });
        console.log("after", this.state.nbhMatrix);
        console.log("RESET", mineCoords);
    }

    render() {
        return (
            <MineContext.Provider
                className="Provider"
                value={{
                    ...this.state,
                    oneLessMine: this.oneLessMine.bind(this),
                    oneLessSafe: this.oneLessSafe.bind(this),
                }}
            >
                {this.props.children}
            </MineContext.Provider>
        );
    }
}

export default MineGenerator;
