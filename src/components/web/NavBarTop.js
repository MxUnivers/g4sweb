import React from 'react'

const NavBarTop = () => {
    return (
        <>

            <div class="header-topbar header-topbar1 bg-dark">
                <div class="container">
                    <div class="header-top-area  bg-dark">
                        <div class="slider-div bg-dark">
                            <div class="swiper rts-topSlide1 bg-dark ">
                                <div class="swiper-wrapper bg-dark ">
                                    <div class="swiper-slide bg-dark">
                                        <h3 class="welcome-text"> Open Door To A worlds Of Fashion<a href="#">Discover
                                            Now</a></h3>
                                    </div>
                                    <div class="swiper-slide">
                                        <h3 class="welcome-text">  Enjoy free shipping on orders 100$ up<a href="#">Discover
                                            Now</a></h3>
                                    </div>
                                    <div class="swiper-slide">
                                        <h3 class="welcome-text"> Open Door To A worlds Of Fashion<a href="#">Discover
                                            Now</a></h3>
                                    </div>
                                    <div class="swiper-slide">
                                        <h3 class="welcome-text">  Enjoy free shipping on orders 100$ up<a href="#">Discover
                                            Now</a></h3>
                                    </div>
                                </div>
                                <div class="slider-navigation2">
                                    <div class="swiper-button-prev slider-btn prev"><i
                                        class="rt rt-arrow-left-long"></i></div>
                                    <div class="swiper-button-next slider-btn next"><i
                                        class="rt rt-arrow-right-long"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-topbar-menu-area">
                <div class="container">
                    <div class="menu-area1">
                        <div class="menu-item">
                            <nav class="nav navbar">
                                <div class="navbar-menu">
                                    <ul>
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">My Account</a></li>
                                        <li><a href="#">Whishlist</a></li>
                                        <li><a href="#">Order Tracking</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div class="menu-area-right-side">
                            <div class="contact"><i aria-hidden="true" class="fas fa-phone"></i>Need help? <strong>Call us:
                                <a href="call:0020500">+ 0020 500</a></strong></div>
                            <div class="topbar-select-area">
                                <select class="topbar-select custom-select">
                                    <option value="eng">English</option>
                                    <option value="esp">Español</option>
                                    <option value="ban">Bangla</option>
                                </select>
                                <select class="topbar-select custom-select2">
                                    <option value="usd">USD</option>
                                    <option value="eur">Euro</option>
                                    <option value="tk">Taka</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBarTop
