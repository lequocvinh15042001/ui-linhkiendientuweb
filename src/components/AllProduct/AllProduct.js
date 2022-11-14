import React, { useEffect } from 'react';
import "./AllProduct.scss";
import { formatPrice } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
const List = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    console.log(products);
  
    useEffect(() => {
      dispatch(listProducts())
      // dispatch(listCategory())
    }, [])
  
  return (
        <section className='product py-5 bg-ghost-white' id = "products">
            <div className='container'>
                <div className='product-content'>
                    <div className='product-items grid'>
                        {
                            products.data?.list?.map(product => (
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
        </section>
  )
}

export default List