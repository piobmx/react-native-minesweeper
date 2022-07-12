

const EASY = "easy"
const INTERMIDIATE = "intermediate"
const HARD = "hard"


const difficultyData = {
    easy: {
        ROW: 9,
        COLUMN: 9,
        MINES: 10,
    },
    intermediate: {
        ROW: 16,
        COLUMN: 16,
        MINES: 10,
    },
    hard: {
        ROW: 16,
        COLUMN: 30,
        MINES: 99,
    }
}

const NEARBYS = [
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [-1, 1],
    [1, -1],
];


export {difficultyData, NEARBYS, EASY, INTERMIDIATE, HARD}
