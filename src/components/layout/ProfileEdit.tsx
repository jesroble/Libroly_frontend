import { useState } from 'react';
import type { Usuario } from '../../types';
import { api } from '../../services/api';


const ProfileEdit = ({
  user,
  setIsEditing,
  onUserUpdated
}: {
  user: Usuario;
  setIsEditing: (val: string) => void;
  onUserUpdated: () => void;
}) => { 
  
  const [showPassword, setShowPassword] = useState(false);

  // Estados para cada campo editable
  const [nombre, setNombre] = useState(user.nombre || "");
  const [apellidos, setApellidos] = useState(user.apellidos || "");
  const [direccion, setDireccion] = useState(user.direccion || "");
  const [telefono, setTelefono] = useState(user.telefono || "");
  const [email, setEmail] = useState(user.email || "");
  const [contraseña, setContraseña] = useState(user.contraseña || "");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {        
        await api.putUser({
          id: user.id,
          user: user.user,
          nombre,
          apellidos,
          direccion,
          telefono,
          email,
          contraseña,
          verificado: user.verificado  // Mantenemos el estado de verificación actual
        });
        await onUserUpdated();
        setIsEditing("info"); // Vuelve al modo de visualización
      } catch (error) {
        console.error("Error actualizando el usuario:", error);
        // Aquí puedes mostrar un mensaje de error si lo deseas
      }
    };

  return (
    <form 
      className="w-full max-w-lg"
      onSubmit={handleSubmit}>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col items-start border-b border-gray-100 py-2">
          <dt className="text-xs text-gray-500 font-medium mb-1">Nombre</dt>
          <dd className="w-full">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="text-base text-gray-900 font-semibold pl-2 bg-transparent border-none focus:ring-0 focus:outline-none w-full"
            />
          </dd>
        </div>
        <div className="flex flex-col items-start border-b border-gray-100 py-2">
          <dt className="text-xs text-gray-500 font-medium mb-1">Apellidos</dt>
          <dd className="w-full">
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              placeholder="Apellidos"
              className="text-base text-gray-900 font-semibold pl-2 bg-transparent border-none focus:ring-0 focus:outline-none w-full"
            />
          </dd>
        </div>
        <div className="flex flex-col items-start border-b border-gray-100 py-2">
          <dt className="text-xs text-gray-500 font-medium mb-1">Usuario</dt>
          <dd className="text-base text-gray-900 font-semibold pl-2">{user.user}</dd>
        </div>
        <div className="flex flex-col items-start border-b border-gray-100 py-2">
          <dt className="text-xs text-gray-500 font-medium mb-1">Correo</dt>
          <dd className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="text-base text-gray-900 font-semibold pl-2 bg-transparent border-none focus:ring-0 focus:outline-none w-full"
            />
          </dd>
        </div>
        <div className="flex flex-col items-start border-b border-gray-100 py-2">
          <dt className="text-xs text-gray-500 font-medium mb-1">Teléfono</dt>
          <dd className="w-full">
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono"
              className="text-base text-gray-900 font-semibold pl-2 bg-transparent border-none focus:ring-0 focus:outline-none w-full"
            />
          </dd>
        </div>
        <div className="flex flex-col items-start border-b border-gray-100 py-2">
          <dt className="text-xs text-gray-500 font-medium mb-1">Dirección</dt>
          <dd className="w-full">
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Dirección"
              className="text-base text-gray-900 font-semibold pl-2 bg-transparent border-none focus:ring-0 focus:outline-none w-full"
            />
          </dd>
        </div>
        <div className="flex flex-col items-start border-b border-gray-100 py-2 col-span-2">
          <dt className="text-xs text-gray-500 font-medium mb-1">Contraseña</dt>
          <dd className="w-full">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Contraseña"
                className="text-base text-gray-900 font-semibold pl-2 bg-transparent border-none focus:ring-0 focus:outline-none w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-coral-500 px-2 py-1 rounded"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </dd>
        </div>
      </dl>
      <div className='flex justify-center mt-6'>
        <button
          type="submit"
          className="bg-coral-500 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:bg-coral-600 transition-colors m-2"
        >
          Guardar
        </button>
        <button
          onClick={() => setIsEditing("info")}
          type="button"
          className="bg-white text-coral-500 font-bold py-2 px-6 rounded-xl shadow-md border border-coral-500 hover:bg-coral-50 transition-colors m-2"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;