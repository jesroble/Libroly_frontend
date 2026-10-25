const ProfileInfo = ({ user, setIsEditing }: { user: import('../../types').Usuario; setIsEditing: (val: string) => void; }) => {
  const passwordLen = user.contraseña?.length || 8;

  return (
    <form className="bg-gray-50 border border-coral-100 rounded-xl p-6 w-full h-full">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="font-bold block mb-1 text-coral-600">Nombre</label>
          <div className="flex items-center gap-2">
            <p className="text-gray-900 font-medium">{user.nombre}</p>
            <span 
              className={`text-sm font-medium px-2 py-0.5 rounded flex items-center gap-1 ${
                user.verificado === 1 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {user.verificado === 1 
                ? <><i className="fas fa-check-circle mr-1"></i>Verificado</> 
                : <><i className="fas fa-clock mr-1"></i>No verificado</>}
            </span>
          </div>
        </div>
        <div>
          <label className="font-bold block mb-1 text-coral-600">Apellidos</label>
          <p className="text-gray-900 font-medium">{user.apellidos}</p>
        </div>
        <div className="col-span-2">
          <label className="font-bold block mb-1 text-coral-600">Dirección</label>
          <p className="text-gray-900 font-medium">{user.direccion || 'Sin dirección asignada'}</p>
        </div>
        <div>
          <label className="font-bold block mb-1 text-coral-600">Contraseña</label>
          <p className="text-gray-900 font-medium">{"*".repeat(passwordLen)}</p>
        </div>
        <div>
          <label className="font-bold block mb-1 text-coral-600">Correo electrónico</label>
          <p className="text-gray-900 font-medium">{user.email}</p>
        </div>
        <div>
          <label className="font-bold block mb-1 text-coral-600">Número de teléfono</label>
          <p className="text-gray-900 font-medium">{user.telefono}</p>
        </div>
        <div>
          <label className="font-bold block mb-1 text-coral-600">Nombre de usuario</label>
          <p className="text-gray-900 font-medium">{user.user}</p>
        </div>
      </div>
      <div className='flex justify-center mt-6'>
        <button
          onClick={() => setIsEditing("edit")}
          type="button"
          className="bg-coral-500 text-white font-bold py-2 px-6 rounded-full hover:bg-coral-600 transition-colors"
        >
          Editar
        </button>
      </div>
    </form>
  );
};

export default ProfileInfo;
