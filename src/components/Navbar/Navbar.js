import React, { useState, useEffect} from 'react';
import "./Navbar.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchCategories } from '../../store/categorySlice';
// import { getCartTotal } from '../../store/cartSlice';
import { links } from "./../../utils/constants";
import { getCart } from '../../actions/cartActions';
import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const {data: categories} = useSelector((state) => state.category);
  // const {totalItems} = useSelector((state => state.cart));

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo);

  const {carts} = useSelector(state => state.cartList)
  // const { cartItems } = cart
  console.log('-=-=', carts)
  console.log(links);

  useEffect(() => {
      dispatch(getCart())
  }, [])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  //   dispatch(getCartTotal());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const logoutHandler = () => {
    //dispatch(logout())
    navigate('/')
    window.location.reload()
  }

  const renderMenuControl = () => {
    if (
        userInfo?.role === "role_admin"
    ) {
        return (
            <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Trang Admin</NavDropdown.Item>
            </LinkContainer>
        );
    } else {
        return null;
    }
  };
  return (
    <nav className = "navbar1">
      <div className='navbar1-content'>
        <div className = "container">
          <div className = "navbar1-top flex flex-between">
              <Link to = "/" className = "navbar1-brand">
                <span className = "text-regal-blue">Electric'S</span><span className='text-gold'>STORE.</span>
              </Link>

              <form className = "navbar1-search flex">
                <input className= "navbar1-search-input" type = "text" placeholder='Search here ...' />
                <button type = "submit" className = "navbar1-search-btn">
                  <i className = "fas fa-search"></i>
                </button>
              </form>

              <div className = "navbar1-btns">
                <Link to = "/cart" className="add-to-cart-btn flex">
                  <span className = "btn-ico">
                    <i className = "fas fa-shopping-cart"></i>
                  </span>
                  <div className='btn-txt fw-5'>Cart
                    <span className='cart-count-value'>{carts?.data?.totalProduct}</span>
                  </div>
                </Link>
              </div>              
          </div>
        </div>
        
        <div className='navbar1-bottom bg-regal-blue'>
          <div className='container flex flex-between'>
            <ul className = {`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button type = "button" className='navbar1-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
                <i className='fas fa-times'></i>
              </button>
              {
                links.map(link => (
                  <li key = {link.id}><Link to = {link.url} className = "nav-link text-white" onClick={() => setIsSidebarOpen(false)}>{link.text}</Link></li>
                ))
              }
              <div className = "navbar1-btns">
                <div className='navbar1-brand1'>
                  <span className = "text-white">
                  {userInfo ? (
                  <NavDropdown title={`Xin chào, ${userInfo.name}`} id='nav-dropdown'>
                      {renderMenuControl()}
                      <LinkContainer to='/profile'>
                          <NavDropdown.Item>Thông tin</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/changepassword'>
                          <NavDropdown.Item>Đổi mật khẩu</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                  </NavDropdown>
                ) : <LinkContainer to='/login'>
                    <Nav.Link className='text-primary'>
                        <i className='fas fa-user'></i> Đăng nhập
                    </Nav.Link>
                  </LinkContainer>}
                  </span>
                </div>
              </div>
              
            </ul>

            <button type = "button" className='navbar1-show-btn text-gold' onClick={() => setIsSidebarOpen(true)}>
              <i className = "fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;