import { decreaseMine, decreaseTile, DECREASE_MINE, DECREASE_TILE } from "./Actions";
import {EASY, INTERMIDIATE, HARD, difficultyData} from './constants'

const initialState = {
    difficulty: EASY,
    row: difficultyData[EASY].row,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DECREASE_MINE:
            return {};
        case DECREASE_TILE:
            return {};
        default:
            return state;
    }
}
