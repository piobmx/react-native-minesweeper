import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { startTimer, stopTimer, resetTimer } from "./Actions";

function getElapsedTime(baseTime, startedAt, stoppedAt = new Date().getTime()) {
    if (!startedAt) {
        return 0;
    } else {
        return stoppedAt - startedAt + baseTime;
    }
}

class StopwatchContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.interval = setInterval(this.forceUpdate.bind(this), this.props.updateInterval);
    }

    timerStart() {
        const baseTime = this.props.baseTime;
        const stoppedAt = this.props.stoppedAt;
        const startedAt = this.props.startedAt;
        const elapsed = getElapsedTime(baseTime, startedAt, stoppedAt);
        this.props.startTimer(elapsed);
    }

    timerStop() {
        this.props.stopTimer();
    }

    timerReset() {
        this.props.resetTimer();
    }

    render() {
        const baseTime = this.props.baseTime;
        const stoppedAt = this.props.stoppedAt;
        const startedAt = this.props.startedAt;

        const elapsed = getElapsedTime(baseTime, startedAt, stoppedAt);

        return (
            <>
                <Text style={styles.settingText}>
                    {(elapsed / 1000).toFixed(3)} seconds  {"\n"}
                    (~{Math.round( elapsed / this.props.clearedTiles)} mines per seconds)
                </Text>


                <View style={styles.settingContainer}>
                    <TouchableOpacity onPress={this.timerStart.bind(this)} style={styles.settingButton} key="1">
                        <Text>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.timerStop.bind(this)} style={styles.settingButton} key="2">
                        <Text>Stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.timerReset.bind(this)} style={styles.settingButton} key="3">
                        <Text>Reset</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        baseTime: state.baseTime,
        startedAt: state.startedAt,
        stoppedAt: state.stoppedAt,
        mineRevealedMatrix: state.mineRevealedMatrix,
        timerActive: state.timerActive,
        clearedTiles: (state.row * state.column) - state.mines - state.remainedTiles,
    };
};

const styles = StyleSheet.create({
    settingContainer: {
        alignSelf: "center",
        flexDirection: "row",
        width: "90%",
    },

    settingButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",

        // width: 1,
        height: 30,
        borderColor: "#333",
        borderWidth: 2,
        backgroundColor: "#bef",
        padding: 2,
    },

    settingText: {
        // fontFamily: "monospace",
        fontSize: 20,
        // fontVariant: ['tabular-nums'],
    },
});

export default connect(mapStateToProps, { startTimer, stopTimer, resetTimer })(StopwatchContainer);
