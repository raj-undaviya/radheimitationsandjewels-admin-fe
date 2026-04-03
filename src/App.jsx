import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// Admin Login
import AdminLogin from "./page/admin/AdminLogin";

// Pages
import Dashboard from "./page/admin/Dashboardpage";
import Inventory from "./page/admin/Inventory";
import Addproductpage from "./page/admin/Addproductpage";
import Orders from "./page/admin/Orders";
import CustomerPage from "./page/admin/Customerpage";
import CollectionPage from "./page/admin/CollectionPage";
import Subcategory from "./components/subcategory/Subcategory";
import Reports from "./page/admin/Reports";
import CouponsPage from "./page/admin/CouponsPage";
import PoliciesPage from "./page/admin/PoliciesPage";
import ProfilePage from "./page/admin/ProfilePage";
import SettingPage from "./page/admin/SettingPage";

// Protected route guard
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const user = JSON.parse(localStorage.getItem("adminUser"));

  // Check token + admin role
  if (!token || !user || !user.is_staff) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*Default redirect TO login*/}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/*Admin Login (NO layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/*Protected Admin Layout */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <MainLayout />
            </AdminRoute>
          }
        >

          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* All Admin Pages */}
          <Route path="inventory" element={<Inventory />} />
          <Route path="add-product" element={<Addproductpage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="coupons" element={<CouponsPage />} />
          <Route path="policies" element={<PoliciesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingPage />} />
          <Route path="subcategory" element={<Subcategory />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;