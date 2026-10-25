import React, { useEffect, useState } from "react";
import ProfileEdit from "../components/layout/ProfileEdit";
import { api } from "../services/api";
import type { Usuario } from "../types";
import LoadingSpinner from "../components/ui/LoadingSpinner";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [isEditing, setIsEditing] = useState("info");
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookCount, setBookCount] = useState<number>(0);
  const fetchProfileData = async () => {
    try {
      const userData = await api.getUserById();
      // Try to get book count from backend if available, else fallback to user.libros?.length
      let count = 0;
      if (userData && Array.isArray(userData.libros)) {
        count = userData.libros.length;
      } else if (userData && typeof userData.bookCount === 'number') {
        count = userData.bookCount;
      }
      setUser(userData);
      setBookCount(count);
      setLoading(false);
    } catch (err) {
      console.error("Error cargando datos del perfil:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <LoadingSpinner />
    </div>
  );
  if (!user) return <p className="text-center mt-4">No se pudo cargar el perfil.</p>;

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      {/* Imagen y detalles de la cuenta en la misma fila */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 w-full">
        {/* Imagen perfil */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-56">
          <div className="relative">
            <img
              src="/images/profile.png"
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover mb-2 md:mb-4"
            />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 text-center md:text-left">
              {user.nombre} {user.apellidos}
            </h1>
            <span 
              className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                user.verificado === 1 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-gray-100 text-gray-500 border border-gray-200'
              }`}
            >
              {user.verificado === 1 ? <i className="fas fa-check text-sm"></i> : 'No verificado'}
            </span>
          </div>
          <div className="text-gray-600 text-sm flex flex-col items-center md:items-start gap-0.5 mb-2">
            <span>{user.email}</span>
            <span>{user.telefono || "Sin teléfono"}</span>
            <span>{user.direccion || "Sin dirección"}</span>
          </div>
          <button
            className="mt-2 flex items-center gap-2 text-coral-500 hover:text-coral-600 text-sm font-semibold"
            onClick={() => setIsEditing("edit")}
          >
            <span role="img" aria-label="Editar">✏️</span> Editar perfil
          </button>
        </div>

        {/* Detalles de la cuenta */}
        <section className="flex-1 w-full bg-gray-50 rounded-2xl px-6 py-6 flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold text-gray-900 mb-6 w-full text-center md:text-left">Detalles de la cuenta</h2>
          <div className="w-full max-w-lg">
            {isEditing === "edit" && user ? (
              <div className="mt-0 w-full">
                <ProfileEdit user={user} setIsEditing={setIsEditing} onUserUpdated={fetchProfileData} />
              </div>
            ) : (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col items-start border-b border-gray-100 py-2">
                  <dt className="text-xs text-gray-500 font-medium mb-1">Nombre</dt>
                  <dd className="text-base text-gray-900 font-semibold pl-2">{user.nombre}</dd>
                </div>
                <div className="flex flex-col items-start border-b border-gray-100 py-2">
                  <dt className="text-xs text-gray-500 font-medium mb-1">Apellidos</dt>
                  <dd className="text-base text-gray-900 font-semibold pl-2">{user.apellidos}</dd>
                </div>
                <div className="flex flex-col items-start border-b border-gray-100 py-2">
                  <dt className="text-xs text-gray-500 font-medium mb-1">Usuario</dt>
                  <dd className="text-base text-gray-900 font-semibold pl-2">{user.user}</dd>
                </div>

                <div className="flex flex-col items-start border-b border-gray-100 py-2">
                  <dt className="text-xs text-gray-500 font-medium mb-1">Estado de la cuenta</dt>
                  <dd className={`flex items-center gap-2 text-base pl-2 ${
                    user.verificado === 1 ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    <i className={`fas ${user.verificado === 1 ? 'fa-shield-check' : 'fa-shield'}`}></i>
                    {user.verificado === 1 ? 'Cuenta verificada' : 'Cuenta sin verificar'}
                  </dd>
                </div>
                <div className="flex flex-col items-start border-b border-gray-100 py-2">
                  <dt className="text-xs text-gray-500 font-medium mb-1">Correo</dt>
                  <dd className="text-base text-gray-900 font-semibold pl-2">{user.email}</dd>
                </div>
                <div className="flex flex-col items-start border-b border-gray-100 py-2">
                  <dt className="text-xs text-gray-500 font-medium mb-1">Teléfono</dt>
                  <dd className="text-base text-gray-900 font-semibold pl-2">{user.telefono || "Sin teléfono"}</dd>
                </div>
                <div className="flex flex-col items-start border-b border-gray-100 py-2">
                  <dt className="text-xs text-gray-500 font-medium mb-1">Dirección</dt>
                  <dd className="text-base text-gray-900 font-semibold pl-2">{user.direccion || "Sin dirección"}</dd>
                </div>
              </dl>
            )}
          </div>
        </section>
      </div>



      <section className="w-full mb-10 flex flex-row gap-6 justify-center items-center">
        <a href="/my-books" className="flex-1 max-w-xs bg-white flex flex-col items-center py-6 px-2 rounded-xl transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-coral-500">
          <span className="text-coral-500 text-4xl mb-2">📚</span>
          <span className="text-3xl font-bold text-gray-900 mb-1">{bookCount}</span>
          <span className="text-base text-gray-500 font-medium">Libros en tu biblioteca</span>
        </a>
        <a href="/my-sales" className="flex-1 max-w-xs bg-white flex flex-col items-center py-6 px-2 rounded-xl transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-coral-500">
          <span className="text-coral-500 text-4xl mb-2">🛒</span>
          <span className="text-3xl font-bold text-gray-900 mb-1">-</span>
          <span className="text-base text-gray-500 font-medium">Ventas realizadas</span>
        </a>
      </section>
    </main>
  );
};

export default Profile;
