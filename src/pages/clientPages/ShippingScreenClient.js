import React, { Fragment } from 'react'
import { Footer, Navbar, Sidebar } from '../../components'
import Footerr from '../../components/Footerr'
import ShippingScreen from '../../screens/ShippingScreen'
import Navbar1 from './../../components/Navbar/Navbar'

const ShippingScreenClient = () => {
  return (
    <Fragment>
        <Navbar1/>
        <Sidebar/>
        <ShippingScreen/>
        <Footerr/>
    </Fragment>
  )
}

export default ShippingScreenClient