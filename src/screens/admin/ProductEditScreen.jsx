import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Card, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listProductDetails, listProducts, updateProduct } from '../../actions/productActions'

const ProductEditScreen = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [nameCategory, setNameCategory] = useState('')
    const [quantity, setQuantity] = useState(0)

    const productId = useParams().id
    // console.log('==', productId)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { categories } = useSelector(state => state.categoryList)
    // console.log('==', categories)

    const { loading, error, product } = useSelector(state => state.productDetails)
    console.log('==', product)

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            // dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
            window.location.reload()
        } else {
            if (!product?.data?.name || product?.data?._id !== productId) {
                dispatch(listProductDetails(productId))
                dispatch(listProducts())
            } else {
                setName(product?.data?.name)
                // setDescription(product?.data?.description)
                // setPrice(product?.data?.price)
                // setNameCategory(product?.data?.category)
                // setQuantity(product?.data?.quantity)
            }
        }
    }, [dispatch, navigate, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        const product = {
            id: productId,
            name: name,
            description: description,
            price: price,
            category: nameCategory,
            quantity: quantity,
            state: 'enable',
        }
        dispatch(updateProduct())
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
            <div className='d-flex align-items-center justify-content-between py-4 px-4' style={{ background: 'white', width: '100%' }}>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <i className='fas fa-home'></i>
                        <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang điều khiển</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <a href='/admin/productlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Quản lý sản phẩm</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <Link to={`/admin/product/${productId}/edit`} className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Chỉnh sửa sản phẩm</Link>
                    </div>
                </div>
            </div>
            <Row className='d-flex align-items-center px-3 mx-0'>
                <Link to='/admin/productlist' className='d-flex align-items-center pt-4 px-4' style={{ textDecoration: 'none', color: 'black' }}>
                    <i style={{ fontSize: '25px', width: 'auto', cursor: 'pointer' }} className="fas fa-long-arrow-alt-left"></i>
                    <p style={{ width: 'auto', cursor: 'pointer' }} className='mx-0 my-0 px-2'>Quay lại</p>
                </Link>
            </Row>
            <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
                <h5 style={{fontSize: '20px'}} className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin sản phẩm</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <Row className='py-1'>
                                    <div>
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>Tên sản phẩm</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='name' placeholder='Nhập tên sản phẩm' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>Tên sản phẩm</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='name' placeholder='Nhập tên sản phẩm' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>Tên sản phẩm</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='name' placeholder='Nhập tên sản phẩm' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>Tên sản phẩm</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='name' placeholder='Nhập tên sản phẩm' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group className='d-flex justify-content-center py-3'>
                                                <Button style={{ background: '#03a9f3', border: 'none', fontSize: '14px', textTransform: 'none', width: 'auto', padding: '10px' }} type='submit'>Cập nhật danh mục</Button>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </Row>
                            </Row>
                        </>
                    )}
            </Row>
        </div>
    )
}

export default ProductEditScreen