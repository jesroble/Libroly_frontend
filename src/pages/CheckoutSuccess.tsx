import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [checkoutData] = useState(() => {
    const savedData = localStorage.getItem('checkout_info');
    return savedData ? JSON.parse(savedData) : { cart: {}, shipping: {} };
  });
  const { cart, shipping } = checkoutData;
  const [added, setAdded] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const processSuccessfulPayment = async () => {
      if (processing || !isSubscribed) return;
      setProcessing(true);

      try {
        const checkoutInfo = JSON.parse(localStorage.getItem('checkout_info') || '{}');
        const idUsuario = Number(localStorage.getItem('usuario'));

        // Paso 1: Añadir libros a la biblioteca del usuario
        try {
          const userData = await api.getUserWithBooks();
          const userIsbns = (userData.libros || []).map((l: any) => l.isbn);
          const booksToAdd = checkoutInfo.cart.items.filter((item: any) => !userIsbns.includes(item.isbn));

          for (const item of booksToAdd) {
            try {
              await api.addBookByIsbn({ idUsuario, isbn: item.isbn });
            } catch (err) {
              console.error(`Error añadiendo libro ${item.isbn}:`, err);
            }
          }
          setAdded(true);
        } catch (err) {
          console.error('Error obteniendo libros del usuario:', err);
        }

        // Paso 2: Registrar la compra
        try {
          const detallesCompra = checkoutInfo.cart.items.map((item: any) => {
            const [_isbn, vendedorId] = item.id.split('-');
            return {
              idVendedor: Number(vendedorId),
              isbn: item.isbn
            };
          });

          const precioFinal = (
            checkoutInfo.cart.total - 
            (checkoutInfo.cart.total * 0.1) + 
            (checkoutInfo.cart.total > 50 ? 0 : 5.99)
          );

          await api.createPurchase({
            compradorId: idUsuario,
            detalles: detallesCompra,
            precioFinal: precioFinal
          });
        } catch (err) {
          console.error('Error creando la compra:', err);
        }

        // Limpiar carrito
        localStorage.removeItem('cart');
        localStorage.removeItem('checkout_info');
        if ((window as any).__clearCart) (window as any).__clearCart();
      } catch (err) {
        console.error('Error general:', err);
      } finally {
        setProcessing(false);
      }
    };

    processSuccessfulPayment();
    
    return () => {
      isSubscribed = false;
    };
  }, []);

  if (processing) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full flex flex-col items-center">
          <img src="/images/logo.png" alt="Logo" className="w-16 mb-4" />
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Procesando tu compra...</h1>
          <p className="text-gray-600 text-center">Por favor espera, esto puede tomar unos momentos.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full flex flex-col items-center">
        <img src="/images/logo.png" alt="Libroly Logo" className="w-16 mb-4" />
        <h1 className="text-3xl font-bold text-coral-600 mb-2 text-center">¡Gracias por tu compra!</h1>
        {added && <p className="text-green-600 text-center text-sm mb-2">Los libros de tu compra se han añadido a tu biblioteca.</p>}
        <p className="text-gray-700 text-center mb-6">Tu pedido ha sido procesado correctamente. Pronto recibirás un email con los detalles del envío.</p>
        
        <div className="w-full mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Detalles del envío</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
            <div><span className="font-bold">Nombre:</span> {shipping?.firstName} {shipping?.lastName}</div>
            <div><span className="font-bold">Dirección:</span> {shipping?.address}</div>
            <div><span className="font-bold">Teléfono:</span> {shipping?.phone}</div>
            <div><span className="font-bold">Email:</span> {shipping?.email}</div>
          </div>
        </div>
        
        <div className="w-full mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Resumen de tu compra</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
            {cart?.items?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {cart?.items?.map((item: any) => (
                  <li key={item.id} className="py-2 flex justify-between items-center">
                    <div>
                      <span className="font-bold">{item.title}</span>
                      <span className="block text-xs text-gray-500">Cantidad: {item.quantity}</span>
                    </div>
                    <span className="text-coral-600 font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal:</span>
                <span>€{cart?.total?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Descuento (10%):</span>
                <span>-€{((cart?.total || 0) * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Envío:</span>
                <span>€{cart?.total && cart.total > 50 ? '0.00' : '5.99'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-coral-600 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>€{(
                  (cart?.total || 0) - 
                  ((cart?.total || 0) * 0.1) + 
                  (cart?.total && cart.total > 50 ? 0 : 5.99)
                ).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button
            className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 rounded-md font-semibold transition-colors"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold transition-colors"
            onClick={() => navigate("/my-orders")}
          >
            Ver mis pedidos
          </button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;