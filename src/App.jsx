import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { Navigate } from "react-router-dom";

// Pages
import Dashboard from "./page/admin/Dashboardpage";
import Inventory from "./page/admin/Inventory";
import Addproductpage from "./page/admin/Addproductpage";
import Orders from "./page/admin/Orders";
// import Customers from "./page/admin/Customers";
// import Reports from "./page/admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/admin" />} />

        {/* Admin layout */}
        <Route path="/admin" element={<MainLayout />}>

          {/* Dashboard page */}
          <Route index element={<Dashboard />} />

          {/* Inventory */}
          <Route path="inventory" element={<Inventory />} />

          {/* Add Product Page */}
          <Route path="add-product" element={<Addproductpage />} />

          {/* Order page */}
          <Route path="orders" element={<Orders />} />

        </Route>

      </Routes>
    </BrowserRouter >
  );
}

export default App;