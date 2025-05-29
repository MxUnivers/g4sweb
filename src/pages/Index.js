import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreLayout from '../components/layout/StoreLayout';

const Index = () => {
    const dispatch = useDispatch();


    return (
        <StoreLayout>

            <div className="mx-10 px-auto">
                {/* Hero Section */}
                <section className="relative">
                    <img src="images/bgimage.jpg" alt="Hero Image" className=" w-full h-[500px] object-cover" />
                    <div className="absolute inset-0 z-20 bg-black bg-opacity-50"></div>
                    <div className="container absolute top-[20%] left-[10%] bottom-[10%] w-96 md:w-1/2 lg:w-1/3 xl:w-1/3  bg-black  z-20 flex flex-col items-center justify-center px-4 py-16 mx-auto text-center text-white">
                        <h1 className="mb-4 text-4xl font-bold">Integrated Security Solutions</h1>
                        <p className="mb-8 text-xl">
                            Discover our combination of expertise, security professionals, technology and data analytics to manage risks and enhance value.
                        </p>
                        <a href="#" className="px-6 py-3 text-3xl text-red-500 rounded-lg hover:text-red-700 hover:underline ">Download the full guide here</a>
                    </div>
                </section>

                {/* World Security Report */}
                <section className="container px-4 py-12 mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <img src="images/world-security-report.jpg" alt="World Security Report" className="w-full" />
                        </div>
                        <div>
                            <h2 className="mb-4 text-3xl font-bold">World Security Report Press Releases</h2>
                            <p className="mb-6">
                                Visit our World Security Report Press Release Centre to read through our global and regional press releases or watch the World Security Report 2023: Key Findings video.
                            </p>
                            <a href="#" className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600">View the Press Releases</a>
                        </div>
                    </div>
                </section>

                {/* Our Services */}
                <section id="services" className="container px-4 py-12 mx-auto">
                    <h2 className="mb-8 text-2xl font-bold text-center">Our services</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Service 1 */}
                        <div>
                            <img src="images/security-services.jpg" alt="Security Services" className="w-full mb-4 rounded-md h-96" />
                            <h3 className="mb-2 text-xl font-bold">Security Services</h3>
                            <p className="mb-4 text-gray-700">
                                With an extensive range of security systems and products, we can help businesses reach their security objectives by increasing their revenues, reducing the costs of managing risk, protecting critical assets or improving service delivery to customers.
                            </p>
                            <a href="#" className="font-medium text-red-500 hover:text-red-600">
                                Read more
                            </a>
                        </div>

                        {/* Service 2 */}
                        <div>
                            <img src="images/our-history.jpg" alt="Consulting Services" className="w-full mb-4 rounded-md h-96" />
                            <h3 className="mb-2 text-xl font-bold">Consulting Services</h3>
                            <p className="mb-4 text-gray-700">
                                Our consulting services provide strategic insights to enhance your security posture and operational efficiency.
                            </p>
                            <a href="#" className="font-medium text-red-500 hover:text-red-600">
                                Read more
                            </a>
                        </div>

                        {/* Service 3 */}
                        <div>
                            <img src="images/news-article.jpg" alt="Technology Services" className="w-full mb-4 rounded-md h-96" />
                            <h3 className="mb-2 text-xl font-bold">Technology Services</h3>
                            <p className="mb-4 text-gray-700">
                                Leverage cutting-edge technology solutions to secure your assets and streamline operations.
                            </p>
                            <a href="#" className="font-medium text-red-500 hover:text-red-600">
                                Read more
                            </a>
                        </div>

                        {/* Ajoutez d'autres services ici si nécessaire */}
                    </div>
                </section>

                {/* Careers */}
                <section id="careers" className="container px-4 py-12 mx-auto text-white bg-black">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <h2 className="mb-8 text-2xl font-bold">Careers at G4S</h2>
                            <p className="mb-8">
                                At G4S you are assured a world of opportunities. Our employees and services touch the lives of others every day.
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
                            <h2 className="mb-8 text-2xl font-bold">Join our successful team at G4S</h2>
                            <button className="px-6 py-3 mb-4 text-white bg-red-500 rounded-lg hover:bg-red-600">Visit our G4S Job Board</button>
                            {/* Autres éléments de carrière */}
                        </div>
                    </div>
                </section>

                {/* Social Responsibility */}
                <section id="responsibility" className="container px-4 py-12 mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="p-6 text-white bg-red-500">
                            <h2 className="mb-4 text-2xl font-bold">Social Responsibility</h2>
                            <p className="mb-8">
                                As a global leader in security and related services, Environmental, Social & Governance (ESG) is very important to G4S and it forms a key part of our strategy.
                            </p>
                            {/* Liens ESG */}
                        </div>
                        <div>
                            <h2 className="mb-4 text-2xl font-bold">Our ESG commitment</h2>
                            <p className="mb-8">
                                G4S publishes 2023 Sustainability Report. Download our 2023 Sustainability Report here.
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