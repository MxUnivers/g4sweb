import React from 'react'
import ProductStart from '../../components/web/products/ProductStart'
import NavBarTop from '../../components/web/NavBarTop'
import NavBarWeb from '../../components/web/NavBarWeb'
import CheckoutCompo from '../../components/web/CheckoutCompo'
import SideBarWeb from '../../components/web/SideBarWeb'
import ProductModalDetail from '../../components/web/products/ProductModalDetail'

const ProducListPage = () => {
  return (
    <>
    <header id="rtsHeader">
                {/*!-- slide-bar start -->*/}
                <NavBarTop />
                <NavBarWeb />
                <CheckoutCompo />
                <SideBarWeb />
            </header>

      <ProductStart/>
      <ProductModalDetail/>
    </>
  )
}

export default ProducListPage
