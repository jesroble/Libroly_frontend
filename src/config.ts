// URLs públicas de los servicios backend. Se definen con variables VITE_* en tiempo de build
// (archivo .env.local en local, Environment Variables en Vercel). Nunca pongas secretos aquí:
// todo lo que empiece por VITE_ acaba dentro del JavaScript que se sirve al navegador.
// Los valores localhost solo se usan con `npm run dev` y se eliminan del build de producción.

// Modo demo: el frontend funciona sin backend, con los datos de ejemplo de src/demo/data.json.
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const resolveUrl = (value: string | undefined, devDefault: string, name: string): string => {
    if (value) return value.replace(/\/+$/, '');
    if (import.meta.env.DEV) return devDefault;
    if (!DEMO_MODE) console.error(`Falta la variable de entorno ${name} en este build.`);
    return '';
};

export const API_URL = resolveUrl(
    import.meta.env.VITE_API_URL,
    import.meta.env.DEV ? 'http://localhost:8080' : '',
    'VITE_API_URL',
);
export const PAYMENTS_API_URL = resolveUrl(
    import.meta.env.VITE_PAYMENTS_API_URL,
    import.meta.env.DEV ? 'http://localhost:5000' : '',
    'VITE_PAYMENTS_API_URL',
);
export const RECOMMENDATIONS_API_URL = resolveUrl(
    import.meta.env.VITE_RECOMMENDATIONS_API_URL,
    import.meta.env.DEV ? 'http://localhost:8000' : '',
    'VITE_RECOMMENDATIONS_API_URL',
);
