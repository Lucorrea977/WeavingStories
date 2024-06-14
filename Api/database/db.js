
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    timezone: 'Etc/UTC', // Ajusta la zona horaria según sea necesario
    ssl: process.env.NODE_ENV === 'production' ? true : false
  },
  logging: false,
  define: {
    // Evitar que Sequelize cambie los nombres de las columnas a CamelCase
    underscored: true,
  },
});

// Manejo de errores durante la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente con la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

// Limpiar la caché de Sequelize (opcional en versiones modernas de Sequelize)
if (sequelize.options && sequelize.options.queryCache) {
  sequelize.options.queryCache.clear();
}

module.exports = sequelize;
