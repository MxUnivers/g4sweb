import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreLayout from '../components/layout/StoreLayout';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const dispatch = useDispatch();
    const  navigate  =  useNavigate();

    return (
        <StoreLayout>

            <div className="mx-10 px-auto">
                {/* Hero Section */}
                <section className="relative">
                    <img src="images/bgimage.jpg" alt="Hero Image" className="w-full h-[500px] object-cover" />
                    <div className="absolute inset-0 z-20 bg-black bg-opacity-50"></div>
                    <div className="container absolute top-[20%] left-[10%] bottom-[10%] w-96 md:w-1/2 lg:w-1/3 xl:w-1/3 bg-black z-20 flex flex-col items-center justify-center px-4 py-16 mx-auto text-center text-white">
                        <h1 className="mb-4 text-4xl font-bold">Solutions de recrutement intégrées</h1>
                        <p className="mb-8 text-xl">
                            Découvrez notre combinaison d'expertise, de professionnels du recrutement, de technologie et d'analytiques des données pour gérer les talents et optimiser votre valeur.
                        </p>
                        <a href="#" className="px-6 py-3 text-3xl text-red-500 rounded-lg hover:text-red-700 hover:underline">Téléchargez le guide complet ici</a>
                    </div>
                </section>

                {/* Rapport sur le marché du recrutement */}
                <section className="container px-4 py-12 mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <img src="images/world-security-report.jpg" alt="Rapport sur le marché du recrutement" className="w-full" />
                        </div>
                        <div>
                            <h2 className="mb-4 text-3xl font-bold">Rapport sur le marché du recrutement et communiqués de presse</h2>
                            <p className="mb-6">
                                Visitez notre centre de presse pour lire nos communiqués de presse mondiaux et régionaux ou regardez la vidéo des principaux résultats du Rapport sur le marché du recrutement 2023.
                            </p>
                            <a href="#" className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600">Voir les communiqués de presse</a>
                        </div>
                    </div>
                </section>

                {/* Nos services */}
                <section id="services" className="container px-4 py-12 mx-auto">
                    <h2 className="mb-8 text-2xl font-bold text-center">Nos services</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Service 1 */}
                        <div>
                            <img src="images/security-services.jpg" alt="Services de recrutement" className="w-full mb-4 rounded-md h-96" />
                            <h3 className="mb-2 text-xl font-bold">Services de recrutement</h3>
                            <p className="mb-4 text-gray-700">
                                Avec une gamme étendue de systèmes et de produits de recrutement, nous aidons les entreprises à atteindre leurs objectifs en augmentant leurs effectifs, en réduisant les coûts de gestion des talents, en protégeant les actifs humains ou en améliorant la prestation de services aux clients.
                            </p>
                            <a href="#" className="font-medium text-red-500 hover:text-red-600">
                                En savoir plus
                            </a>
                        </div>

                        {/* Service 2 */}
                        <div>
                            <img src="images/our-history.jpg" alt="Services de conseil en recrutement" className="w-full mb-4 rounded-md h-96" />
                            <h3 className="mb-2 text-xl font-bold">Services de conseil en recrutement</h3>
                            <p className="mb-4 text-gray-700">
                                Nos services de conseil fournissent des insights stratégiques pour améliorer votre posture en matière de recrutement et votre efficacité opérationnelle.
                            </p>
                            <a href="#" className="font-medium text-red-500 hover:text-red-600">
                                En savoir plus
                            </a>
                        </div>

                        {/* Service 3 */}
                        <div>
                            <img src="images/news-article.jpg" alt="Services technologiques de recrutement" className="w-full mb-4 rounded-md h-96" />
                            <h3 className="mb-2 text-xl font-bold">Services technologiques de recrutement</h3>
                            <p className="mb-4 text-gray-700">
                                Profitez de solutions technologiques de pointe pour optimiser votre processus de recrutement et rationaliser vos opérations.
                            </p>
                            <a href="#" className="font-medium text-red-500 hover:text-red-600">
                                En savoir plus
                            </a>
                        </div>

                        {/* Ajoutez d'autres services ici si nécessaire */}
                    </div>
                </section>

                {/* Carrières */}
                <section id="careers" className="container px-4 py-12 mx-auto text-white bg-black">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <h2 className="mb-8 text-2xl font-bold">Carrières chez G4S</h2>
                            <p className="mb-8">
                                Chez [Nom de l'entreprise], vous avez accès à un monde de possibilités. Nos employés et nos services font une différence dans la vie des autres chaque jour.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="px-4 py-2 text-gray-800 bg-white rounded-full hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                {/* Répéter pour les autres réseaux sociaux */}
                            </div>
                        </div>
                        <div>
                            <h2 className="mb-8 text-2xl font-bold">Rejoignez notre équipe dynamique chez G4S</h2>
                            <button className="px-6 py-3 mb-4 text-white bg-red-500 rounded-lg hover:bg-red-600" onClick={()=>{navigate("/contact")}}>Visitez notre tableau d'emplois</button>
                            {/* Autres éléments de carrière */}
                        </div>
                    </div>
                </section>

                {/* Responsabilité sociale */}
                <section id="responsibility" className="container px-4 py-12 mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="p-6 text-white bg-red-500">
                            <h2 className="mb-4 text-2xl font-bold">Responsabilité sociale</h2>
                            <p className="mb-8">
                                En tant que leader mondial en matière de recrutement et de services connexes, l'Environnement, la Société et la Gouvernance (ESG) sont très importants pour [Nom de l'entreprise] et constituent un élément clé de notre stratégie.
                            </p>
                            {/* Liens ESG */}
                        </div>
                        <div>
                            <h2 className="mb-4 text-2xl font-bold">Notre engagement ESG</h2>
                            <p className="mb-8">
                                G4S publie son Rapport de durabilité 2023. Téléchargez notre Rapport de durabilité 2023 ici.
                            </p>
                            {/* Image ou lien supplémentaire */}
                        </div>
                    </div>
                </section>

            </div>

        </StoreLayout>

    );
};

export default Index;