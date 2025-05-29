import React from 'react'
import NavBarTop from '../../components/web/NavBarTop'
import NavBarWeb from '../../components/web/NavBarWeb'
import CheckoutCompo from '../../components/web/CheckoutCompo'
import SideBarWeb from '../../components/web/SideBarWeb'
import ProductDetailSection1 from '../../components/web/productdetail/ProductDetailSection1'
import HomeFeatureProduct from '../../components/web/home/HomeFeatureProduct'


const ProductDetailPage = () => {
    return (
        <>
            <header id="rtsHeader">
                {/*!-- slide-bar start -->*/}
                <NavBarTop />
                <NavBarWeb />
                <CheckoutCompo />
                <SideBarWeb />
            </header>

            <ProductDetailSection1 />
            <HomeFeatureProduct />



        </>
    )
}

export default ProductDetailPage
