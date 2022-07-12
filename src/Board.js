import React, { Component } from "react";
import { StyleSheet } from "react-native";

import uuid from "react-native-uuid";
import { View } from "react-native";
import { connect } from "react-redux";

import { NEARBYS } from "./constants";
import Cell, { cellType } from "./Cell";
import { AddArrays } from "./utils";
import { decreaseMine, decreaseTile, testAction, switch_tile_reveal, startTimer, stopTimer } from "./Actions";

class Board extends Component {
    constructor(props) {
        super(props);
        let uidMatrix = Array(99)
            .fill()
            .map(() =>
                Array(99)
                    .fill()
                    .map(() => uuid.v4())
            );

        this.state = {
            uidMatrix: uidMatrix,
        };
        this.childrenCells = {};
    }

    componentDidMount() {
        // console.log("(componentDidMount) board props", this.props);
    }

    checkValidCell = (r, c) => {
        if (r > this.props.row - 1 || c > this.props.column - 1 || r < 0 || c < 0) {
            return false;
        }
        return true;
    };

    DFS(cellCoord, DFSStack) {
        const [r, c] = cellCoord;

        if (
            !this.checkValidCell(r, c) ||
            this.props.mineRevealedMatrix[r][c] !== cellType.unrevealedEmptyCell ||
            (this.props.mineRevealedMatrix[r][c] === cellType.unrevealedEmptyCell && this.props.nbhMatrix[r][c] > 0)
        ) {
            return false;
        }

        if (this.props.mineRevealedMatrix[r][c] === cellType.unrevealedEmptyCell && this.props.nbhMatrix[r][c] === 0) {
            const entry = DFSStack.find((cell) => cell[0] === r && cell[1] === c);

            if (!entry) {
                DFSStack.push([r, c]);
            }

            for (let i = 0; i < NEARBYS.length; i++) {
                let [_r, _c] = AddArrays(cellCoord, NEARBYS[i]);
                if (!this.checkValidCell(_r, _c)) {
                    continue;
                }
                const _entry = DFSStack.find((cell) => cell[0] === _r && cell[1] === _c);

                if (
                    !_entry &&
                    this.props.nbhMatrix[_r][_c] > 0 &&
                    this.props.mineRevealedMatrix[_r][_c] === cellType.unrevealedEmptyCell
                ) {
                    DFSStack.push([_r, _c]);
                }
            }
        }

        for (let i = 0; i < NEARBYS.length; i++) {
            let nearby = AddArrays(cellCoord, NEARBYS[i]);
            const entryx = DFSStack.find((cell) => cell[0] === nearby[0] && cell[1] === nearby[1]);
            if (entryx) {
                continue;
            }

            let e = this.DFS(nearby, DFSStack);

            if (e) {
                return;
            }
        }
    }

    updateMineMatrix(r, c) {
        const startTime = performance.now();
        const pressedCell = this.props.mineRevealedMatrix[r][c];

        if (pressedCell === cellType.unrevealedMine || pressedCell === cellType.revealedMine) {
            if (this.props.mineRevealedMatrix[r][c] !== cellType.revealedMine) {
                this.props.switch_tile_reveal([[r, c]]);
                this.props.decreaseMine();
            }
            if (this.props.gameFinished) {
                this.props.stopTimer();
            }

            const _endTime = performance.now();
            var timeDiff = (_endTime - startTime) / 1000; //in ms
            console.log("Normal render 1 took %f. ", timeDiff);
            return;
        }

        if (this.props.nbhMatrix[r][c] === 0) {
            const _startTime = performance.now();

            let DFSStack = [];

            this.DFS([r, c], DFSStack);
            const timeDiff0 = (performance.now() - _startTime) / 1000;
            this.props.switch_tile_reveal(DFSStack);
            this.props.decreaseTile(DFSStack.length);

            if (this.props.gameFinished) {
                this.props.stopTimer();
            }
            const _endTime = performance.now();
            var timeDiff = (_endTime - _startTime) / 1000; //in ms
            console.log(
                "(DFS) took %f, render took %f. Length: %i, Time Per Cell: %f",
                timeDiff0,
                timeDiff,
                DFSStack.length,
                timeDiff / DFSStack.length
            );
            return;
        }

        if (this.props.mineRevealedMatrix[r][c] !== cellType.revealedEmptyCell) {
            this.props.switch_tile_reveal([[r, c]]);
            this.props.decreaseTile(1);
            console.log(this.props.gameFinished);
            if (this.props.gameFinished) {
                this.props.stopTimer();
            }

            const _endTime = performance.now();
            var timeDiff = (_endTime - startTime) / 1000; //in ms
            console.log("Normal render 2 took %f. Length: %i", timeDiff);
        }
    }

    render() {
        let cells = [];
        for (let r = 0; r < this.props.row; r++) {
            for (let c = 0; c < this.props.column; c++) {
                cells.push(
                    <Cell
                        x={r}
                        y={c}
                        key={this.state.uidMatrix[r][c]}
                        onCellPressE={this.updateMineMatrix.bind(this)}
                    />
                );
            }
        }

        return (
            <View style={styles.Board} shouldRasterizeIOS={true}>
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
        mineCoords: state.mineCoords,
        gameFinished: state.gameFinished,
    };
};

const styles = StyleSheet.create({
    Board: {
        alignSelf: "center",
        alignItems: "center",
        // borderWidth: 3,
        // borderColor:'#333',
        flexDirection: "column",
        flex: 1,
        flexShrink: 1,
        width: "100%",
        paddingVertical: 10,
        backgroundColor: "#fee",
        justifyContent: "space-around",
        justifyContent: "center",
        margin: "10%",
    },

    boardRow: {
        flex: 1,
        // width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "stretch",

        // borderWidth: 1,
        // borderColor:'#771',
    },
});

export default connect(mapStateToProps, {
    decreaseMine,
    decreaseTile,
    switch_tile_reveal,
    testAction,
    startTimer,
    stopTimer,
})(Board);
