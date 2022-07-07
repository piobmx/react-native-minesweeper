import React, { PureComponent, Component } from "react";
import { createStore } from 'redux';

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import MineContext from "./MineContext";

const SYMBOL = {
    clicked: {},
    unclicked: {
        hasMine: "✗",
        hasNotMine: "✓",
        unknown: " ", // 'o'
    },
    unknown: " ", // 'o'
    hasMine: "✗",
    hasNotMine: "✓",
};

const cellType = {
    unrevealedMine: "M1",
    revealedMine: "M2",
    unrevealedEmptyCell: "E",
    revealedEmptyCell: "R",
};
let store = createStore();

class Cell extends PureComponent {
    static contextType = MineContext;

    constructor(props) {
        super(props);
        this.state = {
            textColor: "black",
            x: props.x,
            y: props.y,
            revealed: props.revealed,

            isMine: false,
            pressed: false,
            nbh: props.nbh,
            display: SYMBOL.unknown,
        };
    }

    componentDidMount() {
        const isMine = this.context.mineRevealedMatrix[this.state.x][this.state.y];
        if (isMine === cellType.unrevealedMine || isMine === cellType.revealedMine) {
            this.setState({
                isMine: true,
            });
        }
    }

    onCellPress = () => {
        let revealedState;
        if (this.state.isMine) {
            revealedState = cellType.revealedMine;
        } else {
            revealedState = cellType.revealedEmptyCell;
        }

        this.props.onCellPress(this.props.x, this.props.y);
        this.setState({
            revealed: revealedState,
        });
    };

    onCellLongPress = () => {
        // add flag
    };

    updateCellReveal = (revealState) => {
        const oldState = this.state.revealed;

        this.setState({
        revealed: revealState,
    });

        // const startTime = new Date();
        // if (revealState !== oldState) {
        //     if (this.state.isMine) {
        //         this.context.oneLessMine();
        //     } else {
        //         this.context.oneLessSafe();
        //     }
        // }
        // const endTime = new Date();
        // var timeDiff = endTime - startTime; //in ms
        // timeDiff /= 1000;
        // console.log(timeDiff + " seconds");


    };

    render() {
        const reveal = this.context.mineRevealedMatrix[this.state.x][this.state.y];

        {
            /* let bgc = styles.mineCell.backgroundColor; */
        }
        let bgc = "#feb";
        let display;
        let textColor = "black";
        if (this.state.isMine) {
            switch (reveal) {
                case cellType.revealedMine:
                    bgc = "red";
                    display = SYMBOL.hasMine;
                    break;
                case cellType.unrevealedMine:
                    display = SYMBOL.unknown;
                    break;
                default:
                    display = SYMBOL.unknown;
            }
        } else {
            if (reveal === cellType.revealedEmptyCell) {
                this.state.nbh === 0 ? (display = "E") : (display = this.state.nbh);
                bgc = "#b9d9ff";
                switch (this.state.nbh) {
                    case 0:
                        textColor = "rgba(52, 52, 52, 0.8)";
                        break;

                    case 1:
                        textColor = "rgba(53, 105, 244, 0.9)";
                        break;
                    case 2:
                        textColor = "rgba(44, 171, 91, 0.8)";
                        break;
                    case 3:
                        textColor = "rgba(237, 109, 109, 0.8)";
                        break;
                    case 4:
                        textColor = "rgba(69, 97, 222, 0.8)";
                        break;
                }
            } else {
                display = SYMBOL.unknown;
            }
        }

        return (
            <TouchableOpacity
                style={[styles.mineCell, { backgroundColor: bgc }]}
                onPressIn={this.onCellPress}
                onLongPress={this.onCellLongPress}
                activeOpacity={1}
            >
                <Text
                    style={{
                        textAlignVertical: "center",
                        textAlign: "center",
                        lineHeight: 50,
                        color: textColor,
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "futura",
                        textShadowColor: "black",
                    }}
                >
                    {display}
                    {/* {this.state.nbh} */}
                    {/* ({this.context.mineRevealedMatrix[this.state.x][this.state.y]} {this.state.revealed}) */}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default Cell;
export { cellType };
