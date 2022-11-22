import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Pagination, Row, Tab, Table, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllOrderProcessByShipper } from '../../actions/orderActions'
import HeaderShipper from '../../components/shipper/HeaderShipper'

const HomeShipperScreen = () => {
  const [pageNum, setPageNum] = useState(1);

  const num = 5

  const { userInfo } = useSelector((state) => state.userLogin)
  const { orderProcess, page } = useSelector((state) => state.orderProcessListShipper)
  console.log('===', orderProcess?.data?.list);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo || userInfo.role === "role_shipper") {
      dispatch(getAllOrderProcessByShipper(pageNum - 1))
    } else {
      navigate('/shipper/login')
    }
  }, [dispatch, navigate, userInfo, pageNum])

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
                  <th className='text-center'>Chi tiết đơn hàng</th>
                  <th className='text-center'>Chọn đơn hàng</th>
                </tr>
              </thead>
              <tbody>
                {orderProcess?.data?.list?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td>{order.userName}</td>
                    <td className='text-start'>
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Xem chi tiết</Accordion.Header>
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
                      <Button className='my-0' style={{ fontSize: '13px' }} variant="success">Nhận đơn</Button>
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
            <p>home2</p>
          </Tab>
          <Tab eventKey="doneList" title="Đơn hàng giao thành công">
            <p>home3</p>
          </Tab>
        </Tabs>
      </Container>
    </Row>
  )
}

export default HomeShipperScreen