import React, {useEffect, useState} from 'react';
import "./CartPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { addShippingToCart, addToCart, deleteProductInCart, getCart } from '../../actions/cartActions';
import AmountButtons from '../../components/AmountButtons';
import { listProductDetails } from '../../actions/productActions';
import { AddToCart } from '../../components';

const CartPage = () => {
    let location = useLocation();
    const productId = useParams().id
    const [amount, setAmount] = useState(1);

    const [total, setTotal] = useState(0);
    // console.log('==', productId)
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1
    // console.log('==', quantity)

    const userLogin = useSelector((state)=> state.userLogin)
    console.log(userLogin.userInfo);

    const dispatch = useDispatch()
  
    const navigate = useNavigate()
  
    const {carts} = useSelector(state => state.cartList)
    // const { cartItems } = cart
    console.log('-=-=', carts)

    // const sum = () =>{
    //     carts?.data?.items.map(element => {
    //         setTotal(element.quantity * element.price)
    //     });
    // }

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    console.log(product);
    
  
    useEffect(() => {
        dispatch(getCart())
        dispatch(listProductDetails(productId))
    }, [productId, quantity])

    //nút cộng trừ
    const increase = (quantity, productId) => {
    //   setAmount((old) => {
        let temp = quantity + 1;
        if (temp > product?.data?.quantity) temp = product?.data?.quantity;
        setAmount(temp);
        console.log(productId);
        console.log('tang: ', temp);
        dispatch(addToCart(productId, temp));
        return temp;
    //   });
        
    };
    const decrease = (quantity, productId) => {
    //   setAmount((old) => {
        let temp = quantity - 1;
        if (temp < 1) temp = 1;
        setAmount(temp);
        console.log(productId);
        console.log("giam",temp);
        dispatch(addToCart(productId, temp));
        return temp;
    //   });
    };


    const handlerChoose  = (productId) =>{
        console.log("đã chọn id: ", productId);
    }

    const removeFromCartHandler = (id) => {
        dispatch(deleteProductInCart(id, navigate))
        window.location.reload();
    }
    const emptyCartMsg = <h4 className='text-red fw-6'>Không có sản phẩm được chọn!</h4>;

    return (
      <div className = "cart-page">
        <div className = "container">
          <div className = "breadcrumb">
            <ul className = "breadcrumb-items flex">
              <li className = "breadcrumb-item">
                <Link to = "/">
                  <i className = "fas fa-home"></i>
                  <span className = "breadcrumb-separator">
                    <i className = "fas fa-chevron-right"></i>
                  </span>
                </Link>
              </li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
        <div className='bg-ghost-white py-5'>
            <div className='container'>
                <div className='section-title bg-ghost-white'>
                    <h3 className = "text-uppercase fw-7 text-regal-blue ls-1">Giỏ hàng</h3>
                </div>
                {
                    carts?.data?.totalProduct === undefined || carts?.data?.totalProduct === 0 ? emptyCartMsg : (
                        <div className = "cart-content grid">
                            <div className='cart-left'>
                                <div className = "cart-items grid">
                                    {
                                        carts.data?.items?.map(cartProduct => (
                                            <div className='cart-item grid' key = {cartProduct.id}>
                                                <div className='cart-item-img flex flex-column bg-white'>
                                                    <img src = {cartProduct.image[0].url} alt = {cartProduct.name} />
                                                    <button type = "button" className='btn-square rmv-from-cart-btn' onClick={() => dispatch(removeFromCartHandler(cartProduct.itemId))}>
                                                        <span className='btn-square-icon'><i className='fas fa-trash'></i></span>
                                                    </button>
                                                </div>

                                                <div className='cart-item-info'>
                                                    <h6 className='fs-16 fw-5 text-light-blue'>{cartProduct.name}</h6>
                                                    <div className = "qty flex">
                                                        <span className = "text-light-blue qty-text">Số lượng: </span>
                                                        <div className = "qty-change flex">
                                                        <button type = "button" className='qty-dec fs-14'
                                                        onClick={() => decrease(cartProduct.quantity, cartProduct.itemId)}
                                                        
                                                        >
                                                            <i className = "fas fa-minus text-light-blue"></i>
                                                        </button>
                                                        <span className = "qty-value flex flex-center">{cartProduct.quantity}</span>
                                                        <button type = "button" className='qty-inc fs-14 text-light-blue'
                                                         onClick={() => increase(cartProduct.quantity, cartProduct.itemId)}
                                                        >
                                                            <i className = "fas fa-plus"></i>
                                                        </button>
                                                        {/* <AmountButtons
                                                            amount={amount}
                                                            increase={increase}
                                                            decrease={decrease}
                                                            key={cartProduct.itemId}

                                                            onChange={(key) => dispatch(addShippingToCart(cartProduct.itemId, key.target.value))}

                                                            onClick ={handlerChoose(cartProduct.itemId)}
                                                        /> */}

                                                        </div>
                                                    </div>
                                                    <div className = "flex flex-between">
                                                        <div className='text-pine-green fw-4 fs-15 price'>Giá : {cartProduct.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                                        <div className='sub-total fw-6 fs-18 text-regal-blue'>
                                                            <span>Tổng: </span>
                                                            <span className=''>{(cartProduct.price * cartProduct.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <button type = "button" className='btn-danger'>
                                    <span className = "fs-16">Clear Cart</span> 
                                </button> */}
                            </div>
                            <div className='cart-right bg-white'>
                                <div className = 'cart-summary text-light-blue'>
                                    <div className='cart-summary-title'>
                                        <h6 className='fs-20 fw-5'>Thông tin đơn hàng</h6>
                                    </div>
                                    <ul className = 'cart-summary-info'>
                                        <li className = "flex flex-between">
                                            <span className='fw-4'>Đã chọn {carts.data?.totalProduct} sản phẩm - Giá</span>
                                            <span className='fw-7'>{(carts.data?.totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                        </li>
                                        {/* <li className='flex flex-between'>
                                            <span className='fw-4'>Giảm giá</span>
                                            <span className='fw-7'>
                                                <span className='fw-5 text-red'>-&nbsp;</span>
                                                {formatPrice(0)}
                                            </span>
                                        </li>
                                        <li className='flex flex-between'>
                                            <span className='fw-4'>Phí vận chuyển</span>
                                            <span className='fw-7'>
                                                <span className='fw-5 text-gold'>+&nbsp;50.000VND</span>
                                            </span>
                                        </li> */}
                                    </ul>
                                    <div className='cart-summary-total flex flex-between fs-18'>
                                        <span className='fw-6'>Tổng cộng: </span>
                                        <span className='fw-6'>

                                           {total}

                                        </span>
                                    </div>
                                    <div className='cart-summary-btn'>
                                    {userLogin.userInfo ? (
                                    <Link to={`/shipping/${carts?.data?.id}`}>
                                        <button  className="btn-secondary">
                                        Thanh toán
                                        </button>
                                    </Link>
                                    ) : (
                                    <button type="button" onClick={null} className="btn-secondary">
                                        Đăng nhập để thanh toán
                                    </button>
                                    )}
                                    </div>
                                        {/* <button type = "button" className='btn-secondary'>Proceed to Checkout</button> */}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
      </div>
    )
}

export default CartPage