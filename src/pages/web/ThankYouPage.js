import React from 'react';
import NavBarTop from '../../components/web/NavBarTop';
import NavBarWeb from '../../components/web/NavBarWeb';
import CheckoutCompo from '../../components/web/CheckoutCompo';
import SideBarWeb from '../../components/web/SideBarWeb';
import { ROUTES } from '../../config/routing';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
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
                            <h1 class="path-title">Confirmation</h1>
                            <ul>
                                <li><a class="home-page-link" href="index.html">Home <i class="fal fa-angle-right"></i></a></li>
                                <li><a class="current-page" href="#">Merci</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>


            {/*Confirmation de la commande */}

            <div class="thanks-area">
                <div class="container">
                    <div class="section-inner">
                        <div class="section-icon">
                            <i class="fal fa-check"></i>
                        </div>
                        <div class="section-title">
                            <h2 class="sub-title">Merci pour votre commande</h2>
                            <h3 class="sect-title">Nous vous suggérons de
                            de  <br />revenir à la page d{"'"}accueil.</h3>
                        </div>
                        <div class="section-button">
                            <Link class="btn-1" to={`/${ROUTES.HOME}`}><i class="fal fa-long-arrow-left"></i> Retour à l{"'"}accueil</Link>
                            <h3>
                                Let{"'"}s track your order or
                                <Link class="btn-2" to={`/${ROUTES.CONTACT}`}> Contact </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default ThankYouPage;
