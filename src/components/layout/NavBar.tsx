import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./css/NavBar.css";
import CartBadge from "../ui/CartBadge";

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsUserMenuOpen(false);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsUserMenuOpen(false);
    };

    // Cerrar menú móvil al hacer click fuera
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav className="nav-bar flex items-center justify-between px-6 py-2 bg-white shadow-sm">
            <Link to="/" className="logo bg-gray-800 rounded-full p-2">
                <img src="/images/logo.png" alt="Libroly Logo" height={40} />
            </Link>
            
            {/* Botón hamburguesa para móvil */}
            <button 
                className="lg:hidden text-gray-700 hover:text-coral-500 transition-colors"
                onClick={toggleMenu}
                aria-label="Menú principal"
            >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>

            {/* Menú de navegación - Desktop */}
            <ul className="nav-list hidden lg:flex gap-6">
                <li><Link to="/" className="hover:text-coral-500 transition-colors">Inicio</Link></li>
                <li><Link to="/books" className="hover:text-coral-500 transition-colors">Libros</Link></li>
                {isAuthenticated && (
                <li><Link to="/my-books" className="hover:text-coral-500 transition-colors">Mi Biblioteca</Link></li>
                )}
                <li><Link to="/libroly-pro" className="hover:text-coral-500 transition-colors">Libroly Pro</Link></li>
                <li><Link to="/blog" className="hover:text-coral-500 transition-colors">Blog</Link></li>
                <li><Link to="/about-us" className="hover:text-coral-500 transition-colors">Sobre Nosotros</Link></li>
            </ul>

            {/* Botones de autenticación y carrito - Desktop */}
            <div className="hidden lg:flex gap-4 items-center">
                {isAuthenticated ? (
                    <>
                        {/* Carrito */}
                        <CartBadge />

                        {/* Usuario y menú desplegable */}
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center gap-2 text-gray-700 hover:text-coral-500 transition-colors"
                            >
                                <i className="fas fa-user-circle text-2xl"></i>
                                <span>{user?.nombre}</span>
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <Link 
                                        to="/profile" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        Mi Perfil
                                    </Link>
                                    <Link 
                                        to="/my-orders" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        Mis Pedidos
                                    </Link>
                                    <Link 
                                        to="/my-sales" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        Mis Ventas
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login" 
                            className="text-gray-700 hover:text-coral-500 transition-colors"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup" 
                            className="bg-coral-500 text-white px-4 py-2 rounded-md hover:bg-coral-600 transition-colors"
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </div>

            {/* Menú móvil */}
            {isMenuOpen && (
                <div ref={menuRef} className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
                    <ul className="flex flex-col py-4">
                        <li><Link to="/" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Inicio</Link></li>
                        <li><Link to="/books" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Libros</Link></li>
                        {isAuthenticated && (
                          <li><Link to="/my-books" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Mi Biblioteca</Link></li>
                        )}
                        <li><Link to="/libroly-pro" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Libroly Pro</Link></li>
                        <li><Link to="/blog" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                        <li><Link to="/about-us" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</Link></li>
                        {isAuthenticated ? (
                            <>
                                <li className="border-t mt-2 pt-2">
                                    <Link to="/cart" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-shopping-cart"></i>
                                            <span>Carrito</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-user-circle text-2xl"></i>
                                            <span>{user?.nombre}</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/my-orders" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                                        Mis Pedidos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/my-sales" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                                        Mis Ventas
                                    </Link>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                        className="block w-full text-left px-6 py-2 hover:bg-gray-50"
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="border-t mt-2 pt-2">
                                    <Link to="/login" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="block px-6 py-2 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;