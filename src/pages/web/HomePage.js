import React from 'react'
import NavBarTop from '../../components/web/NavBarTop'
import NavBarWeb from '../../components/web/NavBarWeb'
import SideBarWeb from '../../components/web/SideBarWeb'
import HomeDiscount from '../../components/web/home/HomeDiscount'
import CheckoutCompo from '../../components/web/CheckoutCompo'
import HomeBarner from '../../components/web/home/HomeBarner'
import HomeNewCollection from '../../components/web/home/HomeNewCollection.js'
import HomeHandPickStartSection from '../../components/web/home/HomeHandPickStartSection'
import HomeDealSection from '../../components/web/home/HomeDealSection'
import HomeFeatureProduct from '../../components/web/home/HomeFeatureProduct'
import HomePosterPromo from '../../components/web/home/HomePosterPromo'
import HomeBrands from '../../components/web/home/HomeBrands'
import HomeProductAvailable from '../../components/web/home/HomeProductAvailable'
import NavBarMobile from '../../components/web/NavBarMobile'

const HomePage = () => {
    return (
        <>

            <header id="rtsHeader">
                {/*!-- slide-bar start -->*/}
                <NavBarTop />
                <NavBarWeb />
                <NavBarMobile/>
                <CheckoutCompo />
                <SideBarWeb />
                <HomeBarner />
            </header>
            
            <HomeDiscount />
            <HomeNewCollection />
            <HomeFeatureProduct />
            <HomeDealSection />
            <HomePosterPromo />
            <HomeBrands />
            <HomeProductAvailable />

        </>
    )
}

export default HomePage
