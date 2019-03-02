include('lib/Values');
include('lib/Helpers');
include('lib/CacheCache');		// cc

if (getTurn() == 1) {
	setWeapon(WEAPON_MAGNUM);
}

if (MAX_LIFE - getLife() > 100) {
	useChip(CHIP_CURE, LEEK);		
}

if (willBeInRangeFromSpark()) {
	useChip(CHIP_HELMET, LEEK);
	useChip(CHIP_SHIELD, LEEK);
}

var around = ccGetCellsAround(CURRENT_CELL, CURRENT_MP);
var reachable = ccFilterReachable(around, CURRENT_CELL, LEEK);
var target = ccFilterCanShootCell(reachable, ENEMY_CELL);

if (isEmpty(target)) {
	debug('No cell to shoot from!');

	moveTowardCellAndUpdate(
		ccGetClosestCellFromCell(reachable, ENEMY_CELL)
	);
} else {
	if (getTP() >= CURRENT_WEAPON_COST) {
		moveTowardCellAndUpdate(
			ccGetClosestCellFromCell(target, CURRENT_CELL)
		);
		
		spamWeapon();
	}
	
	around = ccGetCellsAround(CURRENT_CELL, CURRENT_MP);
	reachable = ccFilterReachable(around, CURRENT_CELL, LEEK);
	target = ccFilterIsSafeFromLeek(reachable, ENEMY);
	
	if (isEmpty(target)) {
		debug('No safe cell!');
		
		moveTowardCellAndUpdate(
			ccGetFarthestCellFromCell(reachable, ENEMY_CELL)
		);
	} else {
		moveTowardCellAndUpdate(
			ccGetFarthestCellFromCell(target, ENEMY_CELL)
		);
	}
}

spamSpark();
