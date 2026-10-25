import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-gradient">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dale una Segunda Vida a los Libros
            </h1>
            <p className="text-gray-600 text-base max-w-xl">
              Únete a nuestra comunidad de lectura sostenible. Descubre libros de segunda mano que no solo te ahorran dinero, sino que también ayudan a proteger nuestro medio ambiente. Cada libro tiene una historia, sigamos manteniéndolos en circulación.
            </p>
            <div className="flex gap-4">
              <Link to="/books" className="primary-button text-sm">
                Explorar Libros
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img
                src="/images/reading.png"
                alt="Persona leyendo"
                className="relative z-10 w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;