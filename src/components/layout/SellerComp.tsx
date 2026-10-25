import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  urlImgPortada: string;
  precio: number;
  estado: number;
  enVenta: boolean;
}

interface Vendedor {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  urlFotoPerfil?: string;
  fechaRegistro: string;
  libros: Libro[];
  ventasRealizadas?: number;
}

const estadoMap: Record<number, string> = {
  5: 'Nuevo con etiqueta',
  4: 'Como nuevo',
  3: 'Buen estado',
  2: 'En condiciones aceptables',
  1: 'Deteriorado',
};

interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  precio: number;
  estado: number;
  urlImgPortada: string;
  enVenta: boolean;
}

const SellerComp: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<Vendedor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setUser(null);
        setLoading(false);
        return;
      }
      
      try {
        const data = await api.getSellerById(id);
        setUser(data);
      } catch (err) {
        console.error('Error fetching seller:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
    </div>
  );
  
  if (!user) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h2 className="mt-4 text-lg font-medium text-gray-900">No se encontró el usuario</h2>
        <p className="mt-2 text-sm text-gray-600">El vendedor que buscas no existe o no está disponible.</p>
      </div>
    </div>
  );

  const librosEnVenta = user.libros.filter((libro: Libro) => libro.enVenta);
  
  const formatFechaRegistro = (fechaStr: string) => {
    try {
      const fecha = new Date(fechaStr);
      if (isNaN(fecha.getTime())) {
        return 'Fecha no disponible';
      }
      return format(fecha, "MMMM yyyy", { locale: es });
    } catch {
      return 'Fecha no disponible';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-gradient-to-br from-coral-500 to-coral-600 p-6 text-white">
            <img 
              src={user.urlFotoPerfil || "/images/profile.png"} 
              alt={`${user.nombre} ${user.apellidos}`} 
              className="h-32 w-32 rounded-full mx-auto border-4 border-white shadow-md"
            />
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold">{user.nombre} {user.apellidos}</h1>
              <p className="mt-1 text-coral-100">Vendedor desde {formatFechaRegistro(user.fechaRegistro)}</p>
            </div>
          </div>
          
          <div className="p-6 md:p-8 md:flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Información de contacto</h2>
                <div className="mt-3 space-y-2">
                  <p className="text-gray-600 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user.email}
                  </p>
                  {user.telefono && (
                    <p className="text-gray-600 flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {user.telefono}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Estadísticas</h2>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Libros en venta</p>
                    <p className="text-2xl font-semibold text-gray-900">{librosEnVenta.length}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Ventas realizadas</p>
                    <p className="text-2xl font-semibold text-gray-900">{user.ventasRealizadas || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Libros en venta</h2>
      {librosEnVenta.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No hay libros en venta</h3>
          <p className="mt-2 text-sm text-gray-600">Este vendedor no tiene libros disponibles actualmente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {librosEnVenta.map((libro: any) => (
            <div key={libro.isbn} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-[400px]">
              <div className="relative h-[250px] bg-gray-200">
                <img 
                  src={libro.urlImgPortada} 
                  alt={libro.titulo} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/images/libro-placeholder.jpg';
                  }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 h-[3.2rem]">{libro.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">{libro.autor}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-semibold text-coral-600">{libro.precio} €</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    libro.estado >= 4 ? 'bg-green-100 text-green-800' : 
                    libro.estado >= 3 ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {estadoMap[libro.estado] || "Desconocido"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default SellerComp;
