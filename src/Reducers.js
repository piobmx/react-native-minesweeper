import { combineReducers } from "redux";
import { useDispatch } from "react-redux";
import Cell, { cellType } from "./Cell";

import {
    DECREASE_MINE,
    DECREASE_TILE,
    TEST_ACTION,
    SWITCH_TILE_REVEAL,
    RESET_DIFFICULTY,
    RESTART_GAME,
    RESET_TIMER,
    START_TIMER,
    STOP_TIMER,
} from "./Actions";
import { EASY, INTERMIDIATE, HARD, difficultyData } from "./constants";
import { createMines, initCount } from "./utils";

const DEFAULT_LEVEL = INTERMIDIATE;

const mines = createMines(
    difficultyData[DEFAULT_LEVEL].ROW,
    difficultyData[DEFAULT_LEVEL].COLUMN,
    difficultyData[DEFAULT_LEVEL].MINES
);
const [nbhMatrix, mineRevealedMatrix] = initCount(
    difficultyData[DEFAULT_LEVEL].ROW,
    difficultyData[DEFAULT_LEVEL].COLUMN,
    mines
);

const initialState = {
    untouched: true,
    difficulty: DEFAULT_LEVEL,
    row: difficultyData[DEFAULT_LEVEL].ROW,
    column: difficultyData[DEFAULT_LEVEL].COLUMN,
    mines: difficultyData[DEFAULT_LEVEL].MINES,
    remainedMines: difficultyData[DEFAULT_LEVEL].MINES,
    remainedTiles:
        difficultyData[DEFAULT_LEVEL].ROW * difficultyData[DEFAULT_LEVEL].COLUMN - difficultyData[DEFAULT_LEVEL].MINES,
    playtime: 0.0,
    currentGameState: undefined,
    valueForTest: 0,
    nbhMatrix: nbhMatrix,
    mineRevealedMatrix: mineRevealedMatrix,
    mineCoords: mines,
    timerActive: undefined,
    startedAt: undefined,
    stoppedAt: undefined,
    baseTime: undefined,
    clearedTiles: 0,


    gameFinished: undefined,
};

function mineReducer(state = initialState, action) {
    switch (action.type) {
        case TEST_ACTION:
            let v = state.valueForTest + 1;
            console.log("test reducer:", v);
            return {
                ...state,
                valueForTest: v,
            };

        case DECREASE_MINE:
            let oneLessMines = state.remainedMines - action.payload;
            return {
                ...state,
                remainedMines: oneLessMines,
            };

        case DECREASE_TILE:
            let newTileNum = state.remainedTiles - action.payload.decreaseBy;
            const cleared = state.clearedTiles + action.payload.decreaseBy
            if (newTileNum > 0) {
                return {
                    ...state,
                    remainedTiles: newTileNum,
                    timerActive: true,
                    clearedTiles: cleared
                };
            } else {
                return {
                    ...state,
                    remainedTiles: newTileNum,
                    timerActive: false,
                    gameFinished: true,
                    clearedTiles: cleared,
                }
            };

        case SWITCH_TILE_REVEAL:
            let mrm = state.mineRevealedMatrix;

            for (let d of action.payload.newReveal) {
                mrm[d[0]][d[1]] = cellType.revealedEmptyCell;
            }
            return {
                ...state,
                mineRevealedMatrix: mrm,
            };

        case RESTART_GAME:
            var mines = createMines(
                difficultyData[state.difficulty].ROW,
                difficultyData[state.difficulty].COLUMN,
                difficultyData[state.difficulty].MINES
            );

            var [nbhMatrix, mineRevealedMatrix] = initCount(
                difficultyData[state.difficulty].ROW,
                difficultyData[state.difficulty].COLUMN,
                mines
            );
            console.log("restart", "mines", mines);
            var mineCoords = mines;
            var newMineRevealedMatrix = mineRevealedMatrix;
            var newNbhMatrix = nbhMatrix;
            var remainedMines = difficultyData[state.difficulty].MINES;
            var remainedTiles =
                difficultyData[state.difficulty].ROW * difficultyData[state.difficulty].COLUMN -
                difficultyData[state.difficulty].MINES;
            return {
                ...state,
                mineCoords: mineCoords,
                remainedMines: remainedMines,
                remainedTiles: remainedTiles,
                nbhMatrix: newNbhMatrix,
                mineRevealedMatrix: newMineRevealedMatrix,
                gameFinished: undefined,
            };

        case RESET_DIFFICULTY:
            var newDifficulty = action.payload.newDifficulty;
            console.log(action.payload);
            var row = difficultyData[newDifficulty].ROW;
            var column = difficultyData[newDifficulty].COLUMN;

            var mines = createMines(row, column, difficultyData[newDifficulty].MINES);
            var [nbhMatrix, mineRevealedMatrix] = initCount(row, column, mines);


            var mineCoords = mines;
            var newMineRevealedMatrix = mineRevealedMatrix;
            var newNbhMatrix = nbhMatrix;
            var remainedMines = difficultyData[newDifficulty].MINES;
            var remainedTiles =
                difficultyData[newDifficulty].ROW * difficultyData[newDifficulty].COLUMN -
                difficultyData[newDifficulty].MINES;


            return {
                ...state,
                difficulty: newDifficulty,
                row: row,
                column: column,
                mineCoords: mineCoords,
                nbhMatrix: newNbhMatrix,
                remainedMines: remainedMines,
                remainedTiles: remainedTiles,
                mineRevealedMatrix: newMineRevealedMatrix,
                gameFinished: undefined,
            };

        case START_TIMER:
            if (state.timerActive && !state.stoppedAt) {
                return {
                    ...state,
                };
            }
            return {
                ...state,
                startedAt: action.payload.now,
                stoppedAt: undefined,
                baseTime: action.payload.baseTime,
                timerActive: true,
            };

        case STOP_TIMER:
            return {
                ...state,
                stoppedAt: action.payload.now,
                timerActive: false,
                clearedTiles: 0,
            };

        case RESET_TIMER:
            return {
                ...state,
                baseTime: 0,
                startedAt: state.startedAt ? action.now : undefined,
                stoppedAt: state.stoppedAt ? action.now : undefined,
                timerActive: undefined,
                clearedTiles: 0,
            };

        default:
            return state;
    }
}

const mapStateToProps = (state) => {
    const mines = createMines(state.row, state.column, state.mines);
    const [nbhMatrix, mineRevealedMatrix] = initCount(state.row, state.column, mines);
    return {
        ...state,
        mineCoords: mines,
        mineRevealedMatrix: mineRevealedMatrix,
        nbhMatrix: nbhMatrix,
    };
};

const allReducers = combineReducers({
    mineX: mineReducer,
});

export default mineReducer;
