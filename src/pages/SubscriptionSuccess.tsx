import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/profile');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-96px-96px)] flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <i className="fas fa-check text-2xl text-green-500"></i>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Suscripción Exitosa!</h1>
          <p className="text-gray-600 mb-6">
            ¡Gracias por unirte a Libroly Pro! Tu cuenta ha sido actualizada con éxito.
            Serás redirigido a tu perfil en unos momentos.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate('/profile')}
              className="bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 transition-colors"
            >
              Ir a mi perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
