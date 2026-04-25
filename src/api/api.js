// ================= AUTH APIs =================

//Login endpoint
const loginAdmin = "/users/auth";

//Dashboard stat card 
const StatsCards = "/admin-panel/dashboard";

//Latest Order and Order Page api dashboard and order page
const Order = "/admin-panel/orders";

const SALES_CHART = "/admin-panel/sales-performance/";

// =================== PRODUCT ========================
//product page api /stats api
const Product = "/products/";

// filter category vise
const ProductSubCategory = "/products/subcategory";

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

const AppointmentAdmin = "/admin-panel/appointments";
const AppointmentById = (id) => `/appointments/${id}`;

//================= CUSTOMER ========================
const CustomerView = "/admin-panel/users";
// Register / Create User API
const RegisterUser = "/users/auth";
const CustomerEdit = (id) => `/users/customers/${id}`;
// 🔥 DELETE USER
const CustomerDelete = (id) => `/users/customers/${id}`;

//======================= COUPONS =======================
const CouponView = "/admin-panel/coupons/";
const CreateCoupon = "/admin-panel/coupons/";
const CouponEdit = (id) => `/admin-panel/coupons/${id}/`;
// DELETE COUPON
const CouponDelete = (id) => `/admin-panel/coupons/${id}/`;

//=================== REPORTS API =====================
const PerformanceReport = "/admin-panel/reports/performance/";

const SalesAnalytics = "/admin-panel/reports/sales-analytics/";

const OrderProcessing = "/admin-panel/reports/order-processing/";

const ClientInsights = "/admin-panel/reports/client-insights/";

//=========================== POLICIES API ==============================
const Policies = "/admin-panel/policies/";


//=============================== ADMIN PROFILE API ========================================
// PROFILE API view
const AdminProfile = "/admin/profile/";
//CHANGE PASSWORD API
const ChangePassword = "/admin/profile/change-password/";
//REMOVE PROFILE IMAGE
const RemoveProfileImage = "/admin/profile/remove-image/";






// ================= EXPORT FUNCTIONS =================
export const loginAdminAPI = () => loginAdmin;
export const StatsCardAPI = () => StatsCards;

export const OrderAPI = () => Order;

//==================== PRODUCT FUNCTION ==================
export const ProductAPI = () => Product;

export const ProductSubCategoryAPI = (categoryId) => {
    if (categoryId && categoryId !== "all") {
        return `${ProductSubCategory}?category=${categoryId}`;
    }
    return ProductSubCategory;
};

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

//================== APPOINTMENT APPOINTMENT =============

export const AppointmentAdminAPI = () => AppointmentAdmin;
export const AppointmentByIdAPI = (id) => AppointmentById(id);
export const AppointmentUpdateAPI = (id) => `/appointments/${id}`;

export const AppointmentExportCSVAPI = (status) =>
    `/appointments/export-csv${status !== "All" ? `?status=${status}` : ""}`;

//================== CUSTOMER ===========================
export const CustomerViewAPI = () => CustomerView;
export const RegisterUserAPI = () => RegisterUser;
export const CustomerEditAPI = (id) => CustomerEdit(id);
export const CustomerDeleteAPI = (id) => CustomerDelete(id);

//========================= COUPONS FUNCTION ==================
export const CouponViewAPI = () => CouponView;
export const CreateCouponAPI = () => CreateCoupon;
export const CouponEditAPI = (id) => CouponEdit(id);
export const CouponDeleteAPI = (id) => CouponDelete(id);

//=============== ADMIN PROFILE API FUNCTION ======================
export const UpdateCustomerAPI = (id) => `/users/customers/${id}`;

//================== ORDER API FUNCTION ====================
export const updateOrderStatusAPI = (id) =>
    `/admin-panel/orders/${id}/status`;

export const SalesChartAPI = () => SALES_CHART;

//================= REPORTS FUNCTION ======================
export const PerformanceReportAPI = () => PerformanceReport;

export const SalesAnalyticsAPI = (period = "current_month", currency = "INR") => {
    return `${SalesAnalytics}?period=${period}&currency=${currency}`;
};

//(DOWNLOAD API)
export const SalesAnalyticsDownloadAPI = (
    period = "current_month",
    currency = "INR",
    type = "pdf"
) => {
    return `${SalesAnalytics}?period=${period}&currency=${currency}&download=${type}`;
};

export const OrderProcessingAPI = (period = "last_30_days") =>
    `${OrderProcessing}?period=${period}`;

export const ClientInsightsAPI = (period = "last_30_days") =>
    `${ClientInsights}?period=${period}`;

// =============================== POLICIES API FUNCTIONS ====================================
export const PoliciesAPI = () => Policies;
// create
export const CreatePolicyAPI = () => Policies;
// update
export const UpdatePolicyAPI = (id) => `${Policies}${id}/`;
// view
export const PolicyDetailsAPI = (id) => `${Policies}${id}/`;


//======================================= ADMIN FUNCTION ====================================
export const AdminProfileAPI = () => AdminProfile;

export const ChangePasswordAPI = () => ChangePassword;

export const RemoveProfileImageAPI = () => RemoveProfileImage;