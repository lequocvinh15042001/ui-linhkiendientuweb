import React, { Fragment } from 'react'
import { Cart } from '..'
import { Footer, Navbar, Sidebar } from '../../components'
import Navbar1 from './../../components/Navbar/Navbar'
import Footerr from "./../../components/Footerr"

const CartClient = () => {
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <Cart/>
    <Footerr/>
    </Fragment>
  )
}

export default CartClient