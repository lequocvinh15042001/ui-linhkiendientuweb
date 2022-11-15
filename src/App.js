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
import AdminProductList from "./pages/adminPages/AdminProductList";
import AdminDetailProduct from "./pages/adminPages/AdminProductDetail";
import AdminEditProduct from "./pages/adminPages/AdminProductEdit";
import AdminCategoryList from "./pages/adminPages/AdminCategoryList";
import AdminCategoryDetail from "./pages/adminPages/AdminCategoryDetail";
import AdminEditCategory from "./pages/adminPages/AdminCategoryEdit";

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
      <Fragment>
      {/* <Navbar />
      <Sidebar /> */}

      <Routes>
        <Route exact path="/" element= {<Home />}/>
        <Route exact path="/about" element= {<About />}/>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route exact path="/cart" element= {<Cart />}>
        </Route>

        <Route exact path="/cart/:id" element= {<Cart />}>
        </Route>

        <Route exact path="/products" element= {<Products />}>
          
        </Route>

        <Route exact path="/history" element= { <History />}>
          
        </Route>

        <Route exact path="/scan" element = {<Scan /> }>
          
          {/* <ItemList /> */}
        </Route>

        <Route exact path="/products/:id" element={<SingleProduct />} />

        <Route exact path="/checkout" element= { <Checkout />} />

        <Route path='/shipping/:id' element={<ShippingScreen />} />

        <Route path='/payment' element={<PaymentScreen />} />
          
        <Route path="*" element={<Error />}></Route>

        {/* Admin */}
        {/* User */}
        <Route exact path="admin/userlist" element={<AdminUserList />} />
        <Route exact path="admin/user/:id/detail" element={<AdminDetailUser />} />

        {/* Category */}
        <Route exact path="admin/categorylist" element={<AdminCategoryList />} />
        <Route exact path="admin/category/:id/detail" element={<AdminCategoryDetail />} />
        <Route exact path="admin/category/:id/edit" element={<AdminEditCategory />} />
        
        {/* Product */}
        <Route exact path="admin/productlist" element={<AdminProductList />} />
        <Route exact path="admin/product/:id/detail" element={<AdminDetailProduct />} />
        <Route exact path="admin/product/:id/edit" element={<AdminEditProduct />} />

      </Routes>
      {/* <Footer /> */}
      </Fragment>
    </AuthWrapper>
  );
}

export default App;
