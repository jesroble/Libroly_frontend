# Libroly · Frontend

Frontend de **Libroly**, un marketplace de libros de segunda mano: catálogo, ficha de libro con ofertas de varios vendedores, carrito, compra, biblioteca personal, ventas, perfil y un chatbot de recomendaciones.

SPA hecha con React 19, Vite 6, TypeScript, Tailwind CSS y React Router 7.

> **Demo en vivo:** _añade aquí la URL de Vercel_
>
> La demo funciona sin backend, con datos de ejemplo ficticios (ver [Modo demo](#modo-demo)). Entra con `mariagarcia62@example.com` y cualquier contraseña.

## Arquitectura

El proyecto completo tiene cuatro piezas. En este repositorio está solo el frontend:

| Servicio | Stack | Función |
|---|---|---|
| **Frontend** (este repo) | React, Vite, TypeScript, Tailwind | Interfaz web |
| API principal | Java 17, Spring Boot, JPA, MySQL | Usuarios, libros, ventas y compras; datos de libros desde OpenLibrary |
| Pagos | Python, Flask, Stripe Checkout | Pagos y suscripciones con webhook verificado |
| Recomendaciones | Python, FastAPI, Google Gemini | Recomendaciones con IA priorizando el stock |

## Modo demo

Con `VITE_DEMO_MODE=true`, el frontend no llama a ningún backend:

- **Datos:** el catálogo, los usuarios, las ofertas y los pedidos salen de [`src/demo/data.json`](src/demo/data.json), generado a partir de los datos de ejemplo de la base de datos. No contiene contraseñas, y los nombres, emails (`@example.com`), direcciones y teléfonos (`555 …`) son ficticios.
- **API:** [`src/demo/demoApi.ts`](src/demo/demoApi.ts) reproduce las respuestas y la lógica de la API Java. Por ejemplo, al comprar un libro este pasa de la biblioteca del vendedor a la del comprador.
- **Login:** acepta cualquier contraseña para los usuarios de ejemplo, y también puedes registrar cuentas nuevas.
- **Cambios del visitante:** registro, ventas, compras y perfil se guardan solo en su navegador (`localStorage`). El aviso superior permite restablecerlos.
- **Pagos:** simulados. No hay Stripe.
- **Chatbot:** recomienda libros del catálogo por palabras clave, sin IA.
- **Añadir por ISBN:** limitado a los libros del catálogo de ejemplo. La API real consulta OpenLibrary.

Con el modo demo desactivado, todo su código y sus datos se eliminan del build (ver `vite.config.ts`).

## Requisitos

- Node.js 20 o superior y npm

## Instalación y desarrollo

```bash
npm ci
cp .env.example .env.local   # VITE_DEMO_MODE=true para usar la demo sin backend
npm run dev                  # http://localhost:5173
```

| Script            | Qué hace                                      |
|-------------------|-----------------------------------------------|
| `npm run dev`     | Servidor de desarrollo de Vite                |
| `npm run build`   | Comprobación de tipos (`tsc -b`) y build a `dist/` |
| `npm run preview` | Sirve `dist/` en local                        |
| `npm run lint`    | ESLint                                        |

## Variables de entorno

Todas son **públicas**: Vite las incrusta en el JavaScript que recibe el navegador. No pongas nunca claves secretas en variables `VITE_*`.

| Variable                       | Descripción                                   | Valor en desarrollo     |
|--------------------------------|-----------------------------------------------|-------------------------|
| `VITE_DEMO_MODE`               | `true` = demo sin backend con datos de ejemplo | `false`                |
| `VITE_API_URL`                 | URL base de la API Java (Spring Boot)         | `http://localhost:8080` |
| `VITE_PAYMENTS_API_URL`        | URL base del microservicio de pagos           | `http://localhost:5000` |
| `VITE_RECOMMENDATIONS_API_URL` | URL base del microservicio de recomendaciones | `http://localhost:8000` |

En modo demo, las tres URLs no se usan. Sin demo, en `npm run dev` se usan los valores de la tabla si faltan; en un build de producción tienen que estar definidas (ver `src/config.ts`).

## Despliegue en Vercel

1. En Vercel, importa este repositorio (**Add New → Project**). `vercel.json` ya fija:
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Un rewrite de todas las rutas a `/index.html`, para que React Router funcione al recargar o al abrir enlaces directos como `/book/9780743273565`.
2. En **Environment Variables**:
   - **Demo:** solo `VITE_DEMO_MODE` = `true`.
   - **Con backend real:** `VITE_API_URL`, `VITE_PAYMENTS_API_URL` y `VITE_RECOMMENDATIONS_API_URL` con las URLs HTTPS de los servicios, y el dominio de Vercel en la lista de orígenes CORS de cada backend.
3. Las variables se leen al compilar: si las cambias después, lanza un **Redeploy**.

## Limitaciones conocidas (modo con backend)

- El login espera `{ user: {...} }`, pero la API Java devuelve el usuario directamente. Con el backend real, el nombre del usuario no aparece en la barra de navegación. La demo devuelve la forma esperada.
- `updateUserVerification(false)` ignora el argumento, así que cancelar Libroly Pro marca la cuenta como verificada igualmente. La demo sí respeta el argumento.
- `ProfileNewSales.tsx` no se usa en ninguna ruta.
