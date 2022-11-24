import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import ReactTooltip from 'react-tooltip'
import { Container, Navbar, Nav, NavDropdown, Row, Modal, Button, Form } from 'react-bootstrap'
// import { getOrder, updateOrder } from '../actions/orderActions'
import { getUserDetails, logout, updateUserProfile } from '../../actions/userActions'
import { getAllOrders, setDeliveryOrder } from '../../actions/orderActions'

const HeaderAdmin = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [lgShow, setLgShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { orderAll } = useSelector(state => state.orderAll)
    console.log('==', orderAll)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderSetDelivery = useSelector(state => state.orderSetDelivery)
    const { success: deliverySuccess } = orderSetDelivery
    // console.log('==', userInfo)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success: successUpdate } = userUpdateProfile

    const logoutHandler = () => {
        dispatch(logout())
        window.location.href = '/admin/login'
    }

    // load page
    const loadpage = () => {
        window.location.reload(false)
    }

    // Get new notification
    const arrNotification = []
    const getNotification = () => {
        orderAll?.data?.list?.forEach(order => {
            if (order.state === 'process') {
                arrNotification.push(order.id)
            }
        })
    }
    getNotification()

    useEffect(() => {
        dispatch(getAllOrders())
        if (successUpdate) {
            window.location.reload()
        } else {
            if (!userInfo?.name) {
                dispatch(getUserDetails(userInfo.id))
            } else {
                setName(userInfo?.name)
                setPhone(userInfo?.phone)
                setAddress(userInfo?.address)
            }
        }
        //eslint-disable-next-line 
    }, [dispatch, navigate, successUpdate, deliverySuccess])

    // confirm All Order
    const confirmAllOrder = () => {
        orderAll?.data?.forEach(order => {
            if (order.state === 'process') {
                dispatch(setDeliveryOrder(order.id))
            }
        })
    }

    // Confirm Order
    const confirmOrder = (idOrder) => {
        dispatch(setDeliveryOrder(idOrder))
    }

    // Update Profile Shipper
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => {
        setShowInfo(true);
    }

    // Update profile Admin
    const updateHandler = () => {
        setShowInfo(false);
        dispatch(updateUserProfile(userInfo.id, { name: name, phone: phone, address: address }))
        const user = JSON.parse(localStorage.getItem('userInfo'))
        console.log('===', user);
        localStorage.setItem('userInfo', JSON.stringify({ ...user, name: name, phone: phone, address: address }))
    }

    return (
        <Navbar style={{ height: '100%', width: '100%' }} variant='dark' collapseOnSelect>
            <Row className='py-0 px-4 d-flex' style={{ width: 'auto', }}>
                <i data-tip data-for="tip5" onClick={loadpage} style={{ cursor: 'pointer', fontSize: '18px', color: '#f5f5f5' }} className="fas fa-redo-alt"></i>
            </Row>
            <ReactTooltip id="tip5" place="top" effect="solid">
                Tải lại trang
            </ReactTooltip>
            <ReactTooltip id="tip6" place="top" effect="solid">
                Có {arrNotification.length} thông báo mới
            </ReactTooltip>
            <Container className="justify-content-end">
                <Row className='d-flex justify-content-center align-items-center'>
                    <Navbar.Collapse>
                        <Row onClick={() => setLgShow(true)} className='py-0 d-flex justify-content-center align-items-center' style={{ width: 'auto', marginRight: '20px', position: 'relative' }}>
                            <i data-tip data-for="tip6" style={{ cursor: 'pointer', fontSize: '20px', color: '#f2f2f2' }} className="far fa-bell"></i>
                            {
                                arrNotification.length !== 0 ?
                                    <i style={{ position: 'absolute', top: '-5px', right: '-15px', color: 'red', fontSize: '8px' }} className="fas fa-circle"></i> :
                                    <i style={{ position: 'absolute', top: '-5px', right: '-15px', color: 'white', fontSize: '8px' }} className="fas fa-circle"></i>
                            }
                        </Row>
                        <Modal
                            size="lg"
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    <h5>Thông báo</h5>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row className='d-flex justify-content-end align-items-center px-2 mb-3'>
                                    {
                                        arrNotification.length !== 0 ?
                                            <Button variant="outline-primary" onClick={() => confirmAllOrder()} style={{ width: 'auto' }}>Xác nhận tất cả</Button> :
                                            <p></p>
                                    }
                                </Row>
                                {
                                    arrNotification.length !== 0 ?
                                        arrNotification.map(order => (
                                            <Row className='d-flex justify-content-between align-items-center px-2 mb-3'>
                                                <h6 style={{ fontSize: '14px', width: 'auto' }} className='mx-0'>Đơn hàng: ID
                                                    <Link to={`/admin/order/${order}/detail`}>
                                                        {' '}{order}{' '}
                                                    </Link>
                                                    yêu cầu xác nhận</h6>
                                                <Button variant="outline-primary" onClick={() => confirmOrder(order)} style={{ width: 'auto' }}>Xác nhận</Button>
                                            </Row>
                                        )) :
                                        <p style={{ textAlign: 'center' }}>Không có thông báo</p>
                                }
                            </Modal.Body>
                        </Modal>
                        {/* Update Profile Admin */}
                        <Modal show={showInfo} onHide={handleCloseInfo}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thông tin người dùng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: '14px' }}>Tên người dùng</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '14px' }}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            placeholder="Nhập tên danh mục"
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: '14px' }}>Số điện thoại</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '14px' }}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="text"
                                            placeholder="Nhập tên danh mục"
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: '14px' }}>Địa chỉ</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '14px' }}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            type="text"
                                            placeholder="Nhập tên danh mục"
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }} variant="primary" onClick={updateHandler}>
                                    Cập nhật
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Nav className='d-flex justify-content-end pe-3'>
                            {userInfo ? (
                                <NavDropdown title={`${userInfo.name}`} id='nav-dropdown-admin'>
                                    <NavDropdown.Item onClick={handleShowInfo} style={{ color: '#03a9f3' }}>Thông tin</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                            ) : <LinkContainer to='/login'>
                                <Nav.Link className='text-success'>
                                    <i className='fas fa-user'></i> Đăng nhập
                                </Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Row>
            </Container>
        </Navbar>
    )
}

export default HeaderAdmin