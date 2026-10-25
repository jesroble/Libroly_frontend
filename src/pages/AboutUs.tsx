import React from "react";

const AboutUs: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-4 px-4 flex flex-col items-center">
      <a href="/" className="logo flex items-center justify-center w-24 h-24 bg-gradient-to-br from-coral-500 to-coral-600 rounded-full overflow-hidden shadow-md border-4 border-white mb-4 mt-4">
        <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover" />
      </a>
      <h1 className="text-4xl font-bold text-coral-500 mb-4 text-center">Sobre Nosotros</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
        <span className="font-semibold text-coral-500">Libroly</span> es un proyecto dedicado a fomentar la sostenibilidad, la cultura y la comunidad a través de la compra, venta e intercambio de libros de segunda mano. Creemos que cada libro merece una segunda vida y que compartir historias es una forma poderosa de conectar personas y cuidar el planeta.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-8">
        <div className="bg-coral-50 rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl mb-2">🌱</span>
          <h2 className="text-xl font-bold text-coral-500 mb-2">Sostenibilidad</h2>
          <p className="text-gray-600 text-center">Promovemos la reutilización de libros para reducir el impacto ambiental y fomentar hábitos de consumo responsables.</p>
        </div>
        <div className="bg-coral-50 rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl mb-2">🤝</span>
          <h2 className="text-xl font-bold text-coral-500 mb-2">Comunidad</h2>
          <p className="text-gray-600 text-center">Creamos un espacio donde lectores pueden conectar, compartir recomendaciones y descubrir nuevas historias juntos.</p>
        </div>
        <div className="bg-coral-50 rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl mb-2">📚</span>
          <h2 className="text-xl font-bold text-coral-500 mb-2">Acceso a la cultura</h2>
          <p className="text-gray-600 text-center">Facilitamos el acceso a la lectura para todos, haciendo que los libros sean más asequibles y accesibles.</p>
        </div>
        <div className="bg-coral-50 rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl mb-2">💡</span>
          <h2 className="text-xl font-bold text-coral-500 mb-2">Innovación</h2>
          <p className="text-gray-600 text-center">Apostamos por la tecnología para transformar la experiencia de compra y venta de libros de segunda mano.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-coral-500 mb-2 text-center">Nuestro compromiso con los Objetivos de Desarrollo Sostenible (ODS)</h2>
        <p className="text-gray-700 text-center mb-2">TFB Books contribuye activamente a los siguientes ODS de la ONU:</p>
        <ul className="list-disc list-inside text-gray-700 text-center">
          <li><span className="font-semibold text-coral-500">ODS 4:</span> Educación de calidad – Fomentamos el acceso a la lectura y el aprendizaje para todos.</li>
          <li><span className="font-semibold text-coral-500">ODS 12:</span> Producción y consumo responsables – Promovemos la reutilización y el reciclaje de libros.</li>
          <li><span className="font-semibold text-coral-500">ODS 13:</span> Acción por el clima – Reducimos la huella ecológica al alargar la vida útil de los libros.</li>
          <li><span className="font-semibold text-coral-500">ODS 17:</span> Alianzas para lograr los objetivos – Colaboramos con comunidades y organizaciones para multiplicar el impacto positivo.</li>
        </ul>
      </div>
      <p className="text-gray-700 text-center max-w-2xl mb-4">
        Nuestro objetivo es inspirar a más personas a leer, compartir y cuidar el mundo que nos rodea. ¡Gracias por ser parte de esta comunidad y por dar una nueva vida a los libros!
      </p>
      <div className="mt-8 text-center">
        <span className="text-coral-500 font-semibold">¿Tienes preguntas o sugerencias?</span>
        <br />
        <a href="/contact" className="text-coral-500 hover:underline font-medium">Contáctanos aquí</a>
      </div>
    </main>
  );
};

export default AboutUs;
