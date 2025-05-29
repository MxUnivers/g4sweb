import React from 'react';

const FooterWeb = () => {
    return (
        <footer className="footer footer-1">
            <div className="container">
                {/* 📦 Services rapides */}
                <div className="footer-feature1">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                            <div className="wrapper">
                                <div className="icon"><i className="fas fa-truck"></i></div>
                                <div className="title">
                                    <h4>Livraison internationale</h4>
                                    <p>Nous expédions dans le monde entier</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                            <div className="wrapper">
                                <div className="icon"><i className="fas fa-headset"></i></div>
                                <div className="title">
                                    <h4>Support en ligne 24/7</h4>
                                    <p>Assistance en direct pour vos achats</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                            <div className="wrapper">
                                <div className="icon"><i className="fas fa-redo-alt"></i></div>
                                <div className="title">
                                    <h4>Retour gratuit</h4>
                                    <p>Retour sous 30 jours</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                            <div className="wrapper">
                                <div className="icon"><i className="fas fa-tag"></i></div>
                                <div className="title">
                                    <h4>Réductions pour les membres</h4>
                                    <p>Profitez de promotions exclusives</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🔗 Informations générales */}
                <div className="footer-inner">
                    <div className="row">
                        {/* 📜 À propos */}
                        <div className="col-xl-3 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h3>À propos</h3>
                                <p>Nous proposons une large gamme de vêtements de qualité pour hommes et femmes.</p>
                                <a href="#">En savoir plus <i className="fal fa-long-arrow-right"></i></a>
                            </div>
                        </div>

                        {/* 📌 Informations */}
                        <div className="col-xl-3 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h3>Informations</h3>
                                <ul>
                                    <li><a href="#">À propos</a></li>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">Wishlist</a></li>
                                    <li><a href="#">Panier</a></li>
                                    <li><a href="#">Paiement sécurisé</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* 👤 Mon compte */}
                        <div className="col-xl-3 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h3>Mon compte</h3>
                                <ul>
                                    <li><a href="#">Connexion</a></li>
                                    <li><a href="#">Créer un compte</a></li>
                                    <li><a href="#">Commandes</a></li>
                                    <li><a href="#">Retourner un produit</a></li>
                                    <li><a href="#">Service client</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* 📩 Abonnement Newsletter */}
                        <div className="col-xl-3 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h3>Abonnez-vous</h3>
                                <p>Recevez les dernières offres et réductions en vous abonnant à notre newsletter.</p>
                                <div className="newsletter-input">
                                    <input type="email" placeholder="Votre email" />
                                    <button>Valider</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📱 Application & paiement */}
                {/*<div className="footer-bottombar">
                    <div className="app-download">
                        <span>Commandez plus vite avec notre application !</span>
                    </div>
                    <div className="payment-methods">
                        <img src="assets/images/footer/payment2.svg" alt="Méthodes de paiement" />
                    </div>
                </div> */}
            </div>

            {/* 🎭 Réseaux sociaux & Copyright */}
            <div className="footer-bottom-area">
                <div className="container">
                    <div className="footer-bottom-inner">
                        <ul className="social-links">
                            <li><a href="#" className="platform fb"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="#" className="platform yt"><i className="fab fa-youtube"></i></a></li>
                            <li><a href="#" className="platform ttr"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#" className="platform lkd"><i className="fab fa-linkedin"></i></a></li>
                        </ul>
                        <span className="copyright">
                            © {new Date().getFullYear()} Tous droits réservés | E-commerce
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterWeb;
