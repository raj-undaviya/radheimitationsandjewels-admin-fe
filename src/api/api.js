// ================= AUTH APIs =================

//Login endpoint
const loginAdmin = "/users/auth";

//Dashboard stat card 
const StatsCards = "/admin-panel/dashboard";

//Latest Order and Order Page api dashboard and order page
const Order = "/admin-panel/orders";

// ===========================================
//product page api /stats api
const Product = "/products/";

// Product Edit API
const ProductEdit = (id) => `/products/${id}`;

//Product delete API
const ProductDelete = (id) => `/products/${id}`;

// ============================================
//collection add 
const Collection = "/products/category";

// Category Edit API
const CollectionEdit = (id) => `/products/category/${id}`;

const CollectionById = (id) => `/products/category/${id}`;

// Category Delete API
const CollectionDelete = (id) => `/products/category/${id}`;

// ==============================================

//subcategory view API
// subcategory add 
const SubCategory = "/products/subcategory";

// subcategory edit api
const SubCategoryEdit = (id) => `/products/subcategory/${id}`;

const SubCategoryDelete = (id) => `/products/subcategory/${id}`;

// ================= APPOINTMENT =================

const AppointmentAdmin = "/api/admin-panel/appointments";




// ================= EXPORT FUNCTIONS =================
export const loginAdminAPI = () => loginAdmin;
export const StatsCardAPI = () => StatsCards;

export const OrderAPI = () => Order;

export const ProductAPI = () => Product;
export const ProductEditAPI = (id) => ProductEdit(id);
export const ProductDeleteAPI = (id) => ProductDelete(id);

// ================= COLLECTION FUNCTION =================
export const CollectionAPI = () => Collection;
export const CollectionEditAPI = (id) => CollectionEdit(id);
export const CollectionByIdAPI = (id) => CollectionById(id);
export const CollectionDeleteAPI = (id) => CollectionDelete(id);


// ================= SUBCOLLECTION FUNCTION =================
export const SubCategoryAPI = (categoryId) => {
    if (categoryId && categoryId !== "all") {
        return `${SubCategory}?category=${categoryId}`;
    }
    return SubCategory;
};

export const SubCategoryEdiAPI = (id) => SubCategoryEdit(id);
export const SubCategoryDeleteAPI = (id) => SubCategoryDelete(id);

export const AppointmentAdminAPI = () => AppointmentAdmin;