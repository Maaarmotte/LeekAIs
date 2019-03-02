include('Values');
include('CachedDistances');

function moveTowardCellAndUpdate(cell) {
	CURRENT_MP = CURRENT_MP - moveTowardCell(cell);
	CURRENT_CELL = getCell();
}

function moveTowardLeekAndUpdate(leek) {
	CURRENT_MP = CURRENT_MP - moveToward(leek);
	CURRENT_CELL = getCell();
}

function spamWeapon() {
	var distance = cdGetCellDistance(CURRENT_CELL, ENEMY_CELL);
	if (distance <= GUN_MAX_RANGE && cdLineOfSight(CURRENT_CELL, ENEMY_CELL, LEEK)) {
		while (getTP() >= getWeaponCost(getWeapon()) && isAlive(ENEMY)) {
			useWeapon(ENEMY);
		}
	}
}

function spamSpark() {
	var distance = cdGetCellDistance(CURRENT_CELL, ENEMY_CELL);
	if (distance <= SPARK_RANGE) {
		while (getTP() >= getChipCost(CHIP_SPARK) && isAlive(ENEMY)) {
			useChip(CHIP_SPARK, ENEMY);
		}
	}
}

function willBeInRangeFromSpark() {
	return cdGetCellDistance(CURRENT_CELL, ENEMY_CELL) - CURRENT_MP <= SPARK_RANGE + ENEMY_MP;
}
