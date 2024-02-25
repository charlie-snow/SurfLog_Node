// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Guardamos en una variable el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función para insertar una registro en la DB
const insertRegistro = async ({
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
}) => {
  try {
    // Guardamos en una variable la query
    const sqlQuery = `
    INSERT INTO registros (lugar_id, usuario_id, altura_marea, altura_ola, direccion_ola, direccion_viento, foto_sesion, fotos, fotos_sesion, gente, lluvia, momento, nubes, numero_olas, periodo_ola, punto_marea, que_tal_olas, que_tal_yo, subiendo_marea, temperatura_agua, temperatura_ambiente, texto, tiempo, velocidad_viento)
    VALUES (?,?,?,?,?,?,?,'?',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    // Guardamos en una variable los parámetros que le pasaremos a la query
    const sqlValues = [
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
    ];

    const consulta = sqlQuery.replace(/\?/g, (match) => {
      return sqlValues.shift(); // Take the next value from the array
    });

    console.log("Consulta SQL: " + consulta);

    // Realizamos la petición a la DB
    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    // return insertId;
  } catch (error) {
    // En caso de haber algun error, lo manejamos
    throw genError("Error insertando el registro", 500);
  }
};

// Exportaciones
export default insertRegistro;
