global DATA_MAP = [];

// Reset the map at the beginning of each turn
DATA_MAP = [];

function dmGet(field, cell) {
    var data = DATA_MAP[cell];

    return data != null ? data[field] : null;
}

function dmSet(field, cell, value) {
    var data = DATA_MAP[cell];

    if (data == null) {
        DATA_MAP[cell] = [ field: value ];
    } else {
        data[field] = value;
    }
}

function dmSetSafeCells(cells) {
    arrayIter(cells, dmSetSafeCell);
}

function dmSetSafeCell(cell) {
    dmSet("safe", cell, 1);
}

function dmSetUsableCells(cells) {
    arrayIter(cells, dmSetUsableCell);
}

function dmSetUsableCell(cell) {
    dmSet("usable", cell, 1);
}

function dmIsSafe(cell) {
    return dmGet("safe", cell);
}

function dmIsUsable(cell) {
    return dmGet("usable", cell);
}