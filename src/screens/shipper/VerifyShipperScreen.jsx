import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const VerifyShipperScreen = () => {
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate(redirect)
    //         window.location.reload()
    //     }
    // }, [navigate, userInfo, redirect])

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh', background: '#ffffe0' }}>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center py-3'>Xác thực tài khoản</h3>
                {/* {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>Tài khoản đã tồn tại</Message>}
                {loading && <Loader />} */}
                <Form>
                    <Form.Group controlId='username'>
                        <Form.Label>Nhập mã xác nhận</Form.Label>
                        <Form.Control autoComplete="off" type='name' placeholder='Nhập mã xác nhận' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center py-3'>
                        <Button style={{ background: '#eeb808', border: 'none' }} type='submit'>Xác thực</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )
}

export default VerifyShipperScreen