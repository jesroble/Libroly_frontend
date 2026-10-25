import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getPurchaseHistory();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Pedidos</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No tienes pedidos realizados todavía.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Pedido #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(order.fechaTransaccion), "d 'de' MMMM 'de' yyyy", { locale: es })}
                  </p>
                </div>
                <p className="text-xl font-semibold text-coral-600">
                  €{order.precioTotal.toFixed(2)}
                </p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {order.detalles.map((detail) => (
                  <div key={detail.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">
                          Vendedor: {detail.vendedor.nombre} {detail.vendedor.apellidos}
                        </p>
                        <p className="text-sm text-gray-500">
                          Email: {detail.vendedor.email}
                        </p>
                      </div>
                      <p className="text-coral-600 font-medium">
                        €{detail.precioIndividual.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

