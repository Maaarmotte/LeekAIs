include('Values');
include('CachedDistances');		// cd

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

function spamWeaponOrChip(weaponOrChip) {
    var distance = cdGetCellDistance(CURRENT_CELL, ENEMY_CELL);
    
    if (isWeapon(weaponOrChip)) {
        var minRange = getWeaponMinRange(weaponOrChip);
        var maxRange = getWeaponMaxRange(weaponOrChip);

        if (distance >= minRange && distance <= maxRange && cdLineOfSight(CURRENT_CELL, ENEMY_CELL, LEEK)) {
            while (getTP() >= getWeaponCost(getWeapon()) && isAlive(ENEMY)) {
                useWeapon(ENEMY);
            }
        }
    } else if (isChip(weaponOrChip)) {
        var minRange = getChipMinRange(weaponOrChip);
        var maxRange = getChipMaxRange(weaponOrChip);

        if (distance >= minRange && distance <= maxRange && cdLineOfSight(CURRENT_CELL, ENEMY_CELL, LEEK)) {
            while (getTP() >= getChipCost(weaponOrChip) && getCooldown(weaponOrChip) == 0 && canUseChip(weaponOrChip, ENEMY) && isAlive(ENEMY)) {
                useChip(weaponOrChip, ENEMY);
            }
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

function getUsableWeaponsAndChips() {
    var weaponsAndChips = [];

    if (search(getChips(), CHIP_STALACTITE) != null) {
        push(weaponsAndChips, CHIP_STALACTITE);
    }

    push(weaponsAndChips, getWeapon());

    return weaponsAndChips;
}
