
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? true : false // Habilita SSL solo en entorno de producción
  },
  logging: false // Deshabilita los logs de Sequelize para evitar sobrecargar la consola
});

// Manejo de errores durante la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente con la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = sequelize;