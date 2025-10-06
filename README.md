# TLP4 Backend - Node.js + TypeScript

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Tobias-Vega/tlp4-backend-node-ts-tobias-vega.git
cd tlp4-backend-node-ts-tobias-vega
```

### 2. Instalar dependencias

```bash
npm install
```

## ⚙️ Configuración

### 1. Crear archivo de variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# URI de conexión a MongoDB
# Opción 1: MongoDB local
MONGODB_URI=mongodb://localhost:27017/tlp4-database

# Configuración de JWT
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRES_IN=24h

# Contraseña del administrador por defecto
ADMIN_PASSWORD=admin123
```

## Ejecución del Proyecto

Ejecuta el proyecto:
```bash
npm run dev
```

### Verificar que el servidor está corriendo

Deberías ver en la consola:

```
Server running on port 3000
Database connected successfully
```

### Seeds

#### Poblar la base de datos con datos iniciales
```http
POST /api/seed
```

Este endpoint creará:
- Un usuario administrador con las credenciales configuradas en `.env`
- Usuarios de ejemplo
- Productos de ejemplo