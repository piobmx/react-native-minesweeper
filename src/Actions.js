export const decreaseMine = () => {
    return {
        type: DECREASE_MINE,
        payload: 1,
    };
};

export const decreaseTile = (decreaseBy) => {
    return {
        type: DECREASE_TILE,
        payload: {
            decreaseBy: decreaseBy,
        },
    };
};

export const testAction = () => {
    return {
        type: TEST_ACTION,
        payload: 1,
    };
};


export const switch_tile_reveal = (newReveal) => {
    return{
        type: SWITCH_TILE_REVEAL,
        payload: {
            newReveal: newReveal,
        },
    };
};

export const resetDifficulty = (newDifficulty) => {
    return {
        type: RESET_DIFFICULTY,
        payload: { newDifficulty: newDifficulty },
    };
};

export const restartGame = () => {
    return {
        type: RESTART_GAME,
        payload: null,
    };
};

export const deltaTime = (dt) => {
    return {
        type: DELTA_TIME,
        payload: {dt}
    }
};

export const startTimer = (baseTime = 0) => {
    return {
        type: START_TIMER,
        payload: {
            baseTime: baseTime,
            now: new Date().getTime(),
        }
    }
};

export const stopTimer = () => {
    return {
        type: STOP_TIMER,
        payload: {
            now: new Date().getTime()
        }
    }
}

export const resetTimer = () => {
    return {
        type: RESET_TIMER,
        payload: {
            now: new Date().getTime()
        }
    }
}

export const DECREASE_MINE = "DECREASE_MINE";
export const DECREASE_TILE = "DECREASE_TILT";
export const TEST_ACTION = "test_action";
export const SWITCH_TILE_REVEAL = "switch_tile_reveal";
export const RESET_DIFFICULTY = "reset_difficulty";
export const RESTART_GAME = "restart_game";
export const DELTA_TIME = "delta_time"
export const START_TIMER = "start_timer"
export const STOP_TIMER = "stop_timer"
export const RESET_TIMER = "reset_timer"
