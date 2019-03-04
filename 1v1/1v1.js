include('lib/Values');
include('lib/Helpers');
include('lib/CacheCache');		// cc

if (getTurn() == 1) {
    setWeaponAndUpdate(WEAPON_PISTOL);
    setWeaponAndUpdate(WEAPON_MAGNUM);
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
var target;
var shot = false;

// Loop on all equipped weapons and chips
for (var weaponOrChip in getUsableWeaponsAndChips()) {
    target = ccFilterCanShootCell(reachable, ENEMY_CELL, weaponOrChip);

    // Try to move and shoot this weapon
    if (!isEmpty(target)) {
        if ((isWeapon(weaponOrChip) && getTP() >= getWeaponCost(weaponOrChip)) || (isChip(weaponOrChip) && getTP() >= getChipCost(weaponOrChip))) {
            moveTowardCellAndUpdate(
                ccGetClosestCellFromCell(target, CURRENT_CELL)
            );

            spamWeaponOrChip(weaponOrChip);

            shot = true;
        }
    }
}

// Let's find a reachable safe cell
around = ccGetCellsAround(CURRENT_CELL, CURRENT_MP);
reachable = ccFilterReachable(around, CURRENT_CELL, LEEK);
target = ccFilterIsSafeFromLeek(reachable, ENEMY);

if (!isEmpty(target)) {
    if (shot) {
        moveTowardCellAndUpdate(
            ccGetClosestCellFromCell(target, ENEMY_CELL)
        );
    } else {    // Don't play the draw, it's lame
        moveTowardCellAndUpdate(
            ccGetClosestCellFromCell(reachable, ENEMY_CELL)
        );
    }
} else {
    debug('No safe cell!');

    moveTowardCellAndUpdate(
        ccGetFarthestCellFromCell(reachable, ENEMY_CELL)
    );
}

spamSpark();
