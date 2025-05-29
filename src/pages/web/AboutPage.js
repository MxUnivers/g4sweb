import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { Link } from 'react-router-dom';
import StoreLayout from '../../components/layout/StoreLayout';

const AboutPage = () => {
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <StoreLayout>
      {/* Hero Section */}
      <section className="bg-danger text-white py-5 text-center">
        <div className="container">
          <h1 className="display-5 fw-bold text-white">À propos de nous</h1>
          <p className="lead text-white">Découvrez qui nous sommes et ce que nous faisons.</p>
        </div>
      </section>

      {/* About Us */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <img
                src="assets/images/about/img-1.jpg"
                alt="À propos de E-Store"
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-4">Bienvenue sur E-Store</h2>
              <p className="text-muted mb-3">
                E-Store est une boutique en ligne fiable dédiée à la vente de produits de qualité à prix compétitif.
                Nous proposons une large gamme de produits pour tous vos besoins : mode, électronique, livres, maison et plus encore.
              </p>
              <p className="text-muted mb-4">
                Notre objectif est de rendre le shopping en ligne rapide, facile et sécurisé, avec un service client exceptionnel et une livraison express partout en France.
              </p>
              <Link to="/products" className="btn btn-danger">
                Voir les produits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Features */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center h3 mb-5">Nos Services</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1 text-danger mb-3">
                    <i className="bi bi-truck"></i>
                  </div>
                  <h5 className="card-title">Livraison Express</h5>
                  <p className="card-text text-muted">
                    Nous offrons une livraison rapide dans toute la France métropolitaine en 24 à 72h.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1 text-danger mb-3">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h5 className="card-title">Paiement Sécurisé</h5>
                  <p className="card-text text-muted">
                    Toutes nos transactions sont protégées par des systèmes de paiement sécurisés.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1 text-danger mb-3">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <h5 className="card-title">Service Client</h5>
                  <p className="card-text text-muted">
                    Notre équipe de support est disponible 24h/24 pour répondre à toutes vos questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des Catégories */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center h3 mb-5">Catégories Disponibles</h2>

          {categoriesLoading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : (
            <div className="row g-3">
              {categories.length === 0 && (
                <div className="col-12 text-center">
                  <p className="text-muted">Aucune catégorie trouvée.</p>
                </div>
              )}
              {categories.slice(0, 8).map((category) => (
                <Link key={category._id} to={`/category/${category._id}`} className="col-md-3">
                  <div className="card border shadow-sm h-100">
                    <div className="card-body d-flex flex-column align-items-center text-center">
                      <h5>{category.name}</h5>
                      <p className="text-muted small">{category.description.substring(0, 80)}...</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {categories.length > 8 && (
            <div className="text-center mt-4">
              <Link to="/categories" className="btn btn-outline-danger">
                Voir toutes les catégories
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center h3 mb-5">Foire Aux Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Comment puis-je suivre ma commande ?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Une fois votre commande expédiée, vous recevrez un email contenant un lien de suivi.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Quels modes de paiement acceptez-vous ?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Nous acceptons les cartes bancaires, PayPal et Apple Pay.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Puis-je retourner un produit ?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Oui, sous 14 jours après réception, sous réserve qu’il soit dans son emballage d’origine.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-white border-top">
        <div className="container text-center">
          <h3 className="mb-3">Prêt à faire vos achats ?</h3>
          <p className="text-muted mb-4">Parcourez notre catalogue et trouvez les meilleurs produits.</p>
          <Link to="/products" className="btn btn-lg btn-danger">
            Découvrir les produits
          </Link>
        </div>
      </section>
    </StoreLayout>
  );
};

export default AboutPage;