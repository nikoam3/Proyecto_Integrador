# Proyecto_Integrador
Proyecto final del curso Certified Tech Developer 
Detalles:

# Front End
Usamos React con Vite para nuestra base de código front-end. Además de la implementación de la libreria MUI.

# Back End
# Servidor en tiempo real

Brinda detalles sobre el funcionamiento del servidor en tiempo real.

Usamos la estructura Phoenix en Elixir para sincronizar todos los cambios en vivo en nuestra aplicación. 

Elixir es un lenguaje dinámico y funcional diseñado para crear aplicaciones adaptables y sostenibles que se ejecutan en la máquina virtual Erlang.

## JWT (JSON Web Token)

Es un estándar para transmitir información de forma segura en internet, por medio de archivos en formato JSON, que es un tipo de archivo de texto plano con el cual se pueden crear parámetros y asignarles un valor. Este sistema se utiliza para la autenticación de usuarios en aplicaciones y su función principal es la de validar la identidad de quien ingresa a la página, después de que ya haya iniciado sesión en el pasado. De esta forma, no es necesario hacer el proceso de *login* cada vez que se entra a la página.

### **Autenticación de APIs basada en tokens con Spring y JWT**

Cómo autenticar una API mediante tokens aplique los siguientes pasos:

- Crear un API REST con Spring Boot
- Proteger recursos publicados en el API.
- Implementar un controlador para autenticar usuarios y generar un token de acceso.
- Implementar un filtro para autorizar peticiones a recursos protegidos de nuestro API.

# Infraestructura
- Utilizamos como servicio de instraestructura para nuestro proyecto AWS, porque el costo es bajo, es escalable, de alto desempeño, es flexible, brinda seguridad y soporte técnico las 24hs.
- Para correr el backend, utilizamos EC2, donde al mismo se le cargó una imagen de Docker en donde tenemos cargado todo el back.
- Para correr el frontend, utilizamos un bucket de S3, que nos genera un link con acceso público. En la actualidad se va a cambiar por un link de Vercel.

# MySQL Workbench

Es una herramienta que se usa para dibujar y planificar cómo se verá y funcionará una base de datos. Te permite crear cuadros visuales de las tablas (DER), cómo están relacionadas y qué datos almacenarán. Es útil para diseñar antes de crear la base de datos real
### Configuracion la conexion a la BBDD MySQL con el Backend

Para configurar la conexión a una base de datos desde el backend utilizando Maven, realice los siguientes pasos utilizando Java y Spring Boot, usando MySQL como base de datos:

- Agregar Dependencias: En el archivo **`pom.xml`**, agregar las dependencias necesarias para Spring Boot y la base de datos MySQL.
- Configuración de la Base de Datos: En elarchivo **`application.properties`**, se configura los detalles de la conexión a la base de datos.
- Entidades JPA: Crear las clases Java que representen las tablas de tu base de datos utilizando la especificación JPA.
- Repositorios JPA: Crear interfaces que extiendan **`JpaRepository`** o una de las otras interfaces proporcionadas por Spring Data JPA para acceder a la base de datos.
- Uso en Controladores o Servicios: En loscontroladores o servicios, inyectar los repositorios JPA y úsalos para interactuar con la base de dato.

  **Diseño de Identidad de Marca de MR. Instruments**

- **MR. Instruments** es la abreviación de **Musical Rental Instruments.** Para su representación gráfica vamos a utilizar la tipografia font-family: 'REM', sans-serif. La misma es una fuente lista para usos corporativos y de exhibición. Presenta un contraste fuerte combinado con trazos que se vuelven ligeramente más delgados, que le da una sensación contemporánea adecuada para la marca moderna que MR. Instruments.
- **Definición de la identidad de la marca:** La identidad de la marca es la esencia que va a representar y comercializar con éxito el negocio. En Mr. Instruments, el alma del negocio es brindar un servicio de excelencia en el rubro de alquiler de instrumentos musicales. Estos instrumentos son los que van a crear música en todas sus variedades y es la producción de ella la que elegimos como competencia central del negocio, y que tiene como apariencia visual una onda sonora, que es la forma en la que el sonido se propaga por el aire, y esta como onda expansiva puede ser percibida por el oído humano. Esta onda es percibida por el público objetivo y se utiliza para transmitir su misión al resto del mundo y se refleja a través de sus elementos visuales y escritos.
- **Conocer el público objetivo:** Ya que el logo es el punto de contacto con nuestros clientes, y los mismos son músicos o amantes de la música que necesitan del alquiler de un instrumento para prácticar su realización. En nuestro caso, no hay distinción o segmentación de edad o sexo, ya que es una práctica universal.


