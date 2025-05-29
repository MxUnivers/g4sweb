import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../config/routing'

const NavBarWeb = () => {
    const location = useLocation();
    return (
        <>
            <div class="navbar-sticky">
                <div class="container">
                    <div class="navbar-part navbar-part1">
                        <div class="navbar-inner">
                            <div class="left-side">
                                <div class="hamburger-1">
                                    <a href="#" class="nav-menu-link">
                                        <span class="dot1"></span>
                                        <span class="dot2"></span>
                                        <span class="dot3"></span>
                                        <span class="dot4"></span>
                                        <span class="dot5"></span>
                                        <span class="dot6"></span>
                                        <span class="dot7"></span>
                                        <span class="dot8"></span>
                                        <span class="dot9"></span>
                                    </a>
                                </div>
                                <a href="/" class="logo"><img src="assets/images/logo1.svg" alt="weiboo-logo" /></a>
                            </div>
                            <div class="rts-menu">
                                <nav class="menus menu-toggle">
                                    <ul class="nav__menu">
                                        <li class="has-dropdown"><Link class={`menu-item ${location.pathname === `/${ROUTES.HOME}` ? "active1" : ""}`} to={`/`}>Acceuil<i
                                            class="rt-plus"></i></Link>
                                        </li>
                                        <li class="has-dropdown"><Link class={`menu-item ${location.pathname === `/${ROUTES.PRODUCTS_LIST}` ? "active1" : ""}`} to={`/${ROUTES.PRODUCTS_LIST}`}>Produits<i
                                            class="rt-plus"></i></Link>
                                        </li>
                                        <li class="has-dropdown"><Link class={`menu-item ${location.pathname === `/${ROUTES.ABOUTUS}` ? "active1" : ""}`} to={`/${ROUTES.ABOUTUS}`}>Notre Boutique<i
                                            class="rt-plus"></i></Link>
                                        </li>
                                        <li class="has-dropdown"><Link class={`menu-item ${location.pathname === `/${ROUTES.CONTACT}` ? "active1" : ""}`} to={`/${ROUTES.CONTACT}`}>Contact<i
                                            class="rt-plus"></i></Link>
                                        </li>
                                        {/*<li class="has-dropdown"><a class="menu-item" href="#">Produits <i
                                            class="rt-plus"></i></a>
                                    <ul class="dropdown-ul mega-dropdown">
                                        <li class="mega-dropdown-li">
                                            <ul class="mega-dropdown-ul">
                                                <li class="dropdown-li"><a class="dropdown-link2"
                                                        href="shop.html">Shop</a>
                                                </li>
                                            </ul>
                                        </li>
                                        
                                    </ul>
                                </li> */}
                                    </ul>
                                </nav>
                            </div>
                            <div class="responsive-hamburger">
                                <div class="hamburger-1">
                                    <a href="#" class="nav-menu-link">
                                        <span class="dot1"></span>
                                        <span class="dot2"></span>
                                        <span class="dot3"></span>
                                        <span class="dot4"></span>
                                        <span class="dot5"></span>
                                        <span class="dot6"></span>
                                        <span class="dot7"></span>
                                        <span class="dot8"></span>
                                        <span class="dot9"></span>
                                    </a>
                                </div>
                            </div>
                            <div class="header-action-items header-action-items1">
                                <div class="search-part">
                                    <div class="search-icon action-item icon"><i class="rt-search"></i></div>
                                    <div class="search-input-area">
                                        <div class="container">
                                            <div class="search-input-inner">
                                                <div class="input-div">
                                                    <input id="searchInput1" class="search-input" type="text"
                                                        placeholder="Search by keyword or #" />
                                                </div>
                                                <div class="search-close-icon"><i class="rt-xmark"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to={`/${ROUTES.PROFILE}`} class="account"><i class="rt-user-2"></i></Link>
                                <div class="cart action-item">
                                    <div class="cart-nav">
                                        <div class="cart-icon icon"><a href="#0"><i aria-hidden="true"
                                            class="fas fa-shopping-basket"></i></a><span
                                                class="wishlist-dot icon-dot">3</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBarWeb
