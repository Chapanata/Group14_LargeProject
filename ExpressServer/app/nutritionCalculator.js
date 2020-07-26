// Based off, http://www.mydailyintake.net/daily-intake-levels/

// Returns each from a float of 0-1 representing the percentage they need

function getEnergy(dbUser) {
    return dbUser.consumed.reduce((a, {energy, quantity}) => a + (energy * quantity), 0) / 2079.3499;
}

function getTotalFat(dbUser) {
    return dbUser.consumed.reduce((a, {totalFat, quantity}) => a + (totalFat * quantity), 0) / 70;
}

function getSaturates(dbUser) {
    return dbUser.consumed.reduce((a, {saturates, quantity}) => a + (saturates * quantity), 0) / 24;
}

function getCarbs(dbUser) {
    return dbUser.consumed.reduce((a, {carbs, quantity}) => a + (carbs * quantity), 0) / 310;
}

function getTotalSugars(dbUser) {
    return dbUser.consumed.reduce((a, {totalSugars, quantity}) => a + (totalSugars * quantity), 0) / 90;
}

function getProtein(dbUser) {
    return dbUser.consumed.reduce((a, {protein, quantity}) => a + (protein * quantity), 0) / 50;
}

function getSalt(dbUser) {
    return dbUser.consumed.reduce((a, {salt, quantity}) => a + (salt * quantity), 0) / 2300;
}
  
module.exports.getEnergy = getEnergy;
module.exports.getTotalFat = getTotalFat;
module.exports.getSaturates = getSaturates;
module.exports.getCarbs = getCarbs;
module.exports.getTotalSugars = getTotalSugars;
module.exports.getProtein = getProtein;
module.exports.getSalt = getSalt;
