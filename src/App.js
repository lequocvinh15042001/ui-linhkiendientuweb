import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useThemeContext } from "./context/theme_context";
import useAlan from "./hooks/useAlan";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
  Scan,
  History,
  ItemList,
} from "./pages";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import AdminUserList from "./pages/adminPages/AdminUserList";
import AdminDetailUser from "./pages/adminPages/AdminUserDetail";
import AdminCategoryList from "./pages/adminPages/AdminCategoryList";
import AdminCategoryDetail from "./pages/adminPages/AdminCategoryDetail";
import AdminEditCategory from "./pages/adminPages/AdminCategoryEdit";
import AdminProductList from "./pages/adminPages/AdminProductList";
import AdminDetailProduct from "./pages/adminPages/AdminProductDetail";
import AdminOrdertList from "./pages/adminPages/AdminOrderList";
import HomeClient from "./pages/clientPages/HomeClient";
import AboutClient from "./pages/clientPages/AboutClient";
import CartClient from "./pages/clientPages/CartClient";
import ProductsClient from "./pages/clientPages/ProductClient";
import SingleProductClient from "./pages/clientPages/SingleProductClient";
import CheckoutClient from "./pages/clientPages/CheckoutClient";
import ShippingScreenClient from "./pages/clientPages/ShippingScreenClient";
import PaymentScreenClient from "./pages/clientPages/PaymentScreenClient";
import ErrorClient from "./pages/clientPages/ErrorClient";
import "./scss/index.scss";
import ForgotPasswordClient from "./pages/clientPages/ForgotPasswordClient";
import ChangePasswordClient from "./pages/clientPages/ChangePasswordClient";

function App() {
  const { theme } = useThemeContext();

  useAlan();

  useEffect(() => {
    if (theme === "dark-theme") {
      // set dark mode theme
      document.documentElement.className = "dark-theme";
    } else {
      // remove dark mode
      document.documentElement.className = "light-theme";
    }
  }, [theme]);

  return (
    <AuthWrapper>
        {/* <Navbar />
        <Sidebar /> */}
        <Routes>
          <Route exact path="/" element={<HomeClient />} />
          <Route exact path="/about" element={<AboutClient />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route exact path="/cart" element={<CartClient />}>
          </Route>

          <Route exact path="/cart/:id" element={<CartClient />}>
          </Route>

          <Route exact path="/products" element={<ProductsClient />}>

          </Route>

          <Route exact path="/history" element={<History />}>

          </Route>

          <Route exact path="/scan" element={<Scan />}>

            {/* <ItemList /> */}
          </Route>

          <Route exact path="/products/:id" element={<SingleProductClient />} />

          <Route exact path="/checkout" element={<CheckoutClient />} />

          <Route path='/shipping/:id' element={<ShippingScreenClient />} />

          <Route path='/payment' element={<PaymentScreenClient />} />

          <Route path="*" element={<ErrorClient />}></Route>

          <Route path='/changepassword' element={<ChangePasswordClient />} />

          <Route path='/forgotpassword' element={<ForgotPasswordClient />} />

          {/* Admin */}
          {/* Dashboard */}
          {/* <Route path='/admin/dashboard' element={<AdminDashboard />} /> */}

          {/* Admin User */}
          <Route path='/admin/userlist' element={<AdminUserList />} />
          {/* <Route path='/admin/user/:id/edit' element={<AdminUserEdit />} /> */}
          <Route path='/admin/user/:id/detail' element={<AdminDetailUser />} />

          {/* Admin Category */}
          <Route path='/admin/categorylist' element={<AdminCategoryList />} />
          <Route path='/admin/category/:id/detail' element={<AdminCategoryDetail />} />
          <Route path='/admin/category/:id/edit' element={<AdminEditCategory />} />

          {/* Admin Product */}
          <Route path='/admin/productlist' element={<AdminProductList />} exact />
          {/* <Route path='/admin/productlist/:pageNumber' element={<AdminProductList />} exact /> */}
          <Route path='/admin/product/:id/detail' element={<AdminDetailProduct />} />
          {/* <Route path='/admin/product/:id/edit' element={<AdminProductEdit />} /> */}

          {/* Admin Order */}
          <Route path='/admin/orderlist' element={<AdminOrdertList />} />

        </Routes>
        {/* <Footer /> */}
      {/* </Fragment> */}
    </AuthWrapper>
  );
}

export default App;
