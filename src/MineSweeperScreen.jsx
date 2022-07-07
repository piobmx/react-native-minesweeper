import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";

import Cell, { cellType } from "./Cell";
import styles from "./styles";
import MineContext from "./MineContext";

import { difficulties, NEARBYS } from "./constants";
import { generatemineCoords, searchForArray, searchForNeighborMines, AddArrays } from "./utils";

import GameStateDisplayer from "./gameStateDisplayer";

const Separator = () => <View style={styles.separator} />;

const [ROWMAX, COLUMNMAX, MINENUM] = [
    difficulties.intermediate.ROW,
    difficulties.intermediate.COLUMN,
    difficulties.intermediate.MINES,
];

class GameState extends Component {
    constructor(props) {
        super(props);
    }
}

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

    oneLessMine () {
        const currentMine = this.state.remainedMines - 1;
        this.setState({
            remainedMines: currentMine,
        });
    };

    oneLessSafe () {
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

class Board extends Component {
    static contextType = MineContext;

    constructor(props) {
        super(props);
        console.log(this.context);
        let uidMatrix = Array(ROWMAX)
            .fill()
            .map(() =>
                Array(COLUMNMAX)
                    .fill()
                    .map(() => uuid.v4())
            );

        this.state = {
            uidMatrix: uidMatrix,
        };
        this.childrenCells = {};
    }

    componentDidMount() {}

    DFS(revealGraph, cellCoord) {
        const [r, c] = cellCoord;

        if (r > this.context.ROW_MAX - 1 || c > this.context.COL_MAX - 1 || r < 0 || c < 0) {
            return false;
        }
        if (revealGraph[r][c] === cellType.unrevealedMine || revealGraph[r][c] === cellType.revealedMine) {
            return false;
        }
        if (revealGraph[r][c] === cellType.revealedEmptyCell) {
            return false;
        }
        if (revealGraph[r][c] === cellType.unrevealedEmptyCell && this.context.nbhMatrix[r][c] > 0) {
            return false;
        }

        if (revealGraph[r][c] === cellType.unrevealedEmptyCell) {
            if (this.context.nbhMatrix[r][c] === 0) {
                revealGraph[r][c] = cellType.revealedEmptyCell;
                this.childrenCells[this.state.uidMatrix[r][c]].updateCellReveal(cellType.revealedEmptyCell);

                for (let i = 0; i < NEARBYS.length; i++) {
                    let [_r, _c] = AddArrays(cellCoord, NEARBYS[i]);
                    if (_r > this.context.ROW_MAX - 1 || _c > this.context.ROW_MAX - 1 || _r < 0 || _c < 0) {
                        continue;
                    }
                    if (
                        revealGraph[_r][_c] !== cellType.unrevealedMine &&
                        revealGraph[_r][_c] !== cellType.revealedMine &&
                        this.context.nbhMatrix[_r][_c] > 0
                    ) {
                        revealGraph[_r][_c] = cellType.revealedEmptyCell;
                        this.childrenCells[this.state.uidMatrix[_r][_c]].updateCellReveal(cellType.revealedEmptyCell);
                    }
                }
            }
        }
        for (let i = 0; i < NEARBYS.length; i++) {
            let nearby = AddArrays(cellCoord, NEARBYS[i]);
            let e = this.DFS(revealGraph, nearby);
            if (!e) {
                continue;
            } else {
                return;
            }
        }
    }

    changeMineMatrix(r, c) {

        let revealState = this.context.mineRevealedMatrix;
        const pressedCell = this.context.mineRevealedMatrix[r][c];

        if (pressedCell === cellType.unrevealedMine || pressedCell === cellType.revealedMine) {
            revealState[r][c] = cellType.revealedMine;
            this.childrenCells[this.state.uidMatrix[r][c]].updateCellReveal(cellType.revealedMine);
            return;
        }

        if (this.context.nbhMatrix[r][c] === 0) {
            this.DFS(revealState, [r, c]);
            return;
        }

        revealState[r][c] = cellType.revealedEmptyCell;
        this.childrenCells[this.state.uidMatrix[r][c]].updateCellReveal(cellType.revealedEmptyCell);

        console.log("reveal one");
        console.log('mine remained', this.context.remainedMines)
    }

    resetBoard() {
        this.context.resetMineMatrix();
        this.setState({});
    }

    render() {
        const context = this.context;
        console.log(context);
        return (
            <View style={styles.Board}>
                <TouchableOpacity style={styles.mineCell} onPress={this.resetBoard.bind(this)}>
                    <Text>{1}</Text>
                </TouchableOpacity>
                <GameStateDisplayer />

                {Array(context.ROW_MAX)
                    .fill(null)
                    .map((row, rowIndex) => (
                        <View style={styles.boardRow} key={rowIndex}>
                            {Array(context.COL_MAX)
                                .fill(null)
                                .map((col, colIndex) => {
                                    let key = this.state.uidMatrix[rowIndex][colIndex];
                                    return (
                                        <Cell
                                            x={rowIndex}
                                            y={colIndex}
                                            key={key}
                                            revealed={context.mineRevealedMatrix[rowIndex][colIndex]}
                                            nbh={context.nbhMatrix[rowIndex][colIndex]}
                                            onCellPress={this.changeMineMatrix.bind(this)}
                                            ref={(cellRef) => {
                                                this.childrenCells[key] = cellRef;
                                            }}
                                        />
                                    );
                                })}
                        </View>
                    ))}
            </View>
        );
    }
}

class MineSweeperViewer extends Component {
    render() {
        return (
            <View>
                <Text>Minesweeper</Text>

                <Separator />

                <View style={styles.boardRow}>
                    <TouchableOpacity style={[styles.mineCell, { position: "absolute", left: 50, top: 50 }]}>
                        <Text>{1}</Text>
                    </TouchableOpacity>
                </View>

                <Separator />
                <Text>Board</Text>

                <MineGenerator>
                    <Board />
                </MineGenerator>

                <Separator />
            </View>
        );
    }
}

export default MineSweeperViewer;
export { MineContext };
