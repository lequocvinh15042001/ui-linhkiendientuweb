import React, { useEffect } from 'react';
import "./ProductList.scss";
import { formatPrice } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { NavLink } from 'react-router-dom';
import Error from "./../../components/Error";
import Loading from "./../../components/Loading";
const List = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    console.log(products);
  
    useEffect(() => {
      dispatch(listProducts())
      // dispatch(listCategory())
    }, [])
  
    if (loading) {
        return <Loading />;
      }
    
      if (error) {
        return <Error message="Lỗi truy vấn..." />;
      }
    
  return (
        <section className='product py-5 bg-ghost-white' id = "products">
            <div className='container'>
                <div className='product-content'>
                    <div className='section-title'>
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>Sản phẩm, link kiện điện tử</h3>
                    </div>
                    <div className='product-items grid'>
                        {
                            products.data?.list?.slice(0, 10).map(product => (
                                <div className='product-item bg-white' key = {product.id}>
                                    <div className='product-item-img'>
                                    <NavLink to={`/products/${product.id}`} className="link">
                                        <img src = {product.images[0].url} alt = "" />
                                    </NavLink>
                                        <div className = "product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>
                                    </div>
                                    <div className='product-item-body'>
                                        <h6 className = "product-item-title text-pine-green fw-4 fs-15">{product.name}</h6>
                                        <div className = "product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div style={{
                textAlign: "center",
                alignItems: "center",
                alignContent: "center",
                margin: "20px 0",
            }}>
            <NavLink className="btn" to="/products">
                Xem tất cả
            </NavLink>
            </div>

        </section>
  )
}

export default List