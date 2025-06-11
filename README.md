## 📋 Descripción

La aplicación está diseñada para usuarios que deseen gestionar un catálogo de instrumentos musicales
para alquilarlos. Los usuarios pueden:

- **Listar instrumentos**: Ver todos los instrumentos disponibles con sus detalles (nombre, precio, descripción, imagen).
- **Crear instrumentos**: Añadir nuevos instrumentos al catálogo (si sos un user admin).
- **Editar instrumentos**: Actualizar la información de un instrumento existente(si sos un user admin).
- **Eliminar instrumentos**: Borrar instrumentos del catálogo (si sos un user admin).
- **Crear usuario**: Los usuarios podrán crear una cuenta para realizar las reservas, ver fechas de disponibilidades de instrumentos, etc.
- **Autenticación**: Los usuarios deben autenticarse para realizar ciertas acciones ya que se utilizó JWT (JSON Web Token)

El proyecto está dividido en dos partes:

- **Backend**: Una API REST desarrollada con Spring Boot, que maneja la lógica de negocio, la persistencia de datos en MySQL (Clever Cloud), y la integración con Cloudinary.
- **Frontend**: Una interfaz de usuario interactiva construida con React, que consume la API del backend y ofrece una experiencia fluida para los usuarios.

## 🌐 URLs de Producción

- **Frontend**: [https://proyecto-integrador-omega-navy.vercel.app/](https://proyecto-integrador-omega-navy.vercel.app/)
- **Backend**: [https://back-mr-instruments-v24.onrender.com/](https://back-mr-instruments-v24.onrender.com/)

## 🛠️ Tecnologías Utilizadas

### Backend

- **Java 20**: Lenguaje de programación principal.
- **Spring Boot**: Framework para desarrollar la API REST.
- **Spring Boot Mail**: Habilita el envío de correos electrónicos mediante JavaMail.
- **Spring Data JPA**: Para la persistencia de datos.
- **Spring Security**: Para autenticación y autorización.
- **MySQL (Clever Cloud)**: Base de datos relacional.
- **Cloudinary**: Para la gestión de imágenes.
- **Docker**: Para la creación y despliegue de imágenes del backend.
- **Render**: Plataforma de despliegue del backend.
- **Maven**: Gestión de dependencias y construcción del proyecto.
- **Lombok**: Para reducir el código repetitivo.
- **Springfox (Swagger)**: Para la documentación de la API.
- **JWT (io.jsonwebtoken)**: Para autenticación basada en tokens.
- **Mockito**: Para pruebas unitarias.

#### Dependencias del Frontend (packge.json)

- **React 19.1.0**: Biblioteca principal para la interfaz de usuario.
- **React Router DOM**: Para la navegación entre páginas.
- **JWT Decode**: Para manejar tokens de autenticación.
- **React Date Range**: Para la selección de fechas.
- **React Share**: Para compartir contenido en redes sociales.
- **RSuite**: Componentes adicionales de UI.
- **Vercel**: Plataforma de despliegue del frontend.
- **axios**: Cliente HTTP para realizar solicitudes a APIs (GET, POST, etc.) desde el navegador o Node.js.
- **date-fns**: Biblioteca ligera para manipulación y formato de fechas, como parsear, formatear o calcular diferencias.
- **formik**: Biblioteca para gestionar formularios en React, facilitando el manejo de estado, validación y envío.
- **yup** Biblioteca para validación de esquemas de datos, comúnmente usada con Formik para validar formularios.
