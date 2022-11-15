import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_SET_DELEVERY_SUCCESS,
  ORDER_SET_DELEVERY_REQUEST,
  ORDER_SET_DELEVERY_FAIL,
  ORDER_SET_PAID_REQUEST,
  ORDER_SET_PAID_SUCCESS,
  ORDER_SET_PAID_FAIL,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true, orders: [] }
    case GET_ORDER_SUCCESS:
      return { loading: false, orders: action.payload }
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Vinh
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

// Admin - Order
export const orderAllReducer = (state = { orderAll: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_ALL_SUCCESS:
      return {
        loading: false,
        orderAll: action.payload,
      }
    case ORDER_ALL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderListAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailAdminReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderSetDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SET_DELEVERY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_SET_DELEVERY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_SET_DELEVERY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderSetPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SET_PAID_REQUEST:
      return {
        loading: true,
      }
    case ORDER_SET_PAID_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_SET_PAID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}