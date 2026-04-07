// ================= AUTH APIs =================

//Login endpoint
const loginAdmin = "/users/auth";

//Dashboard stat card 
const StatsCards = "/admin-panel/dashboard";

//Latest Order and Order Page api dashboard and order page
const Order = "/admin-panel/orders";

//product page api /stats api
const Product = "/products/";

// Product Edit API
const ProductEdit = (id) => `/products/${id}`;

//Product delete API
const ProductDelete = (id) => `/products/${id}`;


//collection add 
const Collection = "/products/category";

// Category Edit API
const CollectionEdit = (id) => `/products/category/${id}`;

// Category Delete API
const CollectionDelete = (id) => `/products/category/${id}`;

// ================= EXPORT FUNCTIONS =================
export const loginAdminAPI = () => loginAdmin;
export const StatsCardAPI = () => StatsCards;
export const OrderAPI = () => Order;
export const ProductAPI = () => Product;

export const ProductEditAPI = (id) => ProductEdit(id);
export const ProductDeleteAPI = (id) => ProductDelete(id);

// ================= EXPORT FUNCTIONS =================
export const CollectionAPI = () => Collection;
export const CollectionEditAPI = (id) => CollectionEdit(id);
export const CollectionDeleteAPI = (id) => CollectionDelete(id);