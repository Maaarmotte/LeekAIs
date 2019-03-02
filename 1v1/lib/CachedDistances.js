include('Values');

global CD_CELL_DISTANCE = [];
global CD_PATH_LENGTH = [];
global CD_LINE_OF_SIGHT = [];

// Reset at beginning of each turn to avoid eating to much memory
CD_CELL_DISTANCE = [];
CD_PATH_LENGTH = [];
CD_LINE_OF_SIGHT = [];

function cdCompute(cell1, cell2, cache, callback) {
	var key = cell1 + 'to' + cell2;
	var value = cache[key];
	
	if (value == null) {
		value = cache[cell2 + 'to' + cell1];
	}
	
	if (value != null) {
		return value;
	}
	
	value = callback(cell1, cell2);
	cache[key] = value;
	
	return value;
}

function cdGetPathLength(cell1, cell2) {
	if (cell1 == cell2) {
		return 0;
	}
	
	return cdCompute(cell1, cell2, @CD_PATH_LENGTH, getPathLength);
}

function cdGetCellDistance(cell1, cell2) {
	return cdCompute(cell1, cell2, @CD_CELL_DISTANCE, getCellDistance);
}

function cdLineOfSight(cell1, cell2, leek) {
	var key = leek;
	
	if (leek == null) {
		leek = LEEK;	// Not sure it's a good idea...
	}
	
	return cdCompute(cell1, cell2, @CD_LINE_OF_SIGHT[key], function (start, end) {
		return lineOfSight(start, end, leek);
	});
}
