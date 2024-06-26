# Content Management Backend API

## Descripción

Esta es una API para gestionar contenido multimedia accesible según los tipos de usuarios que usen la aplicación. Los tipos de contenido incluyen imágenes, videos (URLs de YouTube) y documentos de texto. Los usuarios tienen diferentes roles (Administrador, Lector, Creador) con diferentes permisos para acceder y gestionar el contenido.

## Características

- El Administrador puede crear categorías y temáticas de contenido.
- Las temáticas pueden tener permisos específicos para tipos de contenido.
- Los usuarios tienen roles específicos con permisos diferenciados:
  - Administrador: CRUD (Crear, Leer, Actualizar, Eliminar)
  - Lector: R (Leer)
  - Creador: CRU (Crear, Leer, Actualizar)
- Los contenidos están organizados por tipos y temáticas y accesibles según los permisos del usuario.

## Requisitos

- Node.js
- MongoDB

## Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/tuusuario/content-management-backend.git
   cd content-management-backend

2. Instalar las dependencias:
    ```sh
    npm install

3. Iniciar Mongo
    ```sh
    mongod

## Uso

### Iniciar el servidor

```sh
npm start
```

El servidor estará disponible en `http://localhost:3000`.

### Endpoints

#### Registro de Usuario

**URL:** `/register`  
**Método:** `POST`  
**Descripción:** Registra un nuevo usuario.

**Cuerpo de la petición:**

```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "examplePassword"
}
```

**Respuesta:**

- **Éxito (201):** Usuario registrado exitosamente.
- **Error (500):** Error registrando usuario.

#### Login de Usuario

**URL:** `/login`  
**Método:** `POST`  
**Descripción:** Autentica un usuario y devuelve un token JWT.

**Cuerpo de la petición:**

```json
{
  "username": "exampleUser",
  "password": "examplePassword"
}
```

**Respuesta:**

- **Éxito (200):** Devuelve el token JWT.
  ```json
  {
    "token": "jwt_token"
  }
  ```
- **Error (401):** Credenciales inválidas.

#### Ruta Protegida

**URL:** `/protected`  
**Método:** `GET`  
**Descripción:** Accede a una ruta protegida solo para usuarios autenticados.

**Headers:**

- `Authorization: Bearer <token>`

**Respuesta:**

- **Éxito (200):** Acceso concedido.
  ```json
  {
    "message": "Acceso concedido",
    "decoded": { "userId": "12345", "username": "exampleUser" }
  }
  ```
- **Error (401):** Token no proporcionado o inválido.

## Estructura del Proyecto

```
content-management-backend/
├── config/
│   └── db.js
├── controllers/
│   └── categoryController.js
│   └── contentController.js
│   └── topicController.js
│   └── userController.js
├── middleware/
│   └── adminAuth.js
│   └── auth.js
│   └── creatorAuth.js
├── models/
│   └── Category.js
|   └── Content.js
|   └── Topic.js1
|   └── User.js
├── routes/
│   └── categoryRoutes.js
│   └── contentRoutes.js
│   └── topicRoutes.js
│   └── userRoutes.js
├── utils/
│   └── lib.js
├── .env
├── app.js
├── package.json
└── README.md
```

- **config/db.js:** Configuración y conexión a MongoDB.
- **models/User.js:** Definición del modelo de usuario.
- **routes/index.js:** Definición de las rutas de la API.
- **utils/lib.js:** Se utiliza para agregar funciones a utilizar internamente.
- **app.js:** Punto de entrada de la aplicación.

## Dependencias

- `express`: Framework de servidor web.
- `mongoose`: ODM para MongoDB.
- `bcrypt`: Librería para hashing de contraseñas.
- `jsonwebtoken`: Librería para manejar tokens JWT.
- `dotenv`: Cargar variables de entorno desde un archivo `.env`.

## Desarrollo

Para iniciar el servidor en modo desarrollo con nodemon:

```sh
npm run dev
```

Esto reiniciará automáticamente el servidor cuando se detecten cambios en los archivos.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.

## Licencia

Este proyecto está licenciado bajo la MIT License.

