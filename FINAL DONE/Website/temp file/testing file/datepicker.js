const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

// Query for today's data
const queryForDay = mainSupplyRef
    .where('date', '>=', startOfDay)
    .where('date', '<', endOfDay);

const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()));

// Query for this week's data
const queryForWeek = mainSupplyRef
    .where('date', '>=', startOfWeek)
    .where('date', '<', endOfWeek);

const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

// Query for this month's data
const queryForMonth = mainSupplyRef
    .where('date', '>=', startOfMonth)
    .where('date', '<=', endOfMonth);

const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);

// Query for the last 6 months' data
const queryForSixMonths = mainSupplyRef
    .where('date', '>=', sixMonthsAgo)
    .where('date', '<=', today);

const startOfYear = new Date(today.getFullYear(), 0, 1);
const endOfYear = new Date(today.getFullYear(), 11, 31);

// Query for this year's data
const queryForYear = mainSupplyRef
    .where('date', '>=', startOfYear)
    .where('date', '<=', endOfYear);
