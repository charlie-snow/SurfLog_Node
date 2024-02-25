// Importaciones
import express from "express";
import Auth from "../middlewares/auth.js";
import validation from "../middlewares/joiValidation.js";
import {
  insertRegistroController,
  getRegistroController,
  // deleteRegistroController,
  getRegistrosController,
  // modifyRegistroController,
} from "../controllers/registros/index.js";
// import registroSchema from "../controllers/schemas/registros/insertRegistro.js";
// import idRegistroSchema from "../controllers/schemas/registros/idRegistro.js";

const router = express.Router();

// Endpoint de inserción de nueva registro
router.post(
  "/registros",
  // validation(registroSchema),
  // Auth,
  insertRegistroController
);

// Endpoint de obtención de registro por id
router.get(
  "/registros/:id",
  // validation(idRegistroSchema),
  getRegistroController
);

// Endpoint de eliminación de registro por id
// router.delete(
//   "/registro/:id",
//   validation(idRegistroSchema),
//   Auth,
//   deleteRegistroController
// );

// Endpoint de listado de registros: búsqueda y listado por votos
router.get(
  "/registros",
  // validation(idRegistroSchema),
  getRegistrosController
);

// Enpoint de modificación de Experiencias
// router.put("/modRegistro/:id"s, Auth, modifyExpController);

export default router;
