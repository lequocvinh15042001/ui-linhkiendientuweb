import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Pagination, Modal, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getAllOrders, listOrderAdmin } from "../../actions/orderActions";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const DashboardScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { orderAll } = useSelector(state => state.orderAll)

  const { loading, error, orders, page } = useSelector((state) => state.orderListAdmin)
  // console.log('==', productAll?.data?.length);

  // Check order
  const arrOrderAll = []
  const checkOrderAll = () => {
    orderAll?.data?.find(item => {
      if (item.state !== 'in cart') {
        arrOrderAll.push(item)
      }
    })
  }
  console.log('item', arrOrderAll)
  checkOrderAll()

  const arrOrderPage = []
  const checkOrderPage = () => {
    orders?.data?.list?.find(item => {
      if (item.state !== 'in cart') {
        arrOrderPage.push(item)
      }
    })
  }
  checkOrderPage()

  const num = arrOrderAll?.length

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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo || userInfo.role === "role_admin") {
      dispatch(getAllOrders())
      dispatch(listOrderAdmin(pageNum - 1, pageSize))
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, pageNum, pageSize])

  // Block Product
  const [show, setShow] = useState(false);
  const handleCloseBlock = () => setShow(false);
  const [idDelete, setIdDelete] = useState('')
  const handleShowBlock = (id) => {
    setShow(true);
    setIdDelete(id)
  }

  const blockHandler = (id) => {
    setShow(false);
    // dispatch(lockProduct(id))
    // window.location.reload()
  }

  // Unlock user
  const [showUnlock, setShowUnlock] = useState(false);
  const handleCloseUnlock = () => setShowUnlock(false);
  const [idUnlock, setIdUnlock] = useState('')
  const handleShowUnlock = (id) => {
    setShowUnlock(true);
    setIdUnlock(id)
  }

  const unlockHandler = (id) => {
    setShowUnlock(false);
    // dispatch(unlockUser(id))
    // window.location.reload()
  }

  return (
    <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
      <div className='d-flex align-items-center justify-content-between flex-wrap px-4' style={{ background: 'white', width: '100%' }}>
        <div className='d-flex align-items-center justify-content-between py-4'>
          <div className='d-flex align-items-center'>
            <i className='fas fa-home'></i>
            <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang điều khiển</a>
          </div>
        </div>
      </div>
      <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
        <Col className='px-0'>
          <h5 style={{fontSize: '16px'}} className='pb-4 pt-4'>TRANG ĐIỀU KHIỂN</h5>
        </Col>
        <Col className='d-flex justify-content-end px-0'>
          <h6 style={{fontSize: '14px'}} className='pb-4 pt-4'>Tổng số lượng: {arrOrderAll?.length} đơn hàng</h6>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end align-items-center mx-4 mt-0 px-4' style={{ background: 'white' }}>
        {/* <div style={{ width: 'auto', fontSize: '20px' }} className='d-flex justify-content-center align-items-center'>
          <i style={{ width: 'auto' }} className="fas fa-sort-amount-down-alt"></i>
        </div> */}
        <Form.Select onChange={(e) => setPageSize(e.target.value)} style={{ width: 'auto' }} aria-label="Default select example">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Form.Select>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='mx-4' style={{ height: 'auto' }}>
          <Table responsive striped>
            <thead style={{ background: 'white' }}>
              <tr>
                <th>#</th>
                <th>Người đặt hàng</th>
                <th className='text-center'>Tổng sản phẩm</th>
                <th className='text-end'>Tổng thanh toán</th>
                <th className='text-center'>Trạng thái đơn hàng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arrOrderPage?.map((order, index) => (
                <tr style={{ margin: '60px 0' }} key={order.id}>
                  <td style={{ fontWeight: 'bold' }}>{index + (pageNum - 1) * pageSize + 1}</td>
                  <td>{order.userName}</td>
                  <td className='text-center'>{order.totalProduct}</td>
                  <td className='text-end'>{order.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                  <td className='text-center'>
                    {
                      (order.state === 'process') ?
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#fec107', color: '#e7fff8', borderRadius: '5px' }} className='my-0 mx-3 py-1 px-2'>Chờ xác nhận</p>
                        </div> :
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px' }} className='my-0 mx-3 py-1 px-2'>Đã khóa</p>
                        </div>
                    }
                  </td>
                  <td className='d-flex justify-content-center'>
                    <LinkContainer style={{ width: 'auto', height: 'auto' }} data-tip data-for="tip1" to={`/admin/order/${order.id}/detail`}>
                      <Button
                        disabled={order.state === 'disable' ? 'true' : ''}
                        variant='secondary' className='my-0 mx-0'>
                        <i className='fas fa-eye'></i>
                      </Button>
                    </LinkContainer>
                    <ReactTooltip id="tip1" place="top" effect="solid">
                      Chi tiết
                    </ReactTooltip>

                    <LinkContainer style={{ width: 'auto', height: 'auto' }} data-tip data-for="tip2" to={`/admin/order/${order.id}/edit`}>
                      <Button
                        disabled={order.state === 'disable' ? 'true' : ''}
                        style={{ background: '#03a9f3' }}
                        className='my-0 mx-2'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <ReactTooltip id="tip2" place="top" effect="solid">
                      Chỉnh sửa
                    </ReactTooltip>

                    {/* Block product */}
                    {/* {
                      order.state === 'enable' ?
                        <Button data-tip data-for="tip3"
                          style={{ background: '#ee5261', border: '2px solid #ee5261' }}
                          className='btn-sm'
                          onClick={() => handleShowBlock(order.id)}
                        >
                          <i className="fas fa-lock"></i>
                        </Button>
                        :
                        <Button data-tip data-for="tip4"
                          style={{ background: '#00c292', border: '2px solid #00c292' }}
                          className='btn-sm'
                          onClick={() => handleShowUnlock(order.id)}
                        >
                          <i className="fas fa-unlock"></i>
                        </Button>
                    } */}
                    <ReactTooltip id="tip3" place="top" effect="solid">
                      Khóa
                    </ReactTooltip>
                    <ReactTooltip id="tip4" place="top" effect="solid">
                      Mở khóa
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {pages > 1 && (
        <div className='d-flex justify-content-center'>
          <Pagination>
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item className='mx-1' active={x + 1 === page}
                key={x + 1}
                onClick={() => setPageNum(x + 1)}
              >{x + 1}</Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
      {/* Modal Block User */}
      <Modal
        show={show}
        onHide={handleCloseBlock}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn khóa sản phẩm này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBlock}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => blockHandler(idDelete)}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Unlock User */}
      <Modal
        show={showUnlock}
        onHide={handleCloseUnlock}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn mở khóa sản phẩm này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUnlock}>
            Hủy
          </Button>
          <Button variant="success" onClick={() => unlockHandler(idUnlock)}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DashboardScreen
