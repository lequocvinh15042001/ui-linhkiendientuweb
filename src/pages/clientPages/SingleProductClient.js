import React, { Fragment } from 'react'
import { SingleProduct } from '..'
import { Footer, Navbar, Sidebar } from '../../components'
import Footerr from '../../components/Footerr'
import Navbar1 from './../../components/Navbar/Navbar'

const SingleProductClient = () => {
  return (
    <Fragment>
        <Navbar1/>
        <Sidebar/>
        <SingleProduct/>
        <Footerr/>
    </Fragment>
  )
}

export default SingleProductClient