import React, { useEffect, useState } from 'react';
import "./AllProduct.scss";
import { formatPrice } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Stars from '../Stars';
import StarsProduct from '../StarsProduct';
import { Table, Button, Row, Col, Pagination, Modal, Form, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
const List = () => {

    const cateId = useParams();
    console.log("kdasbjđjsn",cateId);

    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [idCate, setIdCate]=useState("");
    console.log("id Cate: ", idCate);

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page } = productList

    console.log(products);

    const num = products?.data?.totalQuantity
    // console.log(num);

    const paginationPage = (num, pageSize) => {
        let page = 0
        if ((num / pageSize) > ((num / pageSize) - (num % pageSize) / pageSize)) {
          page = ((num / pageSize) - (num % pageSize) / pageSize + 1)
        } else if ((num % pageSize) === 0) {
          page = (num / pageSize)
        }
        return page
      }
    
      let pages = paginationPage(num, pageSize)

    useEffect(() => {
        dispatch(listProducts(pageNum - 1, pageSize))
        // dispatch(listCategory())
    }, [pageNum, pageSize])

    return (
        <section className='product py-5 bg-ghost-white' id="products">
            <div className= "container flex" style={{paddingBottom:"2rem"}}>
                <h6>Chọn số lượng hiển thị</h6>
                {/* <Row className='d-flex justify-content-end align-items-center' style={{ background: 'white' }}> */}
                    <Form.Select onChange={(e) => setPageSize(e.target.value)} style={{ width: 'auto', marginLeft:"1rem" }} aria-label="Default select example">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">Tất cả</option>
                    </Form.Select>
                {/* </Row> */}
            </div>
            <div className='container'>
                <div className='product-content'>

                    <div className='product-items grid'>
                        {
                            products.data?.list?.map(product => (
                                <div className='product-item bg-white' key={product.id}>
                                    <div className='product-item-img'>
                                    <NavLink to={`/products/${product.id}`} className="link">
                                        <img src={product.images[0].url} alt="" />
                                    </NavLink>
                                    <div className="product-item-cat text-white text-uppercase bg-black">
                                        <StarsProduct stars={(product.rate)} className="product-item-cat-text"/>
                                    </div>
                                    </div>
                                    <div style={{
                                    border:"2px solid black", backgroundColor:"darkgoldenrod",
                                    padding:"2px",
                                    textAlign: "center",
                                    borderRadius: "3px",
                                    justifyContent:"center",
                                    alignItems:"center"
                                    }}>
                                        <span  className='text-white fw-5'>
                                            {product.category.name}
                                        </span>
                                    </div>
                                    <div className='product-item-body'>
                                        <h6 className="product-item-title text-pine-green fw-4 fs-15">{product.name}</h6>
                                        <div className="product-item-price text-regal-blue fw-7 fs-18">{(product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
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