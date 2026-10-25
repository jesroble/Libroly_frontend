import React from 'react';
import { useParams } from 'react-router-dom';
import type { BlogPost as BlogPostType } from '../types';
import NewsletterSection from '../components/sections/NewsletterSection';

// This would normally come from an API
const blogPosts: BlogPostType[] = [
  {
    id: 1,
    title: "El impacto ambiental de la lectura digital vs. tradicional",
    excerpt: "Un análisis profundo sobre cómo nuestros hábitos de lectura afectan al medio ambiente. Descubre cuál es la opción más sostenible y cómo podemos reducir nuestra huella de carbono mientras disfrutamos de la lectura.",
    content1: "La transición del papel al formato digital ha generado un debate creciente en torno a la sostenibilidad. Por un lado, los libros tradicionales requieren papel, tinta, transporte y almacenamiento, lo que conlleva una importante huella ecológica. La producción de un solo libro puede consumir hasta 7,5 kg de CO₂, sin contar con la deforestación necesaria para obtener la celulosa. Además, su distribución implica una cadena logística que consume recursos fósiles.",
    content2: "Por otro lado, los dispositivos de lectura digital, como los e-readers o tabletas, también implican un impacto ambiental relevante, especialmente en su proceso de fabricación y en el uso de minerales raros. Sin embargo, a largo plazo, un lector electrónico puede compensar su huella si se utiliza de forma intensiva, reduciendo la necesidad de imprimir cientos de libros. La clave está en la frecuencia de uso y en la gestión responsable de residuos electrónicos. En definitiva, no se trata solo de elegir entre papel o pantalla, sino de adoptar hábitos de lectura más conscientes y sostenibles.",
    imageUrl: "/images/reading.png",
    date: "29 mayo 2025",
    category: "Sostenibilidad",
    readTime: "5 min lectura"
  },
  {
    id: 2,
    title: "Beneficios de la compra-venta de libros de segunda mano",
    excerpt: "La reutilización de libros no solo es beneficiosa para el planeta, sino también para nuestra cultura y economía. Descubre cómo puedes formar parte de esta tendencia sostenible.",
    content1: "Comprar y vender libros de segunda mano es una práctica cada vez más común entre lectores conscientes. Esta tendencia promueve la economía circular al dar una segunda vida a productos que, de otro modo, quedarían olvidados en estanterías. Además, reduce significativamente la demanda de nuevos ejemplares, lo que implica menos consumo de papel, tinta y energía en procesos de fabricación y distribución. Cada libro reutilizado es una victoria frente al desperdicio y una apuesta por un consumo más responsable.",
    content2: "Pero los beneficios van más allá del impacto ambiental. La compra-venta de libros usados también facilita el acceso a la lectura a precios más asequibles, democratizando el conocimiento. Asimismo, fomenta comunidades locales y plataformas colaborativas donde se comparte no solo un objeto, sino también una historia. Participar en este ciclo no solo aligera la carga ecológica, sino que fortalece el vínculo entre lectores, cultura y sostenibilidad.", 
    imageUrl: "/images/learning.png",
    date: "28 mayo 2025",
    category: "Economía Circular",
    readTime: "4 min lectura"
  },
  {
    id: 3,
    title: "Cómo mantener tus libros en buen estado",
    excerpt: "Guía práctica para conservar tus libros y maximizar su vida útil. Consejos expertos para el cuidado y mantenimiento de tu biblioteca personal.",
    imageUrl: "/images/Los_pilares_de_la_tierra.jpg",
    content1: "Para mantener tus libros en buen estado, lo primero es asegurarte de que el ambiente de almacenamiento sea el adecuado. Es importante conservarlos en un lugar con una humedad relativa entre el 45 y el 55% y una temperatura constante que oscile entre los 18 y 22 grados Celsius. En zonas muy húmedas, puedes utilizar deshumidificadores o colocar pequeñas bolsas de gel de sílice dentro de las estanterías para prevenir la aparición de moho. También es fundamental proteger los libros de la luz directa del sol, ya que esta puede decolorar las portadas y deteriorar el papel; lo ideal es ubicarlos lejos de las ventanas o utilizar cortinas con protección UV. En cuanto a su colocación, los libros deben guardarse en posición vertical con soportes que los mantengan firmes pero sin apretarlos demasiado. Los volúmenes grandes o pesados deben colocarse en posición horizontal para evitar daños en el lomo.",
    content2: "El mantenimiento adecuado de tus libros incluye una limpieza periódica y una manipulación cuidadosa. Es recomendable pasar un paño seco y suave por las cubiertas y los lomos al menos una vez al mes. Para una limpieza más profunda, puedes usar una aspiradora con boquilla de cerdas suaves en modo de baja potencia. Al manipular libros antiguos o de valor, es importante lavarse bien las manos para evitar la transferencia de aceites o suciedad. No se deben utilizar adhesivos como post-its o cinta scotch, ya que pueden dejar residuos difíciles de quitar; en su lugar, se recomienda emplear marcadores hechos de papel libre de ácido. Si necesitas hacer reparaciones, las páginas sueltas deben fijarse con pegamento especial para libros que no contenga ácido, o con cintas diseñadas específicamente para este fin. En caso de cubiertas muy dañadas, puedes protegerlas con fundas de plástico tipo mylar o acudir a un profesional en restauración de libros.",
    date: "27 mayo 2025",
    category: "Consejos",
    readTime: "6 min lectura"
  },
  {
    id: 4,
    title: "La evolución de las bibliotecas en la era digital",
    excerpt: "Las bibliotecas se están transformando para adaptarse a la era digital. Descubre cómo estas instituciones están innovando para mantenerse relevantes.",
    content1: "Las bibliotecas han evolucionado significativamente en la era digital, transformándose en espacios más accesibles e innovadores. Actualmente, ofrecen acceso remoto a colecciones digitales que incluyen libros electrónicos, audiolibros y revistas a través de plataformas como OverDrive y Libby. Este acceso está disponible las 24 horas del día con solo una credencial de usuario, lo que elimina muchas de las barreras físicas tradicionales. Además, los espacios dentro de las bibliotecas también han sido rediseñados: muchas han sustituido estanterías por zonas de coworking, laboratorios creativos y estudios de grabación. También incorporan tecnologías como la realidad virtual para ofrecer experiencias educativas y de entretenimiento. En cuanto a la preservación, han avanzado en la digitalización de documentos históricos frágiles, y algunas incluso están explorando el uso de blockchain para garantizar la autenticidad y trazabilidad de las obras digitales.",
    content2: "Mirando hacia el futuro, las bibliotecas están asumiendo un rol como centros tecnológicos y comunitarios. Se están implementando herramientas de inteligencia artificial, como chatbots que asisten a los usuarios en sus investigaciones y sistemas de recomendación personalizados basados en algoritmos. Paralelamente, muchas bibliotecas ofrecen programas gratuitos de formación digital que incluyen talleres sobre cómo identificar noticias falsas, aprender programación básica y mejorar la seguridad online. También se imparten actividades prácticas como robótica e impresión 3D para personas de todas las edades. En términos de sostenibilidad, algunas bibliotecas están adoptando modelos completamente digitales, operando sin papel y desde la nube. Además, la colaboración internacional se fortalece mediante redes que permiten compartir recursos digitales entre instituciones de diferentes partes del mundo.",
    imageUrl: "/images/signup_bg.png",
    date: "26 mayo 2025",
    category: "Tecnología",
    readTime: "7 min lectura"
  },

  {
    id: 5,
    title: "Comunidades lectoras: Conectando a través de los libros",
    excerpt: "Cómo las comunidades de lectura están creando conexiones significativas y promoviendo la sostenibilidad a través del intercambio de libros.",
    content1: "Las comunidades lectoras han tomado un papel central en la forma en que las personas descubren y disfrutan la lectura. A través de clubes de lectura, plataformas virtuales y redes sociales, los lectores se conectan más allá de fronteras físicas para compartir opiniones, recomendaciones y reflexiones. Estos espacios no solo fomentan el hábito lector, sino que también crean un sentido de pertenencia entre personas con intereses comunes. Los encuentros pueden ser presenciales o virtuales, y muchas veces giran en torno a temas específicos como literatura feminista, ciencia ficción, historia o incluso autores locales. Este fenómeno ha revitalizado el interés por los libros, especialmente entre generaciones más jóvenes que encuentran en la lectura una experiencia social además de personal.",
    content2: "Además del aspecto social, las comunidades lectoras están impulsando prácticas sostenibles, como el intercambio de libros, las bibliotecas comunitarias y los puntos de lectura libre. Estas iniciativas permiten reducir el consumo excesivo de papel, extender la vida útil de los libros y fomentar la economía circular. Muchos grupos organizan eventos de trueque, cajas de intercambio en espacios públicos o campañas de donación que permiten que los libros sigan circulando entre nuevos lectores. Al mismo tiempo, estas prácticas promueven la inclusión, ya que facilitan el acceso a la lectura a personas que no pueden adquirir libros nuevos con frecuencia. En conjunto, las comunidades lectoras no solo fortalecen los lazos entre personas, sino que también contribuyen a una cultura más solidaria y sostenible.",
    imageUrl: "/images/login_bg.png",
    date: "25 mayo 2025",
    category: "Comunidad",
    readTime: "5 min lectura"
  }

];

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  // Permitir acceso tanto por id numérico como por slug de título
  const post = blogPosts.find(p =>
    p.id.toString() === slug ||
    p.title.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600">Lo sentimos, el artículo que buscas no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="w-full h-96 relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <span className="inline-block bg-coral-500 text-white px-3 py-1 rounded-full text-sm mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* This would normally come from a CMS or API */}
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {post.content1}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {post.content2}
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSection />
    </article>
  );
};

export default BlogPost;
