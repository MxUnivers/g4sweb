import React from 'react'

const SideBarWeb = () => {
    return (
        <aside class="slide-bar">
            <div class="offset-sidebar">
                <a class="hamburger-1 mobile-hamburger-1 ml--30" href="#"><span><i class="rt-xmark"></i></span></a>
            </div>
            {/*<!-- offset-sidebar start -->*/}
            <div class="offset-sidebar-main">
                <div class="offset-widget mb-40">
                    <div class="info-widget">
                        <img src="assets/images/logo1.svg" alt="" />
                        <p class="mb-30">
                            We must explain to you how all seds this mistakens idea denouncing pleasures and praising account.
                        </p>
                    </div>
                    <div class="info-widget info-widget2">
                        <h4 class="offset-title mb-20">Get In Touch </h4>
                        <ul>
                            <li class="info phone"><a href="tel:78090790890208806803">780 907 908 90, 208 806 803</a></li>
                            <li class="info email"><a href="email:info@webmail.com">info@webmail.com</a></li>
                            <li class="info web"><a href="www.webexample.com">www.webexample.com</a></li>
                            <li class="info location">13/A, New Pro State, NYC</li>
                        </ul>
                        <div class="offset-social-link">
                            <h4 class="offset-title mb-20">Follow Us </h4>
                            <ul class="social-icon">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                                <li><a href="#"><i class="fab fa-behance"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- offset-sidebar end -->
    <!-- side-mobile-menu start -->*/}
            <nav class="side-mobile-menu side-mobile-menu1">
                <ul id="mobile-menu-active">
                    <li class="has-dropdown firstlvl">
                        <a class="mm-link" href="index.html">Home <i class="rt-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li><a href="index.html">Main Home</a></li>
                            <li><a href="index-two.html">Fashion Home</a></li>
                            <li><a href="index-nine.html">Fashion Home Two</a></li>
                            <li><a href="index-three.html">Furniture Home</a></li>
                            <li><a href="index-four.html">Decor Home</a></li>
                            <li><a href="index-five.html">Electronics Home</a></li>
                            <li><a href="index-six.html">Grocery Home</a></li>
                            <li><a href="index-seven.html">Footwear Home</a></li>
                            <li><a href="index-eight.html">Gaming Home</a></li>
                            <li><a href="index-ten.html">Sunglass Home</a></li>
                        </ul>
                    </li>
                    <li class="has-dropdown firstlvl">
                        <a class="mm-link" href="shop.html">Shop <i class="rt-angle-down"></i></a>
                        <ul class="sub-menu mega-dropdown-mobile">
                            <li class="mega-dropdown-li">
                                <ul class="mega-dropdown-ul mm-show">
                                    <li class="dropdown-li"><a class="dropdown-link" href="shop.html">Shop</a>
                                    </li>
                                    <li class="dropdown-li"><a class="dropdown-link" href="slidebar-left.html">Left Sidebar
                                        Shop</a>
                                    </li>
                                    <li class="dropdown-li"><a class="dropdown-link" href="slidebar-right.html">Right Sidebar
                                        Shop</a>
                                    </li>
                                    <li class="dropdown-li"><a class="dropdown-link" href="full-width-shop.html">Full
                                        Width Shop</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="mega-dropdown-li">
                                <ul class="mega-dropdown-ul mm-show">
                                    <li class="dropdown-li"><a class="dropdown-link" href="product-details.html">Single Product
                                        Layout
                                        One</a>
                                    </li>
                                    <li class="dropdown-li"><a class="dropdown-link"
                                        href="product-details2.html">Single Product Layout
                                        Two</a>
                                    </li>
                                    <li class="dropdown-li"><a class="dropdown-link" href="variable-products.html">Variable Product</a>
                                    </li>
                                    <li class="dropdown-li"><a class="dropdown-link" href="grouped-products.html">Grouped Product</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="mega-dropdown-li">
                                <ul class="mega-dropdown-ul mm-show">
                                    <li class="dropdown-li"><a class="dropdown-link" href="cart.html">Cart
                                    </a>
                                    </li>
                                    <li class="dropdown-li"><a class="dropdown-link"
                                        href="checkout.html">Checkout</a>
                                    </li>
                                    <li class="dropdown-li"><a class="dropdown-link"
                                        href="account.html">My
                                        Account</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="has-dropdown firstlvl">
                        <a class="mm-link" href="index.html">Pages <i class="rt-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li><a href="about.html">About</a></li>
                            <li><a href="faq.html">FAQ{"'"}s</a></li>
                            <li><a href="error.html">Error 404</a></li>
                        </ul>
                    </li>
                    <li class="has-dropdown firstlvl">
                        <a class="mm-link" href="news.html">Blog <i class="rt-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li><a href="news.html">Blog</a></li>
                            <li><a href="news-grid.html">Blog Grid</a></li>
                            <li><a href="news-details.html">Blog Details</a></li>
                        </ul>
                    </li>
                    <li><a class="mm-link" href="contact.html">Contact</a></li>
                </ul>
            </nav>
            <div class="header-action-items header-action-items1 header-action-items-side">
                <div class="search-part">
                    <div class="search-icon action-item icon"><i class="rt-search"></i></div>
                    <div class="search-input-area">
                        <div class="container">
                            <div class="search-input-inner">
                                <select id="custom-select">
                                    <option value="hide">All Catagory</option>
                                    <option value="all">All</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="shoes">Shoes</option>
                                    <option value="shoes">Glasses</option>
                                    <option value="shoes">Bags</option>
                                    <option value="shoes">Assesories</option>
                                </select>
                                <div class="input-div">
                                    <div class="search-input-icon"><i class="rt-search mr--10"></i></div>
                                    <input class="search-input" type="text" placeholder="Search by keyword or #" />
                                </div>
                                <div class="search-close-icon"><i class="rt-xmark"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart action-item">
                    <div class="cart-nav">
                        <div class="cart-icon icon"><i class="rt-cart"></i><span class="wishlist-dot icon-dot">3</span>
                        </div>
                    </div>
                </div>
                <div class="wishlist action-item">
                    <div class="favourite-icon icon"><i class="rt-heart"></i><span class="cart-dot icon-dot">0</span>
                    </div>
                </div>
                <a href="login.html" class="account"><i class="rt-user-2"></i></a>
            </div>
            {/*<!-- side-mobile-menu end -->*/}
        </aside>
    )
}

export default SideBarWeb
