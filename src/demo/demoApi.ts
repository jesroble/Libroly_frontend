// API simulada para el modo demo (VITE_DEMO_MODE=true).
// Reproduce las respuestas de la API Java (mismos DTOs y misma lógica de negocio) usando los datos
// de ejemplo de data.json. Los cambios del visitante (registro, ventas, compras) se guardan solo en
// su navegador (localStorage) y se pueden restablecer con resetDemoData().
import seed from './data.json';
import type { Usuario as UsuarioPerfil } from '../types';

type Libro = (typeof seed.libros)[number];
type Usuario = (typeof seed.usuarios)[number];
type Transaccion = (typeof seed.transacciones)[number];
type Detalle = (typeof seed.detalles)[number];

interface LibroUsuario {
    isbn: number;
    usuarioId: number;
    enVenta: boolean;
    precio: number | null;
    estado: number;
}

interface DemoDb {
    usuarios: Usuario[];
    libroUsuario: LibroUsuario[];
    transacciones: Transaccion[];
    detalles: Detalle[];
}

// Usuario 1 de data.json (tiene biblioteca, un libro en venta y pedidos). Literal para que,
// fuera del modo demo, el bundle no arrastre los datos de ejemplo.
export const DEMO_ACCOUNT_EMAIL = 'mariagarcia62@example.com';

const STORAGE_KEY = 'libroly_demo_db_v1';
const SESSION_KEYS = ['token', 'user', 'usuario', 'cart', 'checkout_info', 'userPlan'];

const initialDb = (): DemoDb => ({
    usuarios: seed.usuarios.map(u => ({ ...u })),
    libroUsuario: seed.libroUsuario.map(r => ({ ...r })),
    transacciones: seed.transacciones.map(t => ({ ...t })),
    detalles: seed.detalles.map(d => ({ ...d })),
});

const loadDb = (): DemoDb => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved) as DemoDb;
    } catch {
        // Almacenamiento no disponible o corrupto: se usan los datos de ejemplo.
    }
    return initialDb();
};

// Se carga en el primer uso: sin efectos al importar el módulo, para que se elimine del build real.
let cachedDb: DemoDb | null = null;
const getDb = () => (cachedDb ??= loadDb());

const saveDb = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getDb()));
    } catch {
        // Sin almacenamiento la demo sigue funcionando, pero los cambios no persisten al recargar.
    }
};

export const resetDemoData = () => {
    cachedDb = initialDb();
    try {
        localStorage.removeItem(STORAGE_KEY);
        SESSION_KEYS.forEach(key => localStorage.removeItem(key));
    } catch {
        // Ignorado: no hay nada que limpiar.
    }
};

// Pequeña latencia para que los estados de carga se vean como con un backend real.
const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

// Errores con la misma forma que los de axios, que es lo que esperan los componentes.
const httpError = (status: number, message: string) =>
    Object.assign(new Error(message), { response: { status, data: { message } } });

const currentUserId = (): number | null => {
    try {
        const id = JSON.parse(localStorage.getItem('usuario') || 'null');
        return id == null ? null : Number(id);
    } catch {
        return null;
    }
};

const findUsuario = (id: number | null) => {
    const usuario = getDb().usuarios.find(u => u.id === id);
    if (!usuario) throw httpError(404, 'Usuario no encontrado');
    return usuario;
};

const findLibro = (isbn: number) => seed.libros.find(l => l.isbn === isbn);

// ---------- DTOs (misma forma que los de la API Java) ----------

const generoSrDTO = (id: number) => {
    const genero = seed.generos.find(g => g.id === id)!;
    return { id: genero.id, nombre: genero.nombre };
};

const idiomaSrDTO = (id: number) => {
    const idioma = seed.idiomas.find(i => i.id === id)!;
    return { id: idioma.id, nombre: idioma.nombre, codigo: idioma.codigo };
};

const libroBase = (libro: Libro) => ({
    isbn: libro.isbn,
    titulo: libro.titulo,
    autor: libro.autor,
    urlImgPortada: libro.urlImgPortada,
    fechaPublicacion: libro.fechaPublicacion,
    valoracion: libro.valoracion,
    descripcion: libro.descripcion,
    paginas: libro.paginas,
    publisher: libro.publisher,
    fechaRegistro: libro.fechaRegistro,
});

const libroSinUsuarioDTO = (libro: Libro) => ({
    ...libroBase(libro),
    generoLiterario: libro.generoIds.map(generoSrDTO),
    idiomas: libro.idiomaIds.map(idiomaSrDTO),
});

const libroDTO = (libro: Libro) => ({ ...libroSinUsuarioDTO(libro), usuarios: null });

const libroSrDTO = (libro: Libro, relacion?: LibroUsuario) => ({
    ...libroBase(libro),
    enVenta: relacion?.enVenta ?? false,
    precio: relacion?.precio ?? null,
    estado: relacion?.estado ?? 0,
});

// Los datos de la demo no incluyen contraseñas.
const usuarioSrDTO = (usuario: Usuario) => ({
    id: usuario.id,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    telefono: usuario.telefono,
    user: usuario.user,
    email: usuario.email,
    direccion: usuario.direccion,
    verificado: usuario.verificado,
});

const usuarioDTO = (usuario: Usuario) => ({
    ...usuarioSrDTO(usuario),
    libros: getDb().libroUsuario
        .filter(r => r.usuarioId === usuario.id)
        .map(r => libroSrDTO(findLibro(r.isbn)!, r)),
});

const transaccionDTO = (transaccion: Transaccion) => ({
    id: transaccion.id,
    fechaTransaccion: transaccion.fechaTransaccion,
    precioTotal: transaccion.precioTotal,
    precioLibros: transaccion.precioLibros,
    comprador: usuarioSrDTO(findUsuario(transaccion.compradorId)),
    detalles: getDb().detalles
        .filter(d => d.transaccionId === transaccion.id)
        .map(d => ({
            id: d.id,
            vendedor: usuarioSrDTO(findUsuario(d.vendedorId)),
            precioIndividual: d.precioIndividual,
            estado: d.estado,
        })),
});

const nextId = (rows: { id: number }[]) => rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;

// ---------- API (mismas firmas que la API real de services/api.ts) ----------

export const demoApi = {
    // La contraseña no se comprueba: la demo acepta cualquiera.
    login: async (email: string) => {
        await delay();
        const usuario = getDb().usuarios.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        if (!usuario) {
            throw httpError(401, `Ese email no existe en la demo. Prueba con ${DEMO_ACCOUNT_EMAIL} (cualquier contraseña) o crea una cuenta.`);
        }
        localStorage.setItem('usuario', JSON.stringify(usuario.id));
        // AuthContext espera el usuario de la sesión en `user`.
        return {
            ...usuarioDTO(usuario),
            user: { id: usuario.id, nombre: usuario.nombre, apellidos: usuario.apellidos, email: usuario.email },
        };
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('usuario');
    },

    register: async (userData: {
        nombre: string;
        apellidos: string;
        email: string;
        user: string;
        contraseña: string;
        confirmPassword: string;
    }) => {
        await delay();
        if (getDb().usuarios.some(u => u.email.toLowerCase() === userData.email.trim().toLowerCase())) {
            throw httpError(409, 'Ya existe una cuenta con ese email.');
        }
        const usuario: Usuario = {
            id: nextId(getDb().usuarios),
            nombre: userData.nombre,
            apellidos: userData.apellidos,
            user: userData.user,
            email: userData.email.trim(),
            telefono: '',
            direccion: '',
            verificado: 0,
        };
        getDb().usuarios.push(usuario);
        saveDb();
        return {
            user: usuario.user,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
        };
    },

    isAuthenticated: () => currentUserId() != null,

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    getUserById: async () => {
        await delay();
        return usuarioDTO(findUsuario(currentUserId()));
    },

    getSellerById: async (id: string | number) => {
        await delay();
        return usuarioDTO(findUsuario(Number(id)));
    },

    getBookCountByUser: async () => {
        await delay();
        return getDb().libroUsuario.filter(r => r.usuarioId === currentUserId()).length;
    },

    putUser: async (datos: Partial<UsuarioPerfil>) => {
        await delay();
        const usuario = findUsuario(currentUserId());
        // La contraseña se ignora: la demo no guarda contraseñas.
        Object.assign(usuario, {
            nombre: datos.nombre ?? usuario.nombre,
            apellidos: datos.apellidos ?? usuario.apellidos,
            telefono: datos.telefono ?? usuario.telefono,
            direccion: datos.direccion ?? usuario.direccion,
            email: datos.email ?? usuario.email,
            verificado: datos.verificado ?? usuario.verificado,
        });
        saveDb();
        return usuarioSrDTO(usuario);
    },

    updateUserVerification: async (verificado?: boolean) => {
        await delay();
        const usuario = findUsuario(currentUserId());
        usuario.verificado = verificado === false ? 0 : 1;
        saveDb();
        return usuarioSrDTO(usuario);
    },

    getAllBooks: async () => {
        await delay();
        return seed.libros.map(libroSinUsuarioDTO);
    },

    getUserWithBooks: async () => {
        await delay();
        return usuarioDTO(findUsuario(currentUserId()));
    },

    getUserSales: async () => {
        await delay();
        return usuarioDTO(findUsuario(currentUserId())).libros.filter(libro => libro.enVenta);
    },

    getRandomBook: async () => {
        await delay();
        const libros = seed.libros.slice(0, 50);
        return libroSrDTO(libros[Math.floor(Math.random() * libros.length)]);
    },

    getNewReleases: async () => {
        await delay();
        return [...seed.libros]
            .sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion))
            .slice(0, 4)
            .map(libroSinUsuarioDTO);
    },

    getGenres: async () => {
        await delay();
        return seed.generos.slice(0, 6).map(g => generoSrDTO(g.id));
    },

    getBookByIsbn: async (isbn: string) => {
        await delay();
        const libro = findLibro(Number(isbn));
        return libro ? libroDTO(libro) : null;
    },

    getVentaByIsbn: async (isbn: string) => {
        await delay();
        return getDb().libroUsuario
            .filter(r => r.isbn === Number(isbn) && r.enVenta)
            .map(r => {
                const vendedor = findUsuario(r.usuarioId);
                return {
                    id: vendedor.id,
                    nombre: vendedor.nombre,
                    apellidos: vendedor.apellidos,
                    email: vendedor.email,
                    telefono: vendedor.telefono,
                    precio: r.precio ?? 0,
                    estado: r.estado,
                };
            });
    },

    addBookByIsbn: async ({ idUsuario, isbn }: { idUsuario: number, isbn: number }) => {
        await delay();
        const libro = findLibro(Number(isbn));
        if (!libro) {
            // La API real consulta OpenLibrary; la demo se limita al catálogo de ejemplo.
            throw httpError(404, 'En la demo solo se pueden añadir libros del catálogo de ejemplo.');
        }
        const usuario = findUsuario(Number(idUsuario));
        if (!getDb().libroUsuario.some(r => r.isbn === libro.isbn && r.usuarioId === usuario.id)) {
            getDb().libroUsuario.push({ isbn: libro.isbn, usuarioId: usuario.id, enVenta: false, precio: null, estado: 0 });
            saveDb();
        }
        return libroDTO(libro);
    },

    createSale: async (saleData: { usuarioId: number; libroISBN: number; precio: number; estado: number; enVenta: boolean }) => {
        await delay();
        const relacion = getDb().libroUsuario.find(r => r.isbn === Number(saleData.libroISBN) && r.usuarioId === Number(saleData.usuarioId));
        if (!relacion) throw httpError(404, 'Relación libro-usuario no encontrada');
        relacion.enVenta = saleData.enVenta;
        relacion.precio = saleData.precio;
        relacion.estado = saleData.estado;
        saveDb();
        return { usuarioId: relacion.usuarioId, libroISBN: relacion.isbn, enVenta: relacion.enVenta, precio: relacion.precio, estado: relacion.estado };
    },

    // El carrito actual no usa Stripe; se mantienen por compatibilidad con la API real.
    createStripeCheckoutSession: async () => {
        await delay();
        return { checkout_url: `${window.location.origin}/checkout-success?session_id=demo_${Date.now()}` };
    },

    verifyPaymentSession: async (sessionId: string) => {
        await delay();
        return { status: 'paid', session_id: sessionId };
    },

    createPurchase: async (purchaseData: {
        compradorId: number;
        detalles: Array<{
            idVendedor: number;
            isbn: number;
        }>;
        precioFinal: number;
    }) => {
        await delay();
        const comprador = findUsuario(Number(purchaseData.compradorId));
        const transaccion: Transaccion = {
            id: nextId(getDb().transacciones),
            compradorId: comprador.id,
            fechaTransaccion: new Date().toISOString(),
            precioLibros: 0,
            precioTotal: purchaseData.precioFinal,
        };
        const relaciones = purchaseData.detalles.map(d => {
            const relacion = getDb().libroUsuario.find(r => r.isbn === Number(d.isbn) && r.usuarioId === Number(d.idVendedor));
            if (!relacion) throw httpError(400, 'Libro no encontrado o no a la venta por el usuario');
            return relacion;
        });
        let detalleId = nextId(getDb().detalles);
        for (const relacion of relaciones) {
            getDb().detalles.push({
                id: detalleId++,
                transaccionId: transaccion.id,
                isbn: relacion.isbn,
                vendedorId: relacion.usuarioId,
                estado: relacion.estado,
                precioIndividual: relacion.precio ?? 0,
            });
            transaccion.precioLibros += relacion.precio ?? 0;
        }
        // Igual que LibroUsuarioService.transferirPropiedadLibro: el libro pasa del vendedor al comprador.
        for (const relacion of relaciones) {
            getDb().libroUsuario = getDb().libroUsuario.filter(r => r !== relacion);
            if (!getDb().libroUsuario.some(r => r.isbn === relacion.isbn && r.usuarioId === comprador.id)) {
                getDb().libroUsuario.push({ isbn: relacion.isbn, usuarioId: comprador.id, enVenta: false, precio: null, estado: 0 });
            }
        }
        getDb().transacciones.push(transaccion);
        saveDb();
        return transaccionDTO(transaccion);
    },

    getPurchaseHistory: async () => {
        await delay();
        const userId = currentUserId();
        return getDb().transacciones.filter(t => t.compradorId === userId).map(transaccionDTO);
    },
};

// ---------- Recomendaciones (sustituye al microservicio de IA) ----------

const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Las descripciones del catálogo están en inglés: equivalencias para consultas en español.
const SYNONYMS: Record<string, string[]> = {
    distopia: ['dystopian', 'totalitarianism'],
    amor: ['romance', 'love'],
    romance: ['romance', 'love'],
    romantica: ['romance', 'love'],
    fantasia: ['fantasy', 'magic'],
    magia: ['magic', 'fantasy', 'wizard'],
    misterio: ['mystery'],
    clasico: ['classic'],
    clasicos: ['classic'],
    guerra: ['war'],
    juvenil: ['young', 'teen'],
    aventura: ['adventure', 'journey'],
    aventuras: ['adventure', 'journey'],
    historia: ['history', 'historical'],
    sociedad: ['society', 'social'],
    justicia: ['justice', 'injustice'],
};

const STOPWORDS = new Set(['que', 'los', 'las', 'del', 'una', 'uno', 'unos', 'para', 'con', 'por', 'algo', 'quiero', 'busco', 'libro', 'libros', 'sobre', 'recomienda', 'recomiendame', 'como', 'mas', 'muy', 'leer', 'the', 'and']);

export const recommendBooks = async (userInput: string) => {
    await delay(400);
    const terms = normalize(userInput)
        .split(/[^a-z0-9]+/)
        .filter(term => term.length >= 3 && !STOPWORDS.has(term))
        .flatMap(term => [term, ...(SYNONYMS[term] ?? [])]);

    const scored = seed.libros.map(libro => {
        const strong = normalize(`${libro.titulo} ${libro.autor} ${libro.generoIds.map(id => generoSrDTO(id).nombre).join(' ')}`);
        const weak = normalize(libro.descripcion ?? '');
        const score = terms.reduce((total, term) => total + (strong.includes(term) ? 3 : 0) + (weak.includes(term) ? 1 : 0), 0);
        return { libro, score };
    });

    const matches = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score);
    const picked = (matches.length > 0 ? matches : [...scored].sort((a, b) => b.libro.valoracion - a.libro.valoracion)).slice(0, 3);

    return {
        in_stock_recommendations: picked.map(({ libro }) => ({
            title: libro.titulo,
            author: libro.autor,
            isbn: String(libro.isbn),
            purchase_url: `${window.location.origin}/book/${libro.isbn}`,
        })),
        general_recommendations: [] as { title: string; author: string; isbn?: string; purchase_url?: string }[],
        message: matches.length > 0
            ? 'Estas recomendaciones salen del catálogo de ejemplo.'
            : 'Modo demo: no encontré coincidencias en el catálogo de ejemplo, así que te propongo los libros mejor valorados.',
    };
};
