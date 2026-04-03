// ================= AUTH APIs =================

//Login endpoint
const loginAdmin = "/users/auth";

//Dashboard stat card 
const StatsCards = "/admin-panel/dashboard";

//Latest Order and Order Page api dashboard and order page
const Order = "/admin-panel/orders";



// ================= EXPORT FUNCTIONS =================
export const loginAdminAPI = () => loginAdmin;
export const StatsCardAPI = () => StatsCards;
export const OrderAPI = () => Order;