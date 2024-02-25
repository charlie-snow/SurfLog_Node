// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función donde manejaremos la búsqueda por "id" de una registro en concreto
const getRegistroController = async (req, res, next) => {
  try {
    // Obtenemos la "id" de la registro que pretendemos buscar para su uso
    const { id } = req.params;

    // Realizamos la búsqueda en DB de la registro pasándole el parámetro anterior como condición

    const query_select = `SELECT
    r.id AS registro_id,
    r.lugar_id,
    l.nombre,
    l.coordenadas,
    r.usuario_id,
    u.nombre_usuario,
    u.correo_electronico,
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
    r.velocidad_viento
FROM
    registros r
JOIN
    lugares l ON r.lugar_id = l.id
JOIN
    usuarios u ON r.usuario_id = u.id`;

    const query_un_registro = " WHERE r.id = ?";

    const query = query_select + "\n" + query_un_registro;

    const [[getXId]] = await pool.query(query, [id]);

    // En caso de no haber ningun registro con la "id" que solicitamos, generamos el siguiente mensaje de error
    if (!getXId) {
      throw genError("No hay coincidencias en tu búsqueda", 404);
    }

    // Respuesta
    res.send({
      status: "Correcto",
      data: getXId,
    });
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportaciones
export default getRegistroController;
