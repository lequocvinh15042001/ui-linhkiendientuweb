import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { CartContent, PageHero } from "../components";

import { useCartContext } from "../context/cart_context";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../actions/cartActions'


const CartPage = (id, amount) => {
  // const { cart } = useCartContext();

  let location = useLocation();
  const productId = useParams().id
  // console.log('==', productId)
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1
  // console.log('==', quantity)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log('==', cartItems)

  useEffect(() => {
    if (cartItems) {
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  if (cartItems.length < 1) {
    return (
      <main>
        <PageHero title="cart" />
        <Wrapper className="page">
          <div className="empty">
            <br />
            <br />
            <h2>Không có sản phẩm được thêm :(</h2> <br />
            <Link to="/products" className="btn">
              Tiếp tục mua sắm
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent cart={cartItems}/>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
  }
`;

export default CartPage;
