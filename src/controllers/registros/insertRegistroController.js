// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";
import { insertRegistro } from "../../models/registros/index.js";
import fileUpload from "express-fileupload";
import express from "express";
import { nanoid } from "nanoid";
import { HOST_DB, PORT } from "../../../env.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Definimos express en una variable para su uso
const app = express();

// Middleware para poder subir archivos
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Creamos una función para manejar la inserción de registros
const insertRegistroController = async (req, res, next) => {
  try {
    // Obtenemos los parámetros necesarios para realizar la inserción de una registro
    const {
      lugar_id,
      usuario_id,
      altura_marea,
      altura_ola,
      direccion_ola,
      direccion_viento,
      foto_sesion,
      fotos,
      fotos_sesion,
      gente,
      lluvia,
      momento,
      nubes,
      numero_olas,
      periodo_ola,
      punto_marea,
      que_tal_olas,
      que_tal_yo,
      subiendo_marea,
      temperatura_agua,
      temperatura_ambiente,
      texto,
      tiempo,
      velocidad_viento,
    } = req.body;
    // Obtenemos la "id" del usuario loggeado
    const loggedUserId = req.auth;

    let fotosRuta = "";
    // Verificar si se cargó una imagen
    if (req.files && req.files.fotos) {
      // Obtener la imagen
      const fotos = req.files.fotos;
      const fotosNombre = fotos.name;

      // const photoFormat = photoN.split(".");

      // // Guardar la imagen en la carpeta "uploads"
      // const nombreArchivoFinal =
      //   nanoid() + "." + photoFormat[photoFormat.length - 1];
      // photo.mv(`./uploads/registros/${nombreArchivoFinal}`);

      // Establecer la ruta de la foto en caso de que se haya subido
      // const photoPath = `http://${HOST_DB}:${PORT}/registros/${nombreArchivoFinal}`;
      // const photoPath = `/registros/${nombreArchivoFinal}`;
      fotosRuta = `/registros/${fotosNombre}`;
    }

    // Validar que el ID del lugar existe antes de insertar el registro
    const lugarExisteQuery = `
      SELECT id FROM lugares WHERE id = ?
    `;
    const [lugarResultado] = await pool.query(lugarExisteQuery, [lugar_id]);

    if (!lugarResultado.length) {
      throw genError("El lugar especificado no existe", 400);
    }

    // Llamamos a la función encargada de insertar los datos de la registro(Ver explicación en su respectivo lugar)
    await insertRegistro({
      lugar_id,
      usuario_id,
      altura_marea,
      altura_ola,
      direccion_ola,
      direccion_viento,
      foto_sesion,
      fotosRuta,
      fotos_sesion,
      gente,
      lluvia,
      momento,
      nubes,
      numero_olas,
      periodo_ola,
      punto_marea,
      que_tal_olas,
      que_tal_yo,
      subiendo_marea,
      temperatura_agua,
      temperatura_ambiente,
      texto,
      tiempo,
      velocidad_viento,
    });

    // Respuesta
    res.status(200).json({
      message: "Experiencia insertada con éxito!",
    });
  } catch (error) {
    const statusCode = error.httpStatus || 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message || "Error del servidor",
    });
  }
};

// Exportaciones
export default insertRegistroController;
