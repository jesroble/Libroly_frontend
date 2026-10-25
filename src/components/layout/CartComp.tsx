import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext"; // Importar el AuthContext
import { api } from "../../services/api";
import type { Usuario } from "../../types";
import { useNavigate } from "react-router-dom";

const CartComp: React.FC = () => {
  const { state: cartState, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<'user' | 'new'>('user');

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    ageConfirmed: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        if (isAuthenticated) {
          const userData = await api.getUserById();
          setCurrentUser(userData);
          
          if (userData) {
            setForm(prev => ({
              ...prev,
              firstName: userData.nombre || "",
              lastName: userData.apellidos || "",
              email: userData.email || "",
              phone: userData.telefono || "",
              address: userData.direccion || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error loading user info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, [isAuthenticated]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddressSelection = (type: 'user' | 'new') => {
    setSelectedAddress(type);
    
    if (type === 'user' && currentUser) {
      setForm(prev => ({
        ...prev,
        firstName: currentUser.nombre || "",
        lastName: currentUser.apellidos || "",
        phone: currentUser.telefono || "",
        address: currentUser.direccion || "",
      }));
      setShowAddressForm(false);
    } else {
      setForm(prev => ({
        ...prev,
        firstName: "",
        lastName: "",
        address: "",
        zip: "",
        city: "",
        country: "",
        phone: "",
      }));
      setShowAddressForm(true);
    }
  };

  const subtotal = cartState.total;
  const discount = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  const handleCheckout = () => {
    // Simulación de pago: redirige a la página de compra finalizada con los datos del carrito y del envío
    localStorage.setItem('checkout_info', JSON.stringify({ cart: cartState, shipping: form }));
    navigate("/checkout-success", {
      state: {
        cart: cartState,
        shipping: form,
      },
      replace: true
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-coral-500"></div>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h2 className="font-extrabold mb-8 text-2xl bg-gradient-to-r from-[#f7d9cd] via-[#f0b38e] to-[#f2a06a] bg-clip-text text-transparent text-center">
        FINALIZAR PEDIDO
      </h2>

      <section className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="bg-coral-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                Dirección de Envío
              </h3>
            </div>

            <div className="p-6">
              {isAuthenticated && currentUser ? (
                <div className="space-y-4">
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAddress === 'user' 
                        ? 'border-coral-500 bg-coral-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAddressSelection('user')}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="addressType"
                          checked={selectedAddress === 'user'}
                          onChange={() => handleAddressSelection('user')}
                          className="mt-1 text-coral-500 focus:ring-coral-500"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {currentUser.nombre} {currentUser.apellidos}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>{currentUser.direccion}</div>
                            <div>Tel: {currentUser.telefono}</div>
                          </div>
                        </div>
                      </div>
                      {selectedAddress === 'user' && (
                        <span className="bg-coral-500 text-white px-2 py-1 rounded text-xs">
                          Seleccionada
                        </span>
                      )}
                    </div>
                  </div>

                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAddress === 'new' 
                        ? 'border-coral-500 bg-coral-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAddressSelection('new')}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="addressType"
                        checked={selectedAddress === 'new'}
                        onChange={() => handleAddressSelection('new')}
                        className="text-coral-500 focus:ring-coral-500"
                      />
                      <div className="font-semibold text-gray-700">
                        + Usar una dirección diferente
                      </div>
                      {selectedAddress === 'new' && (
                        <span className="bg-coral-500 text-white px-2 py-1 rounded text-xs ml-auto">
                          Seleccionada
                        </span>
                      )}
                    </div>
                  </div>

                  {showAddressForm && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h4 className="font-semibold mb-4 text-gray-700">Nueva dirección de envío</h4>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Nombre"
                            value={form.firstName}
                            onChange={handleChange}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                          />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Apellidos"
                            value={form.lastName}
                            onChange={handleChange}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                          />
                        </div>

                        <input
                          type="text"
                          name="address"
                          placeholder="Dirección completa"
                          value={form.address}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                        />

                        <div className="flex gap-4">
                          <input
                            type="text"
                            name="city"
                            placeholder="Ciudad"
                            value={form.city}
                            onChange={handleChange}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                          />
                        </div>

                        <select
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                        >
                          <option value="">Seleccionar país</option>
                          <option value="Spain">España</option>
                          <option value="France">Francia</option>
                          <option value="Germany">Alemania</option>
                          <option value="Italy">Italia</option>
                          <option value="Portugal">Portugal</option>
                        </select>

                        <input
                          type="tel"
                          name="phone"
                          placeholder="Teléfono"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">Introduce tu dirección de envío:</p>
                  
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      value={form.firstName}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Apellidos"
                      value={form.lastName}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Dirección completa"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                  />

                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="Ciudad"
                      value={form.city}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="Código Postal"
                      value={form.zip}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>

                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                  >
                    <option value="">Seleccionar país</option>
                    <option value="Spain">España</option>
                    <option value="France">Francia</option>
                    <option value="Germany">Alemania</option>
                    <option value="Italy">Italia</option>
                    <option value="Portugal">Portugal</option>
                  </select>

                  <div className="flex gap-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Teléfono"
                      value={form.phone}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Opciones de entrega */}
          {cartState.items.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <span className="bg-coral-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Opciones de entrega
                </h4>
              </div>
              <div className="p-6 space-y-3">
                <label className="flex items-center justify-between p-4 border-2 border-coral-500 bg-coral-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      defaultChecked
                      className="text-coral-500 focus:ring-coral-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">ENTREGA ESTÁNDAR</p>
                      <p className="text-sm text-gray-600">2 - 7 días laborables</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">
                    {shipping === 0 ? "GRATIS" : `€${shipping.toFixed(2)}`}
                  </span>
                </label>

                <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      className="text-coral-500 focus:ring-coral-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">ENTREGA EXPRESS</p>
                      <p className="text-sm text-gray-600">1 - 2 días laborables</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">€9.99</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Resumen del pedido */}
        <div className="lg:w-96 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-lg">RESUMEN DEL PEDIDO</h3>
          </div>

          <div className="p-6">
            <div className="max-h-60 overflow-y-auto mb-4">
              {cartState.items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
              ) : (
                cartState.items.map((item) => (
                  <div key={item.id} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 flex gap-3 items-center">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.title}</p>
                      {item.author && (
                        <p className="text-xs text-gray-500">por {item.author}</p>
                      )}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">Cantidad: {item.quantity}</span>
                        <span className="font-bold">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 px-3 py-1 rounded-full bg-coral-100 text-coral-600 hover:bg-coral-200 transition-colors text-xs font-semibold"
                      title="Eliminar libro del carrito"
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartState.items.length > 0 && (
              <>
                <div className="space-y-2 text-sm border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartState.itemCount} libros):</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Descuento (10%):</span>
                    <span>-€{discount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span>{shipping === 0 ? "GRATIS" : `€${shipping.toFixed(2)}`}</span>
                  </div>

                  {shipping === 0 && (
                    <p className="text-xs text-green-600">
                      ¡Envío gratis por compras superiores a €50!
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total a pagar:</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-400">IVA incluido. Ver detalles del IVA.</p>

                <div className="mt-6 flex justify-center gap-6">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    alt="Visa"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="MasterCard"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                    alt="American Express"
                    className="h-6"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {cartState.items.length > 0 && (
        <>
          {/* Confirmación y términos */}
          <section className="mt-6 max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <label className="inline-flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="ageConfirmed"
                  checked={form.ageConfirmed}
                  onChange={handleChange}
                  className="mt-1 rounded text-coral-500 focus:ring-coral-500"
                />
                <span>
                  Confirmo que tengo al menos 18 años de edad. Acepto y consiento
                  los{" "}
                  <a
                    href="#"
                    className="underline text-coral-600 hover:text-coral-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    términos y condiciones de facturación
                  </a>
                  , la{" "}
                  <a
                    href="#"
                    className="underline text-coral-600 hover:text-coral-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    política de privacidad
                  </a>
                  , y otras políticas aplicables.
                </span>
              </label>
            </div>
          </section>

          {/* Botón de finalizar compra */}
          <section className="mt-6 max-w-4xl">
            <button
              disabled={!form.ageConfirmed}
              onClick={handleCheckout}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all duration-200 ${
                form.ageConfirmed
                  ? "bg-coral-500 hover:bg-coral-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              FINALIZAR COMPRA - €{total.toFixed(2)}
            </button>
          </section>
        </>
      )}
    </main>
  );
};

export default CartComp;