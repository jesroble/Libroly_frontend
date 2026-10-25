import React from "react";
const FAQComp: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto px-6 py-16 sm:px-8">
        {/* Título de la página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Preguntas Frecuentes (FAQ)</h1>
          <p className="text-xl text-gray-600 mt-3">Última actualización: Junio 2025</p>
        </div>

        {/* Introducción */}
        <div className="mb-16 text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            En **Libroly**, nos preocupamos por brindarte la mejor experiencia en la compra y alquiler de libros. A continuación, podrás encontrar respuestas a las preguntas más comunes. Si necesitas más información, no dudes en ponerte en contacto con nuestro equipo.
          </p>
        </div>

        {/* Sección de preguntas */}
        <div className="space-y-8">

          {/* Pregunta 1 - ¿Cómo puedo crear una cuenta? */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">1. ¿Cómo puedo crear una cuenta?</h2>
            <p className="text-lg text-gray-600 mt-3">
              Crear una cuenta en **Libroly** es muy sencillo. Solo debes hacer clic en el botón "Registrarse" en la página de inicio, ingresar tu correo electrónico y crear una contraseña. Después, recibirás un correo de confirmación para activar tu cuenta.
            </p>
          </div>

          {/* Pregunta 2 - ¿Cómo restablecer mi contraseña? */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">2. ¿Cómo restablecer mi contraseña?</h2>
            <p className="text-lg text-gray-600 mt-3">
              Si has olvidado tu contraseña, haz clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión. Te enviaremos un enlace para restablecerla y podrás crear una nueva contraseña en minutos.
            </p>
          </div>

          {/* Pregunta 3 - ¿Qué hacer si tengo problemas con el servicio? */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">3. ¿Qué hacer si tengo problemas con el servicio?</h2>
            <p className="text-lg text-gray-600 mt-3">
              Si tienes algún inconveniente con el servicio, ya sea técnico o relacionado con tu cuenta, contacta con nuestro equipo de soporte a través del formulario de contacto en nuestra web o enviándonos un correo electrónico a <strong>soporte@libroly.com</strong>.
            </p>
          </div>

          {/* Pregunta 4 - ¿Puedo cancelar mi suscripción? */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">4. ¿Puedo cancelar mi suscripción?</h2>
            <p className="text-lg text-gray-600 mt-3">
              Sí, puedes cancelar tu suscripción en cualquier momento desde la sección "Mi cuenta" en el menú de usuario. La cancelación se reflejará en tu próxima facturación, pero seguirás teniendo acceso hasta el final del período actual.
            </p>
          </div>

          {/* Pregunta 5 - ¿Cómo puedo actualizar mis datos personales? */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">5. ¿Cómo puedo actualizar mis datos personales?</h2>
            <p className="text-lg text-gray-600 mt-3">
              Para actualizar tus datos personales, ingresa a "Mi cuenta" y podrás modificar tu dirección de correo electrónico, nombre, dirección de envío y otros detalles.
            </p>
          </div>

          {/* Pregunta 6 - ¿El servicio es seguro? */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">6. ¿El servicio es seguro?</h2>
            <p className="text-lg text-gray-600 mt-3">
              Sí, en **Libroly** utilizamos encriptación avanzada y seguimos los más altos estándares de seguridad para proteger tus datos personales y de pago, asegurando que tu experiencia sea completamente segura.
            </p>
          </div>

          {/* Pregunta 7 - Contacto */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900">7. ¿Cómo puedo contactar con el soporte?</h2>
            <p className="text-lg text-gray-600 mt-3">
              Si tienes alguna otra duda, puedes ponerte en contacto con nosotros a través del correo electrónico <strong>soporte@libroly.com</strong>. Estaremos encantados de ayudarte con cualquier consulta.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>&copy; 2025 **Libroly**. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQComp;
