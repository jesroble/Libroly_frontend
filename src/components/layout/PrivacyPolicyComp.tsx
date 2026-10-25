import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto px-6 py-16 sm:px-8">
        {/* Título de la página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Política de Privacidad</h1>
          <p className="text-xl text-gray-600 mt-3">Última actualización: Junio 2025</p>
        </div>

        {/* Introducción */}
        <div className="mb-16 text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            En Libroly, nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos tus datos personales cuando interactúas con nuestros servicios. Te invitamos a leer esta política con atención.
          </p>
        </div>

        {/* Sección 1 - Información que recopilamos */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">1. Información que Recopilamos</h2>
            <p className="text-lg text-gray-600 mt-3">
              Recopilamos información personal cuando te registras en nuestro sitio, realizas una compra, o interactúas con nuestro servicio. Esta información puede incluir:
              <ul className="list-disc list-inside mt-3 text-gray-600">
                <li>Nombre y apellidos</li>
                <li>Correo electrónico</li>
                <li>Dirección de facturación y envío</li>
                <li>Información de pago</li>
                <li>Información de uso del sitio web (como cookies y datos de navegación)</li>
              </ul>
            </p>
          </div>

          {/* Sección 2 - Uso de la información */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">2. ¿Cómo Utilizamos Tu Información?</h2>
            <p className="text-lg text-gray-600 mt-3">
              Utilizamos tu información personal para los siguientes fines:
              <ul className="list-disc list-inside mt-3 text-gray-600">
                <li>Procesar tus compras y alquileres de libros</li>
                <li>Enviarte actualizaciones sobre tu cuenta y nuestros servicios</li>
                <li>Mejorar la funcionalidad de nuestro sitio web</li>
                <li>Enviarte comunicaciones promocionales (si has optado por recibirlas)</li>
                <li>Garantizar la seguridad de nuestras transacciones y proteger contra fraudes</li>
              </ul>
            </p>
          </div>

          {/* Sección 3 - Protección de tus datos */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">3. Protección de Tus Datos</h2>
            <p className="text-lg text-gray-600 mt-3">
              Tomamos medidas técnicas y organizativas para proteger tu información personal. Utilizamos encriptación avanzada en las transacciones y guardamos tus datos en servidores seguros.
            </p>
            <p className="text-lg text-gray-600 mt-3">
              Sin embargo, es importante tener en cuenta que ninguna transmisión de datos por internet puede garantizarse completamente segura. A pesar de nuestros esfuerzos, no podemos garantizar la seguridad absoluta de tus datos en todas las circunstancias.
            </p>
          </div>

          {/* Sección 4 - Compartición de datos */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">4. Compartición de Datos</h2>
            <p className="text-lg text-gray-600 mt-3">
              No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
              <ul className="list-disc list-inside mt-3 text-gray-600">
                <li>Con proveedores de servicios de confianza que nos asisten en la operación de nuestro sitio web y procesamiento de pagos</li>
                <li>Cuando sea requerido por la ley o para cumplir con un proceso judicial</li>
                <li>Para proteger nuestros derechos, propiedad o seguridad, y los de nuestros usuarios</li>
              </ul>
            </p>
          </div>

          {/* Sección 5 - Tus derechos */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">5. Tus Derechos</h2>
            <p className="text-lg text-gray-600 mt-3">
              Tienes derecho a acceder, corregir y eliminar tus datos personales en cualquier momento. Si deseas realizar alguna de estas acciones, puedes hacerlo a través de la sección "Mi cuenta" en nuestro sitio web o poniéndote en contacto con nosotros.
            </p>
            <p className="text-lg text-gray-600 mt-3">
              Además, puedes oponerte al tratamiento de tus datos personales en ciertos casos, como cuando procesamos tus datos para fines de marketing directo.
            </p>
          </div>

          {/* Sección 6 - Cookies */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">6. Uso de Cookies</h2>
            <p className="text-lg text-gray-600 mt-3">
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies nos ayudan a recordarte entre sesiones, analizar el tráfico web y personalizar el contenido que te mostramos.
            </p>
            <p className="text-lg text-gray-600 mt-3">
              Si prefieres no aceptar cookies, puedes desactivarlas en la configuración de tu navegador, pero ten en cuenta que algunas funciones de nuestro sitio pueden no estar disponibles sin ellas.
            </p>
          </div>

          {/* Sección 7 - Contacto */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">7. Contacto</h2>
            <p className="text-lg text-gray-600 mt-3">
              Si tienes preguntas o inquietudes sobre nuestra Política de Privacidad o el tratamiento de tus datos personales, no dudes en ponerte en contacto con nosotros a través de <strong>soporte@libroly.com</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
