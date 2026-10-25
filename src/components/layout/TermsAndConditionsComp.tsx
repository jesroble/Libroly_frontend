import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto px-6 py-16 sm:px-8">
        {/* Título de la página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Términos y Condiciones</h1>
          <p className="text-xl text-gray-600 mt-3">Última actualización: Junio 2025</p>
        </div>

        {/* Introducción */}
        <div className="mb-16 text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Bienvenido a Libroly, nuestra plataforma dedicada a la venta y alquiler de libros. Al acceder y utilizar nuestros servicios, aceptas cumplir con los siguientes términos y condiciones. Te invitamos a leer cuidadosamente este documento antes de hacer uso de nuestros servicios.
          </p>
        </div>

        {/* Sección 1 - Aceptación de los términos */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">1. Aceptación de los Términos</h2>
            <p className="text-lg text-gray-600 mt-3">
              Al utilizar nuestros servicios, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestra plataforma.
            </p>
          </div>

          {/* Sección 2 - Uso del servicio */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">2. Uso del Servicio</h2>
            <p className="text-lg text-gray-600 mt-3">
              Libroly está destinado a usuarios mayores de 18 años. Al utilizar nuestros servicios, te comprometes a no violar ninguna ley local, estatal, nacional o internacional aplicable. El acceso a nuestra plataforma es bajo tu propio riesgo y responsabilidad.
            </p>
          </div>

          {/* Sección 3 - Registro y cuenta de usuario */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">3. Registro y Cuenta de Usuario</h2>
            <p className="text-lg text-gray-600 mt-3">
              Para acceder a algunas funciones de nuestro servicio, deberás crear una cuenta. Asegúrate de proporcionar información precisa y actualizada. Eres responsable de mantener la confidencialidad de tus credenciales de inicio de sesión.
            </p>
          </div>

          {/* Sección 4 - Responsabilidad del usuario */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">4. Responsabilidad del Usuario</h2>
            <p className="text-lg text-gray-600 mt-3">
              Eres responsable de la veracidad y legalidad del contenido que subas, compartas o utilices en nuestra plataforma. No debes usar nuestros servicios para realizar actividades ilícitas, incluyendo la violación de derechos de propiedad intelectual o la distribución de contenido prohibido.
            </p>
          </div>

          {/* Sección 5 - Propiedad intelectual */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">5. Propiedad Intelectual</h2>
            <p className="text-lg text-gray-600 mt-3">
              Todos los contenidos disponibles en nuestra plataforma, incluidos textos, imágenes, logotipos y marcas registradas, son propiedad de Libroly o de nuestros licenciantes. Queda prohibida la reproducción, distribución o modificación sin la debida autorización.
            </p>
          </div>

          {/* Sección 6 - Precios y pagos */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">6. Precios y Pagos</h2>
            <p className="text-lg text-gray-600 mt-3">
              Los precios de nuestros servicios de alquiler y compra de libros se indican en nuestro sitio web. Nos reservamos el derecho de modificar los precios en cualquier momento. El pago debe realizarse mediante los métodos disponibles en nuestra plataforma.
            </p>
          </div>

          {/* Sección 7 - Limitación de responsabilidad */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">7. Limitación de Responsabilidad</h2>
            <p className="text-lg text-gray-600 mt-3">
              Libroly no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso de nuestros servicios, incluyendo, sin limitación, pérdidas de datos, interrupciones del servicio o fallos técnicos.
            </p>
          </div>

          {/* Sección 8 - Modificaciones */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">8. Modificaciones</h2>
            <p className="text-lg text-gray-600 mt-3">
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor tan pronto como sean publicadas en el sitio web. Te recomendamos revisar esta página periódicamente.
            </p>
          </div>

          {/* Sección 9 - Terminación */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">9. Terminación</h2>
            <p className="text-lg text-gray-600 mt-3">
              Libroly puede suspender o terminar tu acceso a nuestros servicios en cualquier momento si consideramos que has violado estos términos o que estás utilizando nuestros servicios de manera indebida.
            </p>
          </div>

          {/* Sección 10 - Ley aplicable */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">10. Ley Aplicable</h2>
            <p className="text-lg text-gray-600 mt-3">
              Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país en el que operamos. Cualquier disputa derivada de estos términos será resuelta ante los tribunales competentes de la jurisdicción correspondiente.
            </p>
          </div>

          {/* Sección 11 - Contacto */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">11. Contacto</h2>
            <p className="text-lg text-gray-600 mt-3">
              Si tienes alguna pregunta sobre estos términos y condiciones, no dudes en contactarnos a través de <strong>soporte@libroly.com</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;

