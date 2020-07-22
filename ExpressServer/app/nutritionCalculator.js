// Based off, http://www.mydailyintake.net/daily-intake-levels/

// Returns each from a float of 0-1 representing the percentage they need

function getEnergy(dbUser) {
    return dbUser.consumed.reduce((a, {energy}) => a + energy, 0) / 2079.3499;
}

function getTotalFat(dbUser) {
    return dbUser.consumed.reduce((a, {totalFat}) => a + totalFat, 0) / 70;
}

function getSaturates(dbUser) {
    return dbUser.consumed.reduce((a, {saturates}) => a + saturates, 0) / 24;
}

function getCarbs(dbUser) {
    return dbUser.consumed.reduce((a, {carbs}) => a + carbs, 0) / 310;
}

function getTotalSugars(dbUser) {
    return dbUser.consumed.reduce((a, {totalSugars}) => a + totalSugars, 0) / 90;
}

function getProtein(dbUser) {
    return dbUser.consumed.reduce((a, {protein}) => a + protein, 0) / 50;
}

function getSalt(dbUser) {
    return dbUser.consumed.reduce((a, {salt}) => a + salt, 0) / 2300;
}
  
module.exports.getEnergy = getEnergy;
module.exports.getTotalFat = getTotalFat;
module.exports.getSaturates = getSaturates;
module.exports.getCarbs = getCarbs;
module.exports.getTotalSugars = getTotalSugars;
module.exports.getProtein = getProtein;
module.exports.getSalt = getSalt;