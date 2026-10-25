import type { Usuario } from '../../types';
import { getAvatarUrl } from '../../utils/avatar';


const ProfileCard = ({
    bookCount,
    user
  }: {
    bookCount: number;
    user: Usuario
  }) => {

    return (
        <div className="bg-gray-50 text-center text-gray-900 p-4 w-80 h-80 rounded-2xl border border-coral-100 flex flex-col items-center justify-between transition-transform duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center mt-8">
                <a href="/profile" className="logo flex items-center justify-center w-28 h-28 rounded-full overflow-hidden shadow-md border-4 border-white">
                    <img
                        src={getAvatarUrl(user.email)}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                    />
                </a>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold font-poppins mt-4 text-gray-900">{user.nombre} {user.apellidos} - {user.verificado} </h2>
                    {user.verificado === 1 && (
                        <span className="text-sm font-medium px-2 py-0.5 rounded bg-green-100 text-green-700 mt-1">
                            Verificado
                        </span>
                    )}
                </div>
            </div>
            <div className="flex justify-center gap-2 mt-3">
                <span className="bg-yellow-200 text-black text-xs font-bold py-1 px-3 rounded-full shadow">{bookCount} libros</span>
                <span className="bg-coral-500/90 text-white text-xs font-bold py-1 px-3 rounded-full shadow">Vendedor</span>
            </div>
        </div>
    );
};

export default ProfileCard;