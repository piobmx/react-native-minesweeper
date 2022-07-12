import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Dimensions } from "react-native";

import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { decreaseMine, decreaseTile, testAction, switch_tile_reveal, startTimer } from "./Actions";

const windowWidth = Dimensions.get("window").width;

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

class Cell extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    onCellPress = () => {
        this.props.startTimer();
        this.props.onCellPressE(this.props.x, this.props.y);
    };

    onCellLongPress = () => {
        // add flag
    };

    render() {
        const reveal = this.props.mineRevealedMatrix[this.props.x][this.props.y];
        let bgc = "#fed";
        // reveal === cellType.revealedMine || reveal === cellType.unrevealedMine ? (bgc = "#aec") : (bgc = "#fed");
        let textColor = "black";
        let display = SYMBOL.unknown;

        if (
            this.props.mineRevealedMatrix[this.props.x][this.props.y] === cellType.unrevealedMine ||
            this.props.mineRevealedMatrix[this.props.x][this.props.y] === cellType.revealedMine
        ) {
            if (reveal === cellType.revealedMine) {
                bgc = "red";
                display = SYMBOL.hasMine;
            }
        } else {
            if (reveal === cellType.revealedEmptyCell) {
                // this.state.nbh === 0 ? (display = "E") : (display = this.state.nbh);
                this.props.nbhMatrix[this.props.x][this.props.y] === 0
                    ? (display = " ")
                    : (display = this.props.nbhMatrix[this.props.x][this.props.y]);
                bgc = "#b9d9ff";
                switch (this.props.nbhMatrix[this.props.x][this.props.y]) {
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
            }
        }

        return (
            <TouchableOpacity
                style={[styles.mineCell, { backgroundColor: bgc }]}
                onPressIn={this.onCellPress}
                onLongPress={this.onCellLongPress}
                activeOpacity={0.9}
            >
                <Text
                    style={[
                        styles.mineText,
                        {
                            color: textColor,
                        },
                    ]}
                >
                    {display}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state, parentProps) => {
    return {
        row: state.row,
        mineRevealedMatrix: state.mineRevealedMatrix,
        nbhMatrix: state.nbhMatrix,
        ae: state.mineRevealedMatrix[parentProps.x][parentProps.y],
        difficulty: state.difficulty,
    };
};

const styles = StyleSheet.create({
    mineCell: {
        flex: 1,
        // width: 40,
        // height: 40,
        borderWidth: 1,
        // elevation: 0,
        marginLeft: -1,
        marginBottom: -1,
        aspectRatio: 1,
        flexShrink: 1,
    },

    mineText: {
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        alignContent: "center",
        fontWeight: "400",
        // adjustsFontSizeToFit: true,
        fontWeight: "bold",
        // fontFamily: "sans-serif",
        textShadowColor: "black",
    },
});

export default connect(mapStateToProps, { decreaseMine, decreaseTile, testAction, switch_tile_reveal, startTimer })(
    Cell
);

export { cellType };
