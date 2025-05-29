import React from 'react'

const NavBarMobile = () => {
    return (
        <nav class="side-mobile-menu side-mobile-menu1">
            <ul id="mobile-menu">
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
    )
}

export default NavBarMobile
