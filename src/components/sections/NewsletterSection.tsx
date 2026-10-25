import React from 'react';
import { useNewsletter } from '../../hooks/useNewsletter';

const NewsletterSection: React.FC = () => {
  const { email, handleEmailChange } = useNewsletter();

  return (
    <section className="bg-coral-500 py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-coral-600/30 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-coral-600/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Suscríbete a nuestro boletín
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            ¡Mantente conectado! Suscríbete a nuestro boletín para recibir recomendaciones de libros y enterarte de todas nuestras novedades.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Introduce tu correo electrónico"
              className="flex-1 px-6 py-3 rounded-l-full text-gray-900 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-coral-600 font-medium rounded-r-full hover:bg-gray-50 transition duration-300"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
