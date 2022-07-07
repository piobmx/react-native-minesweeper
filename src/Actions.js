
export const decreaseMine = () => {
    return {
        type: DECREASE_MINE,
        payload: 1,
    }
}

export const decreaseTilt = () => {
    return {
        type: DECREASE_TILT,
        payload: 1,
    }
}

export const DECREASE_MINE = "DECREASE_MINE"
export const DECREASE_TILT = "DECREASE_TILT"
