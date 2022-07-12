import {NEARBYS} from './constants'
import { cellType } from "./Cell";

const generatemineCoords = (ROWMAX, COLUMNMAX) => {
    const row = Math.floor(Math.random() * ROWMAX);
    const column = Math.floor(Math.random() * COLUMNMAX);
    const coord = [row, column];
    return coord;
};

const AddArrays = (Arr1, Arr2) => Arr1.map((x, i) => x + Arr2[i]);

function searchForNeighborMines(hay, cellCoord) {
    const AddArrays = (Arr1, Arr2) => Arr1.map((x, i) => x + Arr2[i]);
    const neighbours = NEARBYS;
    var i;
    let count = 0;
    let nearbyMines = [];
    for (i = 0; i < neighbours.length; ++i) {
        let n = neighbours[i];
        let nei = AddArrays(n, cellCoord);
        let neiSearch = searchForArray(hay, nei);
        if (neiSearch > -1) {
            nearbyMines.push(nei);
            count += 1;
        }
    }
    return [count, nearbyMines];
}

function searchForArray(haystack, needle) {
    var i, j, current;
    for (i = 0; i < haystack.length; ++i) {
        if (needle.length === haystack[i].length) {
            current = haystack[i];
            for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
            if (j === needle.length) return i;
        }
    }
    return -1;
}

function createMines(row, column, numberOfMines) {
    let mineCoords = [];
    for (let i = 0; i <= numberOfMines; i++) {
        let mine = generatemineCoords(row, column);
        let flag = 0;
        for (let j = 0; j < mineCoords.length; j++) {
            if (mine[0] === mineCoords[j][0] && mine[1] === mineCoords[j][1]) {
                i -= 1;
                flag = 1;
            }
        }
        if (flag == 0) {
            mineCoords.push(mine);
        }
    }
    return mineCoords;
}

function initCount(row, col, mines) {
    let nbhMatrix = Array(row)
        .fill()
        .map(() => Array(col).fill(null));
    let mineRevealedMatrix = Array(row)
        .fill()
        .map(() => Array(col).fill(null));

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            let currentCoord = [r, c];
            const [neighbours, nearbyCoords] = searchForNeighborMines(mines, currentCoord);
            for (let m = 0; m < mines.length; m++) {
                if (mines[m][0] === r && mines[m][1] === c) {
                    neighbours = -1;
                }
            }

            neighbours === -1
                ? (mineRevealedMatrix[r][c] = cellType.unrevealedMine)
                : (mineRevealedMatrix[r][c] = cellType.unrevealedEmptyCell);
            nbhMatrix[r][c] = neighbours;
        }
    }
    return [nbhMatrix, mineRevealedMatrix];
}

export {generatemineCoords, searchForArray, searchForNeighborMines, AddArrays, createMines, initCount}
