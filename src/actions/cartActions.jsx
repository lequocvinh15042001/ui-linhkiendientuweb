import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartsConstants";

export const addToCart = (_id, count) => async(dispatch, getState) => {
    const {data} = await axios.get(`http://localhost:8080/api/productelec/${_id}`)
    console.log('==', data);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.data?.id,
            name: data.data?.name,
            image: data.data?.images[0]?.url,
            price: data.data?.price,
            quantity: data.data?.quantity,
            count
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFormCart = (_id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: _id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}