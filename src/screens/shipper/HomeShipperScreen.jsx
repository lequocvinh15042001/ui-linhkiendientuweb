import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Pagination, Row, Tab, Table, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllOrderProcessByShipper, getAllOrderByShipper, chooseOrderByShipper, paidOrderByShipper, cancelOrderByShipper } from '../../actions/orderActions'
import HeaderShipper from '../../components/shipper/HeaderShipper'

const HomeShipperScreen = () => {
  const [pageNum, setPageNum] = useState(1);

  const num = 5

  const { userInfo } = useSelector((state) => state.userLogin)
  const { orderProcess, page } = useSelector((state) => state.orderProcessListShipper)
  const { orderAllShipper } = useSelector((state) => state.orderListShipper)
  const { success: chooseSucces } = useSelector((state) => state.chooseOrderByShipper)
  const { success: paidSucces } = useSelector((state) => state.paidOrderByShipper)
  const { success: cancelSucces } = useSelector((state) => state.cancelOrderByShipper)
  // console.log('===', orderAllShipper?.data?.list);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo || userInfo.role === "role_shipper") {
      dispatch(getAllOrderProcessByShipper(pageNum - 1))
      dispatch(getAllOrderByShipper())
    } else {
      navigate('/shipper/login')
    }
  }, [dispatch, navigate, userInfo, pageNum, chooseSucces, paidSucces, cancelSucces])

  // Filter Order Delivery
  const arrDelivery = []
  const filterDelivery = () => {
    orderAllShipper?.data?.list?.forEach(order => {
      if (order.state === 'delivery') {
        arrDelivery.push(order)
      }
    })
  }

  // Filter Order Paid
  const arrPaid = []
  const filterPaid = () => {
    orderAllShipper?.data?.list?.forEach(order => {
      if (order.state === 'paid') {
        arrPaid.push(order)
      }
    })
  }

  // Filter Order Cancel
  const arrCancel = []
  const filterCancel = () => {
    orderAllShipper?.data?.list?.forEach(order => {
      if (order.state === 'process') {
        arrCancel.push(order)
      }
    })
  }

  filterDelivery()
  filterPaid()
  filterCancel()

  // Choose Order
  const chooseOrrder = (id) => {
    dispatch(chooseOrderByShipper(id))
  }

  // Paid Order
  const paidOrrder = (id) => {
    dispatch(paidOrderByShipper(id))
  }

  // Cancel Order
  const cancelOrrder = (id) => {
    dispatch(cancelOrderByShipper(id))
  }


  return (
    <Row className='mx-0 px-0 ' style={{ background: '#f5f5f5', height: '100vh', width: '100vw' }}>
      <Row className='mx-0 px-0' style={{ background: '#f5f5f5', height: '10vh' }}>
        <HeaderShipper />
      </Row>
      <Container className='my-1' style={{ background: '#f5f5f5', height: '80vh' }}>
        <Tabs
          style={{ color: 'black', background: 'white', border: 'none' }}
          defaultActiveKey="processList"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="processList" title="Đơn hàng cần giao" style={{ color: 'black', background: 'white' }}>
            <Table responsive style={{ fontSize: '13px' }}>
              <thead style={{ background: 'white' }}>
                <tr>
                  <th className='text-center'>ID đơn hàng</th>
                  <th>Tên tài khoản đặt hàng</th>
                  <th className='text-center'>Trạng thái đơn hàng</th>
                  <th className='text-center'>Chi tiết đơn hàng</th>
                  <th className='text-center'>Chọn đơn hàng</th>
                </tr>
              </thead>
              <tbody>
                {orderProcess?.data?.list?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td>{order.userName}</td>
                    <th style={{ color: '#eeb808' }} className='text-center'>Chưa giao</th>
                    <td className='text-start'>
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header style={{ fontSize: '13px' }}>Xem chi tiết</Accordion.Header>
                          <Accordion.Body>
                            <strong>Thông tin đơn hàng</strong>
                            <p className='mt-3'>- Ngày đặt hàng: {order.createdDate}</p>
                            <p>- Số lượng sản phẩm: {order.totalProduct}</p>
                            <p>- Phương thức thanh toán: {order?.receiveOrder?.paymentType}</p>
                            <p>- Tổng thanh toán: <span style={{ fontWeight: 'bold', color: 'red' }}>{order.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
                            <strong>Thông tin người nhận</strong>
                            <p className='mt-3'>- Tên người nhận: {order?.receiveOrder?.receiveName}</p>
                            <p className='mt-3'>- Số điện thoại: {order?.receiveOrder?.receivePhone}</p>
                            <p className='mt-3'>- Địa chỉ giao hàng: {order?.receiveOrder?.receiveAddress + ', ' + order?.receiveOrder?.receiveDistrict + ', ' + order?.receiveOrder?.receiveProvince + ', ' + order?.receiveOrder?.receiveVillage}</p>
                            <strong>Chi tiết đơn hàng</strong>
                            {
                              order?.items?.map(item => (
                                <Row>
                                  <Col className='mt-3'>{item.name}</Col>
                                  <Col className='mt-3'>{(item.price / item.quantity)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {item.quantity}</Col>
                                </Row>
                              ))
                            }
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </td>
                    <td className='text-center'>
                      <Button onClick={() => chooseOrrder(order.id)} className='my-0' style={{ fontSize: '13px' }} variant="success">Nhận đơn</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {num > 1 && (
              <div className='d-flex justify-content-center'>
                <Pagination>
                  {[...Array(num).keys()].map((x) => (
                    <Pagination.Item className='mx-1' active={x + 1 === page}
                      key={x + 1}
                      onClick={() => setPageNum(x + 1)}
                    >{x + 1}</Pagination.Item>
                  ))}
                </Pagination>
              </div>
            )}
          </Tab>
          <Tab eventKey="chooseList" title="Đơn hàng đã nhận">
            <Table responsive style={{ fontSize: '13px' }}>
              <thead style={{ background: 'white' }}>
                <tr>
                  <th className='text-center'>ID đơn hàng</th>
                  <th>Tên tài khoản đặt hàng</th>
                  <th className='text-center'>Trạng thái đơn hàng</th>
                  <th className='text-center'>Hủy giao</th>
                  <th className='text-center'>Giao thành công</th>
                </tr>
              </thead>
              <tbody>
                {arrDelivery?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td>{order.userName}</td>
                    <th style={{ color: '#3333ff' }} className='text-center'>Đang giao hàng</th>
                    <td className='text-center'>
                      <Button onClick={() => cancelOrrder(order.id)} className='my-0' style={{ fontSize: '13px', color: 'white' }} variant="warning">Hủy giao</Button>
                    </td>
                    <td className='text-center'>
                      <Button onClick={() => paidOrrder(order.id)} className='my-0' style={{ fontSize: '13px' }} variant="success">Thành công</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="paidList" title="Đơn hàng giao thành công">
            <Table responsive style={{ fontSize: '13px' }}>
              <thead style={{ background: 'white' }}>
                <tr>
                  <th className='text-center'>ID đơn hàng</th>
                  <th>Tên tài khoản đặt hàng</th>
                  <th className='text-center'>Trạng thái đơn hàng</th>
                  <th className='text-center'>Chọn đơn hàng</th>
                </tr>
              </thead>
              <tbody>
                {arrPaid?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td>{order.userName}</td>
                    <th style={{ color: 'green' }} className='text-center'>Giao hàng thành công</th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="cancelList" title="Đơn hàng đã hủy giao">
            <Table responsive style={{ fontSize: '13px' }}>
              <thead style={{ background: 'white' }}>
                <tr>
                  <th className='text-center'>ID đơn hàng</th>
                  <th>Tên tài khoản đặt hàng</th>
                  <th className='text-center'>Trạng thái đơn hàng</th>
                </tr>
              </thead>
              <tbody>
                {arrCancel?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td>{order.userName}</td>
                    <td>{order.state}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>
    </Row>
  )
}

export default HomeShipperScreen