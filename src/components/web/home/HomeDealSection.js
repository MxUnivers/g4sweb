import React from 'react'

const HomeDealSection = () => {
    return (
        <div class="rts-deal-section1">
            <div class="container">
                <div class="section-inner">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div class="single-inner">
                                <div class="content-box">
                                    <div class="sub-content">
                                        <img class="line-1" src="assets/images/banner/wvbo-icon.png" alt=""/>
                                            <span class="sub-text">Deal Of The Week</span>
                                    </div>
                                    <h2 class="slider-title">Roland Grand White <br/> short T-shirt </h2>
                                    <div class="slider-description">
                                        <p>Our intent and our actions have always been informed by progress. We
                                            look at an impact report as a way to measure.</p>
                                    </div>
                                    <div class="countdown" id="countdown">
                                        <ul>
                                            <li><span id="days"></span>D</li>
                                            <li><span id="hours"></span>H</li>
                                            <li><span id="minutes"></span>M</li>
                                            <li><span id="seconds"></span>S</li>
                                        </ul>
                                    </div>
                                    <div class="content-bottom">
                                        <div class="img-box"><img src="assets/images/hand-picked/deal-icon.png" alt=""/>
                                        </div>
                                        <p class="content">Limited time offer. The deal will expires <br/>
                                            on November 12, 2025 HURRY UP!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDealSection
