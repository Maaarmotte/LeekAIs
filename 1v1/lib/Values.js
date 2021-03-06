// Static config
global SPARK_RANGE = 10;

// Turn specifig config
global LEEK = getLeek();
global MAX_LIFE = getLife();
global TURN;
global ENEMY;
global ENEMY_CELL;
global ENEMY_MP;
global START_CELL;
global CURRENT_CELL;
global CURRENT_MP;
global CURRENT_WEAPON;
global CURRENT_WEAPON_COST;
global GUN_MAX_RANGE;
global GUN_MIN_RANGE;

LEEK = getLeek();
TURN = getTurn();
ENEMY = getNearestEnemy();
ENEMY_CELL = getCell(ENEMY);
ENEMY_MP = getMP(ENEMY);
START_CELL = getCell();
CURRENT_CELL = START_CELL;
CURRENT_MP = getMP();
CURRENT_WEAPON = getWeapon();
CURRENT_WEAPON_COST = getWeaponCost(CURRENT_WEAPON);
GUN_MIN_RANGE = getWeaponMinRange(CURRENT_WEAPON);
GUN_MAX_RANGE = getWeaponMaxRange(CURRENT_WEAPON);