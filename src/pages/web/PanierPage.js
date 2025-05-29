
import React from 'react';
import NavBarTop from '../../components/web/NavBarTop';
import NavBarWeb from '../../components/web/NavBarWeb';
import CheckoutCompo from '../../components/web/CheckoutCompo';
import SideBarWeb from '../../components/web/SideBarWeb';
import PanierSectionProductList from '../../components/web/panier/PanierSectionProductList';

const PanierPage = () => {
    return (
        <>

            <header id="rtsHeader">
                {/*!-- slide-bar start -->*/}
                <NavBarTop />
                <NavBarWeb />
                <CheckoutCompo />
                <SideBarWeb />

                <div class="page-path">
                    <div class="container">
                        <div class="breadcrumbs-inner">
                            <h1 class="path-title">Panier</h1>
                            <ul>
                                <li><a class="home-page-link" href="/">Accueil <i class="fal fa-angle-right"></i></a></li>
                                <li><a class="current-page" href="#">Panier</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>


            <PanierSectionProductList/>



        </>
    );
}

export default PanierPage;
