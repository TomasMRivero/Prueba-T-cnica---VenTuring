Prueba Técnica para VenTuring - Tomás Martínez Rivero
# Desarrollo
Para inicar el servidor de desarrollo:
- Iniciar XAMPP con el servidor Apache y SQL
- Crear un archivo .env en la carpeta back y especificar:
    - PORT para el puerto
    - DB_HOST para el host de la base de datos
    - DB_COLLECTION para el nombre de la base de datos
    - DB_USER para el usuario de la base de datos
    - DB_PASS para la contraseña correspondiente al usuario
    - TOKEN_SECRET para el secret de jwt
- La primera vez, importar `peliculas.sql` de la carpeta root
- La primera vez, ejecutar `npm install` en el servidor del backend
- Iniciar el servidor del backend con `npm start`
- La primera vez, ejecutar `npm install` en el servidor del frontend
- Iniciar el servidor del backend con `npm start`