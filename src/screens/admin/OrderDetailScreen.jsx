import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, Button, Image } from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getOrderDetail } from '../../actions/orderActions';

const OrderDetailScreen = () => {
    const [isCopied, setIsCopied] = useState(false);

    const orderId = useParams().id
    // console.log('==', orderId)

    const dispatch = useDispatch()

    const { loading, error, order } = useSelector(state => state.orderDetailAdmin)
    console.log('==', order)


    useEffect(() => {
        dispatch(getOrderDetail(orderId))
    }, [dispatch, orderId])

    // Copy Text
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

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
                        <a href='/admin/orderlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Quản lý danh mục</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <Link to={`/admin/order/${orderId}/detail`} className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Chi tiết danh mục</Link>
                    </div>
                </div>
            </div>
            <Row className='d-flex align-items-center px-3 mx-0'>
                <Link to='/admin/orderlist' className='d-flex align-items-center pt-4 px-4' style={{ textDecoration: 'none', color: 'black' }}>
                    <i style={{ fontSize: '25px', width: 'auto', cursor: 'pointer' }} className="fas fa-long-arrow-alt-left"></i>
                    <p style={{ width: 'auto', cursor: 'pointer' }} className='mx-0 my-0 px-2'>Quay lại</p>
                </Link>
            </Row>
            <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
                <h5 className='d-flex justify-content-center py-3'>Chi tiết thông tin đơn hàng</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <Row className='py-2'>
                                    <Col xl={3}>
                                        <h6>ID đơn hàng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0' style={{ width: 'auto' }}>{order?.data?.id}</p>
                                        <CopyToClipboard text={order?.data?.id} onCopy={onCopyText}>
                                            <span className='px-0 mx-3' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Đã sao chép" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard>
                                    </Col>
                                </Row>
                                <Row className='py-2'>
                                    <Col xl={3}>
                                        <h6>Trạng thái đơn hàng</h6>
                                    </Col>
                                    {
                                        (order?.data?.state === 'process') ?
                                            <Col xl={8} className='d-flex justify-content-start align-items-center'>
                                                <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px' }} className='mx-0 my-0 py-1 px-2'>Hoạt động</p>
                                            </Col> :
                                            <Col xl={8} className='d-flex justify-content-start align-items-center'>
                                                <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px' }} className='mx-0 my-0 py-1 px-2'>Đã khóa</p>
                                            </Col>
                                    }
                                </Row>
                                <Row className='py-2'>
                                    <Col xl={3}>
                                        <h6>Người đặt hàng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{order?.data?.userName}</p>
                                    </Col>
                                </Row>
                                <Row className='py-2'>
                                    <Col xl={3}>
                                        <h6>Tổng loại sản phẩm</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{order?.data?.totalProduct}</p>
                                    </Col>
                                </Row>
                                <Row className='py-2'>
                                    <Col xl={3}>
                                        <h6>Tổng thanh toán</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{order?.data?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                    </Col>
                                </Row>
                                <Row className='py-2'>
                                    <Col xl={3}>
                                        <h6>Chi tiết đơn hàng</h6>
                                    </Col>
                                </Row>
                                <Row className='py-2'>
                                    {
                                        order?.data?.items?.map(item => (
                                            <Row >
                                                <Col xl={3}>
                                                    <Image style={{width: '50%'}} src={item?.image[0]?.url} alt={item.name}></Image>
                                                </Col>
                                                <Col xl={3}>{item.name}</Col>
                                            </Row>
                                        ))
                                    }
                                </Row>
                            </Row>
                        </>
                    )}
            </Row>
        </div>
    )
}

export default OrderDetailScreen