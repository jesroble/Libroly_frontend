import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignUpComp: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        user: '',
        contraseña: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const validateForm = () => {
        if (formData.contraseña !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        if (formData.contraseña.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        setLoading(true);
        try {
            await register(formData);
            navigate('/'); // Después del registro exitoso, redirigimos al home
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al crear la cuenta. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-lg px-8 py-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Crea tu cuenta</h2>
                        <p className="text-gray-600">Únete a nuestra comunidad de lectores</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre
                            </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                required
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                                disabled={loading}
                            />
                        </div>
<div>
    <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">
        Apellidos
    </label>
    <input
        id="apellidos"
        name="apellidos"
        type="text"
        required
        value={formData.apellidos}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
        disabled={loading}
    />
</div>

<div>
    <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
        Nombre de usuario
    </label>
    <input
        id="user"
        name="user"
        type="text"
        required
        value={formData.user}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
        disabled={loading}
    />
</div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <input
                                id="contraseña"
                                name="contraseña"
                                type="password"
                                required
                                value={formData.contraseña}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span className="ml-2">Creando cuenta...</span>
                                </div>
                            ) : (
                                'Crear cuenta'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" className="text-coral-600 hover:text-coral-500 font-medium">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpComp;
