import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

import GameStateDisplayer from "./gameStateDisplayer";
import GameStateSetterButtons from "./gameStateSetter";
import StopwatchContainer from "./StopWatch";
import Board from "./Board";
import { startTimer, stopTimer, resetTimer } from "./Actions";

class GameState extends Component {
    render() {
        return <View>{this.props.children}</View>;
    }
}


export default connect(null, { startTimer, stopTimer, resetTimer })(GameState);
