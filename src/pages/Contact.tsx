import React, { useState } from 'react';
import NewsletterSection from '../components/sections/NewsletterSection';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    setSubmitStatus('success');
    
    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  const subjectOptions = [
    'Información general',
    'Soporte técnico',
    'Colaboraciones',
    'Sugerencias',
    'Otros'
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contacta con Libroly
          </h1>
          <p className="text-gray-600">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
            Nuestro equipo está aquí para ayudarte a tener la mejor experiencia posible.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coral-500 focus:border-coral-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coral-500 focus:border-coral-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coral-500 focus:border-coral-500"
              >
                <option value="">Selecciona un asunto</option>
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coral-500 focus:border-coral-500"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-coral-500 text-white py-3 px-6 rounded-md hover:bg-coral-600 transition-colors"
            >
              Enviar mensaje
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="text-center p-4 bg-green-100 text-green-700 rounded-md">
                ¡Gracias por tu mensaje! Te responderemos pronto.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-center p-4 bg-red-100 text-red-700 rounded-md">
                Ha ocurrido un error. Por favor, inténtalo de nuevo.
              </div>
            )}
          </form>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-map-marker-alt text-coral-500 text-xl"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Dirección</h3>
            <p className="text-gray-600">Calle Principal 123<br />28001 Madrid, España</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-phone text-coral-500 text-xl"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
            <p className="text-gray-600">+34 600 123 456<br />Lun-Vie: 9:00-18:00</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-envelope text-coral-500 text-xl"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">info@libroly.com<br />soporte@libroly.com</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
};

export default Contact;
