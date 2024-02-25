// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función para borrar una registro tuya, previamente autorizado con TOKEN y en ella comprobamos si eres el dueño de la registro antes de poder borrarla
const deleteRegistroController = async (req, res, next) => {
  try {
    // Guardamos en una variable la id extraida de los parámetros de la request
    const { id } = req.params;

    // Guardamos en una variable la búsqueda del usuario que coincida con la id anteriormente proporcionada
    const [[getRegistro]] = await pool.query(
      `
      SELECT
      r.id,
      r.altura_marea,
      r.altura_ola,
      r.direccion_ola,
      r.direccion_viento,
      r.foto_sesion,
      r.fotos,
      r.fotos_sesion,
      r.gente,
      r.lluvia,
      r.momento,
      r.nubes,
      r.numero_olas,
      r.periodo_ola,
      r.punto_marea,
      r.que_tal_olas,
      r.que_tal_yo,
      r.subiendo_marea,
      r.temperatura_agua,
      r.temperatura_ambiente,
      r.texto,
      r.tiempo,
      r.velocidad_viento,
      l.nombre AS lugar_nombre
  FROM
      registros r
  JOIN
      lugares l ON r.lugar = l.id;
   WHERE r.id = ?
    `,
      [id]
    );

    // En caso de no existir la registro, generamos mensaje de error
    if (!getExp) {
      throw genError("Error intentando borrar registro", 401);
    }

    // En caso de no coincidir la id del token de autorización y la id del usuario que creó la registro, generamos mensaje de error
    if (req.auth !== getExp.user_id) {
      throw genError("No puedes borrar la registro de otro usuario", 401);
    }
    // En caso de lo anteriormente comprobado estar correcto, borramos primero las respuestas que esten dentro de la registro y dentro de los comentarios con ese ID, además de los votos registrados (borrar en cascada por los FK)

    // Por ultimo borramos la registro
    await pool.query(
      `
      DELETE FROM registros WHERE id = ?
      `,
      [id]
    );

    // Respuesta
    res.send({
      status: "Correcto",
      message: `Registro con id ${id} borrada con éxito!`,
    });
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

export default deleteRegistroController;
