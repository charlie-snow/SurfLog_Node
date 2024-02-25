import express from "express";
import { PORT, HOST_DB } from "./env.js";
import morgan from "morgan";
import cors from "cors";
import {
  notFoundController,
  errorController,
} from "./src/controllers/errors/index.js";
import router from "./src/routes/index.js";
import fileUpload from "express-fileupload";

// Usamos express
const app = express();

// Hacemos que express interprete los JSON
app.use(express.json());

// Usamos express.static para convertir en pública la carpeta "uploads"
app.use(express.static("uploads"));

// Usamos express-fileupload para subir archivos
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Usamos morgan para recibir en consola las peticiones hechas
app.use(morgan("dev"));

// Usamos CORS para proteger las peticiones al servicio solamente con los http permitidos
// const allowedHttp = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:5173",
// ];

// app.use(cors({ origin: allowedHttp }));

app.use(cors());

//Middleware llamando a las rutas
app.use(router);

// Gestión de error 404: Not Found
app.use(notFoundController);

// Uso del middleware de errores
app.use(errorController);

// Levantamos el servicio
app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${HOST_DB}:${PORT}`);
});
