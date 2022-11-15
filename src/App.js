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
      <Navbar />
      <Sidebar />

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
          


        <Route path="*" element={<Error />}>
          
        </Route>
      </Routes>
      <Footer />
      </Fragment>
    </AuthWrapper>
  );
}

export default App;
