import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer, productDetailsReducer, categoryListReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  getReviewReducer,
} from './reducers/productReducers'
import { cartListReducer, cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userChangePasswordReducer, userForgotPasswordReducer,
  userListReducer,
  userDeleteReducer,
  userUnlockReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer, getOrderReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

import {
  categoryListAdminReducer, categoryDetailsReducer,
  blockCategoryReducer, unlockCategoryReducer,
  createCategoryReducer
} from './reducers/categoryReducers'

const reducer = combineReducers({
  categoryListAdmin: categoryListAdminReducer,
  categoryDetails: categoryDetailsReducer,
  categoryList: categoryListReducer,
  unlockCategory: unlockCategoryReducer,
  blockCategory: blockCategoryReducer,
  createCategory: createCategoryReducer,

  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,

  getReview: getReviewReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  cartList: cartListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userChangePassword: userChangePasswordReducer,
  userForgotPassword: userForgotPasswordReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUnlock: userUnlockReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderList: getOrderReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store