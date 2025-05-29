import React from 'react'

const ProductModalDetail = () => {
    return (
        <div class="product-details-popup-wrapper">
            <div class="rts-product-details-section rts-product-details-section2 product-details-popup-section">
                <div class="product-details-popup">
                    <button class="product-details-close-btn"><i class="fal fa-times"></i></button>
                    <div class="details-product-area">
                        <div class="product-thumb-area">
                            <div class="cursor"></div>
                            <div class="thumb-wrapper one filterd-items figure">
                                <div class="product-thumb zoom" onmousemove="zoom(event)"
                                    style={{backgroundImage: `url(assets/images/products/product-details.jpg)`}}><img
                                        src="assets/images/products/product-details.jpg" alt="product-thumb" />
                                </div>
                            </div>
                            <div class="thumb-wrapper two filterd-items hide">
                                <div class="product-thumb zoom" onmousemove="zoom(event)"
                                    style={{backgroundImage: `url(assets/images/products/product-filt2.jpg)`}}><img
                                        src="assets/images/products/product-filt2.jpg" alt="product-thumb" />
                                </div>
                            </div>
                            <div class="thumb-wrapper three filterd-items hide">
                                <div class="product-thumb zoom" onmousemove="zoom(event)"
                                    style={{backgroundImage: `url(assets/images/products/product-filt3.jpg)`}}><img
                                        src="assets/images/products/product-filt3.jpg" alt="product-thumb" />
                                </div>
                            </div>
                            <div class="product-thumb-filter-group">
                                <div class="thumb-filter filter-btn active" data-show=".one"><img
                                    src="assets/images/products/product-filt1.jpg" alt="product-thumb-filter" /></div>
                                <div class="thumb-filter filter-btn" data-show=".two"><img
                                    src="assets/images/products/product-filt2.jpg" alt="product-thumb-filter" /></div>
                                <div class="thumb-filter filter-btn" data-show=".three"><img
                                    src="assets/images/products/product-filt3.jpg" alt="product-thumb-filter" /></div>
                            </div>
                        </div>
                        <div class="contents">
                            <div class="product-status">
                                <span class="product-catagory">Dress</span>
                                <div class="rating-stars-group">
                                    <div class="rating-star"><i class="fas fa-star"></i></div>
                                    <div class="rating-star"><i class="fas fa-star"></i></div>
                                    <div class="rating-star"><i class="fas fa-star-half-alt"></i></div>
                                    <span>10 Reviews</span>
                                </div>
                            </div>
                            <h2 class="product-title">Wide Cotton Tunic Dress <span class="stock">In Stock</span></h2>
                            <span class="product-price"><span class="old-price">$9.35</span> $7.25</span>
                            <p>
                                Priyoshop has brought to you the Hijab 3 Pieces Combo Pack PS23. It is a
                                completely modern design and you feel comfortable to put on this hijab.
                                Buy it at the best price.
                            </p>
                            <div class="product-bottom-action">
                                <div class="cart-edit">
                                    <div class="quantity-edit action-item">
                                        <button class="button minus"><i class="fal fa-minus minus"></i></button>
                                        <input type="text" class="input" value="01" />
                                        <button class="button plus">+<i class="fal fa-plus plus"></i></button>
                                    </div>
                                </div>
                                <a href="cart.html" class="addto-cart-btn action-item"><i class="rt-basket-shopping"></i>
                                    Add To
                                    Cart</a>
                                <a href="wishlist.html" class="wishlist-btn action-item"><i class="rt-heart"></i></a>
                            </div>
                            <div class="product-uniques">
                                <span class="sku product-unipue"><span>SKU: </span> BO1D0MX8SJ</span>
                                <span class="catagorys product-unipue"><span>Categories: </span> T-Shirts, Tops, Mens</span>
                                <span class="tags product-unipue"><span>Tags: </span> fashion, t-shirts, Men</span>
                            </div>
                            <div class="share-social">
                                <span>Share:</span>
                                <a class="platform" href="http://facebook.com" target="_blank"><i
                                    class="fab fa-facebook-f"></i></a>
                                <a class="platform" href="http://twitter.com" target="_blank"><i
                                    class="fab fa-twitter"></i></a>
                                <a class="platform" href="http://behance.com" target="_blank"><i
                                    class="fab fa-behance"></i></a>
                                <a class="platform" href="http://youtube.com" target="_blank"><i
                                    class="fab fa-youtube"></i></a>
                                <a class="platform" href="http://linkedin.com" target="_blank"><i
                                    class="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModalDetail
