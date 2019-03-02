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

function setWeaponAndUpdate(weapon) {
    setWeapon(weapon);
    
    CURRENT_WEAPON = getWeapon();   // In case setWeapon didn't do anything
    CURRENT_WEAPON_COST = getWeaponCost(CURRENT_WEAPON);
    GUN_MIN_RANGE = getWeaponMinRange(CURRENT_WEAPON);
    GUN_MAX_RANGE = getWeaponMaxRange(CURRENT_WEAPON);
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
