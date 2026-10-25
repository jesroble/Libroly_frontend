export type { BlogPost } from './blog';

export interface User {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  verificado: number;
  telefono?: string;
  urlFotoPerfil?: string;
}

export interface Genre {
  id?: number;
  nombre: string;
  descripcion?: string;
}

export interface Language {
  id?: number;
  nombre: string;
  codigo?: string; // ej: "es", "en", "fr"
}

export interface Seller {
  id: string;
  nombre: string;
  estado: string;
  valoracion: number;
  precio: number;
}

export interface Book {
  titulo: string;
  autor: string;
  urlImgPortada: string;
  fechaPublicacion: string;
  valoracion: number;
  generoLiterario: Genre[];
  isbn: number;
  precio?: number;
  descripcion?: string;
  paginas?: number;
  publisher?: string;
  idiomas?: Language[];
  enVenta?: boolean;
  sellers?: Seller[];
  estado?: number;
  libro?: Book;
}

// Tipos para el carrito
export interface CartItem {
  id: string;
  isbn: number;
  title: string;
  price: number;
  image?: string;
  author?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Usuario {
  apellidos: string;
  contraseña: string;
  email: string;
  id: number;
  book: Book;
  nombre: string;
  telefono: string;
  user: string;
  direccion: string;
  verificado: number;
  libros: any[];
}

export interface PaymentIntentResponse {
  clientSecret: string;
  amount: number;
  status: string;
}

export interface PurchaseResponse {
  success: boolean;
  transactionId: string;
}