const app = require('./src/app');
const db = require('./database/db');
const port = process.env.PORT || 3001;

// Sincronizar modelos con la base de datos
db.sync()
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});