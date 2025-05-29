import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { createContact } from "../redux/actions/contactActions";
import {
    FiPhone,
    FiMail,
} from "react-icons/fi"; // Import necessary icons
import { Link } from "react-router-dom";
import StoreLayout from "../components/layout/StoreLayout";

const ContactPage = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        postalCode: "",
        category: "",
        message: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value, // Handle file uploads
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(createContact(formData));
            toast.success("Votre message a été envoyé avec succès !");
            setFormData({
                name: "",
                email: "",
                phone: "",
                postalCode: "",
                category: "",
                message: "",
                file: null,
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
            toast.error("Une erreur est survenue lors de l'envoi du message.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <StoreLayout>
            {/* Header */}

            {/* Main Content */}
            <main className="px-10 pb-8 mx-10 ">
                {/* Join our team section */}
                <section className="p-8 mb-8 text-white bg-red-500">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2">
                            <h2 className="mb-4 text-2xl font-bold">Rejoignez notre équipe</h2>
                            <p className="mb-4">
                                Rejoignez notre équipe en expansion ! Nous offrons à nos employés une gamme immense d'opportunités professionnelles excitantes, récompensantes et à long terme où ils peuvent vraiment faire une différence de manière significative.
                            </p>
                            <p className="mb-4">
                                Vous ne trouverez pas la variété et la diversité des opportunités professionnelles nulle part ailleurs.
                            </p>
                            <h3 className="mb-4 text-xl font-bold">Visitez le tableau de bord G4S</h3>
                            <button className="px-4 py-2 text-red-500 bg-white rounded-md hover:bg-red-100">
                                Rejoindre notre équipe
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <img src="images/team.jpg" alt="Team Image" className="object-cover w-full h-64" />
                        </div>
                    </div>
                </section>

                {/* Contact us section */}
                <section id="contact-us" className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold text-red-500">Nous contacter</h2>
                    <p className="mb-4">
                        Pour être connecté au département pertinent, veuillez appeler notre standard téléphonique.
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-lg font-bold">Standard téléphonique G4S</h3>
                            <p>UK 08:00 - 17:00 Lundi - Vendredi</p>
                        </div>
                        <div className="flex items-center">
                            <div className="p-3 mr-4 bg-white rounded-full">
                                <FiPhone size={24} color="red" />
                            </div>
                            <p>+44 (0)20 770 7000</p>
                        </div>
                    </div>
                </section>

                {/* Contact form */}

                <section className="container w-full px-4 py-12 mx-auto">
  {/* Grille principale */}
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
    {/* Formulaire de Contact */}
    <section id="contact-form" className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Formulaire de contact</h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Nom */}
        <div>
          <label htmlFor="name" className="sr-only">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Nom complet"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Adresse email"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label htmlFor="phone" className="sr-only">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Numéro de téléphone"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Votre message..."
          ></textarea>
        </div>

        {/* Fichier */}
        <div>
          <label htmlFor="file" className="sr-only">
            Fichier
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleChange}
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
          />
        </div>

        {/* Bouton de soumission */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z"
                  ></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              "Envoyer le message"
            )}
          </button>
        </div>
      </form>
    </section>

    {/* Image Section */}
    <div className="flex items-center justify-center">
      <img src="images/contact-photo.jpg" alt="Contact" className="w-full rounded-lg shadow-md" />
    </div>
  </div>
</section>
            </main>

            
        </StoreLayout>
    );
};

export default ContactPage;