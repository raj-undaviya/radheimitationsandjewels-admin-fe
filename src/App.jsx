import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { Navigate } from "react-router-dom";

// Pages
import Dashboard from "./page/admin/Dashboardpage";
import Inventory from "./page/admin/Inventory";
import Addproductpage from "./page/admin/Addproductpage";
import Orders from "./page/admin/Orders";
import CustomerPage from "./page/admin/Customerpage";
import CollectionPage from "./page/admin/CollectionPage";
import Reports from "./page/admin/Reports";
import CouponsPage from "./page/admin/CouponsPage";
import PoliciesPage from "./page/admin/PoliciesPage";
import ProfilePage from "./page/admin/ProfilePage";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/admin" />} />

        {/* Admin layout */}
        <Route path="/admin" element={<MainLayout />}>

          {/* Dashboard page */}
          <Route index element={<Dashboard />} />

          {/* Inventory page*/}
          <Route path="inventory" element={<Inventory />} />

          {/* Add Product Page */}
          <Route path="add-product" element={<Addproductpage />} />

          {/* Order page */}
          <Route path="orders" element={<Orders />} />

          {/* Customers page*/}
          <Route path="customers" element={<CustomerPage />} />

          {/* Collection page */}
          <Route path="collection" element={<CollectionPage />} />

          {/* Report page */}
          <Route path="reports" element={<Reports />} />

          {/* Coupon Page */}
          <Route path="/admin/coupons" element={<CouponsPage />} />

          {/* Policies Page */}
          <Route path="policies" element={<PoliciesPage />} />

          {/* Profile page */}
          <Route path="/admin/profile" element={<ProfilePage />} />
          
        </Route>

      </Routes>
    </BrowserRouter >
  );
}

export default App;