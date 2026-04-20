import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllProductsPage from "../pages/ProductsList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menuitems" element={<AllProductsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
