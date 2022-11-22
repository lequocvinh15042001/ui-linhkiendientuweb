import axios from "axios";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, RESET_CART, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_FAIL,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_REQUEST,
    ORDER_ALL_REQUEST,
    ORDER_ALL_SUCCESS,
    ORDER_ALL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_SET_DELEVERY_REQUEST,
    ORDER_SET_DELEVERY_SUCCESS,
    ORDER_SET_DELEVERY_FAIL,
    ORDER_SET_PAID_REQUEST,
    ORDER_SET_PAID_SUCCESS,
    ORDER_SET_PAID_FAIL,
    SHIPPER_ORDER_ALL_PROCESS_REQUEST,
    SHIPPER_ORDER_ALL_PROCESS_SUCCESS,
    SHIPPER_ORDER_ALL_PROCESS_FAIL,
} from "../constants/orderConstants";
import { logout } from './userActions'

export const createOrders = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/order', order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
        console.log('==',data)

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.error,
        })
        console.log('==',error)
    }
}

export const resetCart = () => (dispatch) => {
    localStorage.removeItem('cartItems')
    dispatch({ type: RESET_CART })
}

export const getOrder = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ORDER_REQUEST
        })

        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }

        const { data } = await axios.get('http://localhost:8080/api/orders/getallorder', config)
        console.log("đã lấy được API: ", data);
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.error,
        })
    }
}


//Vinh
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/${id}`, config)
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: message,
      })
    }
  }
  
  export const payOrder = (orderId, paymentResult) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      )
  
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      })
    }
  }
  
  export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config
      )
  
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: message,
      })
    }
  }
  
  export const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/myorders`, config)
  
      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: message,
      })
    }
  }
  
   // Admin - Order
   export const getAllOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_ALL_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
  
      const { data } = await axios.get(`http://localhost:8080/api/admin/manage/get/orders`, config)
  
      dispatch({
        type: ORDER_ALL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_ALL_FAIL,
        payload: message,
      })
    }
  }
  
  export const listOrderAdmin = (page, size) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
  
      const { data } = await axios.get(`http://localhost:8080/api/admin/manage/orders/?page=${page}&size=${size}`, config)
  
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      })
    }
  }

  export const getOrderDetail = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAIL_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
  
      const { data } = await axios.get(`http://localhost:8080/api/admin/manage/orders/${id}`, config)
  
      dispatch({
        type: ORDER_DETAIL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_DETAIL_FAIL,
        payload: message,
      })
    }
  }

  export const setDeliveryOrder = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_SET_DELEVERY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      var config = {
        method: 'put',
        url: `http://localhost:8080/api/admin/manage/orders/setdelivery/${id}`,
        headers: { 
          'Authorization': `Bearer ${userInfo.accessToken}`
        }
      };
  
      axios(config)
      .then(function (response) {
        dispatch({
          type: ORDER_SET_DELEVERY_SUCCESS,
          payload: response.data,
        })
      })
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_SET_DELEVERY_FAIL,
        payload: message,
      })
    }
  }

  export const setPaidOrder = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_SET_PAID_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      var config = {
        method: 'put',
        url: `http://localhost:8080/api/admin/manage/orders/setpaid/${id}`,
        headers: { 
          'Authorization': `Bearer ${userInfo.accessToken}`
        }
      };
      
      axios(config)
      .then(function (response) {
        dispatch({
          type: ORDER_SET_PAID_SUCCESS,
          payload: response.data,
        })
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_SET_PAID_FAIL,
        payload: message,
      })
    }
  }

  //---------------------------------------------------- Shipper-------------------------------------------------------//
  export const getAllOrderProcessByShipper = (page) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHIPPER_ORDER_ALL_PROCESS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
  
      const { data } = await axios.get(`http://localhost:8080/api/shipper/manage/get/orders?page=${page}`, config)
  
      dispatch({
        type: SHIPPER_ORDER_ALL_PROCESS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: SHIPPER_ORDER_ALL_PROCESS_FAIL,
        payload: message,
      })
    }
  }