import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { api } from "../../services/api";

interface OrderDetail {
  id: number;
  vendedor: {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
  };
  precioIndividual: number;
  estado: number;
}

interface Order {
  id: number;
  fechaTransaccion: string;
  precioTotal: number;
  precioLibros: number;
  detalles: OrderDetail[];
}

const MyOrdersComp: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getPurchaseHistory();
        setOrders(data);
      } catch (err) {
        console.error('Error al cargar los pedidos:', err);
        setError('No se pudieron cargar tus pedidos. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Pedidos</h1>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Mis Pedidos</h1>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-900">Ha ocurrido un error</p>
            <p className="mt-2 text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Mis Pedidos</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">No tienes pedidos realizados todavía.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                        Pedido #{order.id}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Realizado el {format(new Date(order.fechaTransaccion), "d 'de' MMMM 'de' yyyy", { locale: es })}
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-coral-600">
                      €{order.precioTotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {order.detalles.map((detail) => (
                      <div key={detail.id} className="py-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                          <div>
                            <p className="text-sm sm:text-base font-medium text-gray-900">
                              Vendedor: {detail.vendedor.nombre} {detail.vendedor.apellidos}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Email de contacto: {detail.vendedor.email}
                            </p>
                          </div>
                          <p className="font-medium text-coral-600">
                            €{detail.precioIndividual.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total libros:</span>
                    <span className="font-medium text-gray-900">€{order.precioLibros.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Descuento (10%):</span>
                    <span className="font-medium text-green-600">-€{(order.precioLibros * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Envío:</span>
                    <span className="font-medium text-gray-900">
                      {order.precioLibros > 50 ? "Gratis" : "€5.99"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg text-coral-600 mt-4 pt-4 border-t border-gray-200">
                    <span>Total:</span>
                    <span>€{order.precioTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyOrdersComp;
