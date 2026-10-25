import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DEMO_MODE } from '../../config';
import { DEMO_ACCOUNT_EMAIL } from '../../demo/demoApi';

const LoginComp: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Get the page that the user tried to visit before being redirected to login
    const from = location.state?.from?.pathname || '/';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            // Si el login es exitoso, redirigimos al usuario a la página que intentaba visitar
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Email o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-lg px-8 py-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h2>
                        <p className="text-gray-600">Inicia sesión para continuar</p>
                    </div>

                    {DEMO_MODE && (
                        <div className="mb-4 p-3 bg-amber-50 text-amber-900 rounded-md text-sm text-center">
                            Demo: usa <span className="font-mono">{DEMO_ACCOUNT_EMAIL}</span> con cualquier contraseña.{' '}
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, email: DEMO_ACCOUNT_EMAIL, password: 'demo' }))}
                                className="underline font-semibold"
                            >
                                Rellenar
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                                disabled={loading}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-coral-500 border-gray-300 rounded focus:ring-coral-500"
                                    disabled={loading}
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Recordarme
                                </label>
                            </div>
                            <Link to="/forgot-password" className="text-sm text-coral-600 hover:text-coral-500">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span className="ml-2">Iniciando sesión...</span>
                                </div>
                            ) : (
                                'Iniciar sesión'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <Link to="/signup" className="text-coral-600 hover:text-coral-500 font-medium">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComp;
