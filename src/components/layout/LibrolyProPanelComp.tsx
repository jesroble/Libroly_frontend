import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LibrolyProPanelComp: React.FC = () => {
  const { user } = useAuth();
  const currentPlan = localStorage.getItem('userPlan') || 'basic';

  const stats = [
    { name: 'Ventas totales', value: user?.ventasRealizadas || 0 },
    { name: 'Libros en venta', value: user?.libros?.filter(l => l.enVenta).length || 0 },
    { name: 'Visitas al perfil', value: '152' },
    { name: 'Valoración media', value: '4.8' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-coral-500 to-coral-600 p-6">
            <div className="flex items-center">
              <img
                src={user?.urlFotoPerfil || "/images/profile.png"}
                alt="Profile"
                className="h-16 w-16 rounded-full border-4 border-white"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">
                  Bienvenido a Libroly Pro, {user?.nombre}
                </h1>
                <p className="text-coral-100">
                  Plan actual: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-gray-50 rounded-lg p-4 text-center"
              >
                <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gráfico de Ventas */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Resumen de Ventas
              </h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Gráfico de ventas (próximamente)</p>
              </div>
            </div>

            {/* Últimas Ventas */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Últimas Ventas
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-16 bg-gray-200 rounded"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-8">
            {/* Estado de la Cuenta */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Estado de la Cuenta
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan actual</span>
                  <span className="font-medium text-gray-900">
                    Plan {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estado</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Activo
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próximo cobro</span>
                  <span className="font-medium text-gray-900">15 de julio, 2025</span>
                </div>
              </div>
            </div>

            {/* Límites y Uso */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Límites y Uso
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Libros en venta</span>
                    <span className="text-gray-900">23/50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-coral-500 h-2 rounded-full" style={{ width: '46%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Almacenamiento</span>
                    <span className="text-gray-900">1.2/2 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-coral-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Acciones Rápidas
              </h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-coral-500 rounded-lg hover:bg-coral-600">
                  Añadir nuevo libro
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-coral-600 bg-coral-50 rounded-lg hover:bg-coral-100">
                  Ver estadísticas
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                  Gestionar suscripción
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrolyProPanelComp;
