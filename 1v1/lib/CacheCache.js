include('Values');
include('CachedDistances');		// cd
include('DataMap');			// dm

global CC_MASK = [];

// Build the cell numbers around 0, at distance 'distance' max
function ccGetMask(distance) {
    var mask = CC_MASK[distance];
    
    if (mask == null) {
        debug('Generating mask for d=' + distance);
	
        mask = [];

        for (var i = -distance; i <= distance; i++) {
            for (var j = -distance; j <= distance; j++) {
                if (abs(i) + abs(j) <= distance) {
                    push(mask, i*17 + j*18);
                }
            }
        }

        CC_MASK[distance] = mask;
    }

    return mask;
}

// Return the cell numbers at 'distance' cells from 'from'
function ccGetCellsAround(from, distance) {
	return arrayMap(ccGetMask(distance), function(cell) { return cell + from; });
}

// Filters
function ccFilterReachable(cells, origin, leek) {
	var mp = getMP(leek);

	return arrayFilter(cells, function(c) {
		// We can always reach origin
		if (c == origin) {
			return true;
		}
		
		// Can't reach busy cell
		if (isObstacle(c) || isLeek(c)) {
			return false;
		}
		
		// Must not be too far, and path must not be null ! (= no way)
		var pathLength = cdGetPathLength(origin, c);
		
		return pathLength != null && pathLength <= mp;
	});
}

function ccFilterCanShootCell(cells, cell) {
	return arrayFilter(cells, function(c) {
		var cellDistance = cdGetCellDistance(c, cell);
	
		return cellDistance <= GUN_MAX_RANGE &&
			cellDistance >= GUN_MIN_RANGE &&
			!isObstacle(c) &&
			cdLineOfSight(c, cell, LEEK);
	});
}

function ccFilterIsSafeFromLeek(cells, leek) {
	var leekArea = ccGetCellsAround(getCell(leek), getMP(leek));
	leekArea = ccFilterReachable(leekArea, getCell(leek), leek);
	
	return arrayFilter(cells, function(targetCell) {	
		var losCount = count(
			arrayFilter(leekArea, function (originCell) {
				return cdLineOfSight(originCell, targetCell, LEEK) ||
					cdLineOfSight(originCell, targetCell, leek);
			})
		);
		
		return losCount == 0;
	});
}

// Helpers
function ccGetClosestCellFromCell(cells, origin) {
	var bestCell = cells[0];
	var bestDistance = 9999;
	
	for (var cell in cells) {
		if (cell == origin) {
			return cell;
		}
	
		var newDistance = cdGetPathLength(cell, origin);
		
		if (newDistance < bestDistance) {
			bestDistance = newDistance;
			bestCell = cell;
		}
	}
	
	return bestCell;
}

function ccGetFarthestCellFromCell(cells, origin) {
	var bestCell = cells[0];
	var bestDistance = 0;
	
	for (var cell in cells) {
		var newDistance = cdGetPathLength(origin, cell);
		
		if (newDistance != null && newDistance > bestDistance) {
			bestDistance = newDistance;
			bestCell = cell;
		}
	}
	
	return bestCell;
}
