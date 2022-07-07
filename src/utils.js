import {NEARBYS} from './constants'

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

export {generatemineCoords, searchForArray, searchForNeighborMines, AddArrays}
